# MeDrive Server - API Documentation

## Base URL

- **Development**: `http://localhost:3001/api/v1`
- **Production**: `https://api.yourdomain.com/api/v1`

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <jwt-token>
```

## Response Format

All responses follow a consistent structure:

```json
{
  "success": true,
  "data": {},
  "message": "Success message",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Error Format

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description",
    "details": {}
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

## Authentication Endpoints

### POST /auth/register

Register a new user account.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt-access-token",
    "refreshToken": "jwt-refresh-token"
  }
}
```

### POST /auth/login

Authenticate user and get access token.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "token": "jwt-access-token",
    "refreshToken": "jwt-refresh-token"
  }
}
```

### POST /auth/refresh

Refresh access token using refresh token.

**Request Body:**

```json
{
  "refreshToken": "jwt-refresh-token"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "token": "new-jwt-access-token",
    "refreshToken": "new-jwt-refresh-token"
  }
}
```

### POST /auth/logout

Logout user and invalidate tokens.

**Headers:**

```
Authorization: Bearer <jwt-token>
```

**Response:**

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## User Management Endpoints

### GET /users/profile

Get current user profile.

**Headers:**

```
Authorization: Bearer <jwt-token>
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "avatar": "https://cloudinary.com/avatar.jpg",
    "storageUsed": 104857600,
    "storageLimit": 1073741824,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### PATCH /users/profile

Update user profile.

**Headers:**

```
Authorization: Bearer <jwt-token>
```

**Request Body:**

```json
{
  "name": "Updated Name",
  "avatar": "https://new-avatar.com/image.jpg"
}
```

---

## File Management Endpoints

### GET /files

Get paginated list of files for current user.

**Headers:**

```
Authorization: Bearer <jwt-token>
```

**Query Parameters:**

- `folderId` (optional): Filter by folder
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `search` (optional): Search in file names
- `sortBy` (optional): name, size, modifiedAt, createdAt
- `sortOrder` (optional): asc, desc

**Response:**

```json
{
  "success": true,
  "data": {
    "files": [
      {
        "id": "uuid",
        "name": "document.pdf",
        "type": "application/pdf",
        "size": 1024000,
        "url": "https://cloudinary.com/file.pdf",
        "thumbnailUrl": "https://cloudinary.com/thumbnail.jpg",
        "folderId": "uuid-or-null",
        "isShared": false,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5
    }
  }
}
```

### GET /files/:id

Get specific file details.

**Headers:**

```
Authorization: Bearer <jwt-token>
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "document.pdf",
    "type": "application/pdf",
    "size": 1024000,
    "url": "https://cloudinary.com/file.pdf",
    "thumbnailUrl": "https://cloudinary.com/thumbnail.jpg",
    "folderId": "uuid",
    "isShared": false,
    "sharedWith": [],
    "metadata": {
      "width": 800,
      "height": 600,
      "duration": null
    },
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### POST /files/upload

Upload a new file.

**Headers:**

```
Authorization: Bearer <jwt-token>
Content-Type: multipart/form-data
```

**Form Data:**

- `file`: File to upload (required)
- `folderId`: Target folder ID (optional)
- `name`: Custom file name (optional, defaults to original)

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "uploaded-file.pdf",
    "type": "application/pdf",
    "size": 1024000,
    "url": "https://cloudinary.com/uploaded-file.pdf",
    "thumbnailUrl": "https://cloudinary.com/thumbnail.jpg",
    "folderId": "uuid",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### PATCH /files/:id

Update file metadata.

**Headers:**

```
Authorization: Bearer <jwt-token>
```

**Request Body:**

```json
{
  "name": "new-file-name.pdf",
  "folderId": "new-folder-uuid"
}
```

### DELETE /files/:id

Delete a file.

**Headers:**

```
Authorization: Bearer <jwt-token>
```

**Response:**

```json
{
  "success": true,
  "message": "File deleted successfully"
}
```

### POST /files/:id/download

Generate secure download URL for a file.

**Headers:**

```
Authorization: Bearer <jwt-token>
```

**Response:**

```json
{
  "success": true,
  "data": {
    "downloadUrl": "https://cloudinary.com/download?token=secure-token",
    "expiresAt": "2024-01-01T01:00:00.000Z"
  }
}
```

---

## Folder Management Endpoints

### GET /folders

Get user's folder structure.

**Headers:**

```
Authorization: Bearer <jwt-token>
```

**Query Parameters:**

- `parentId` (optional): Get folders within specific parent
- `includeFiles` (optional): Include file count (default: false)

**Response:**

```json
{
  "success": true,
  "data": {
    "folders": [
      {
        "id": "uuid",
        "name": "Documents",
        "parentId": null,
        "path": "/Documents",
        "fileCount": 15,
        "folderCount": 3,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

### POST /folders

Create a new folder.

**Headers:**

```
Authorization: Bearer <jwt-token>
```

**Request Body:**

```json
{
  "name": "New Folder",
  "parentId": "parent-folder-uuid"
}
```

### PATCH /folders/:id

Update folder name or move folder.

**Headers:**

```
Authorization: Bearer <jwt-token>
```

**Request Body:**

```json
{
  "name": "Updated Folder Name",
  "parentId": "new-parent-uuid"
}
```

### DELETE /folders/:id

Delete a folder and all its contents.

**Headers:**

```
Authorization: Bearer <jwt-token>
```

**Query Parameters:**

- `recursive` (optional): Delete all subfolders and files (default: false)

---

## Dashboard Endpoints

### GET /dashboard/stats

Get dashboard statistics.

**Headers:**

```
Authorization: Bearer <jwt-token>
```

**Response:**

```json
{
  "success": true,
  "data": {
    "totalFiles": 150,
    "totalFolders": 25,
    "storageUsed": 104857600,
    "storageLimit": 1073741824,
    "recentFiles": [
      {
        "id": "uuid",
        "name": "recent-file.pdf",
        "type": "application/pdf",
        "size": 1024000,
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

### GET /dashboard/recent-files

Get recently modified files.

**Headers:**

```
Authorization: Bearer <jwt-token>
```

**Query Parameters:**

- `limit` (optional): Number of files (default: 10)

---

## File Sharing Endpoints

### POST /files/:id/share

Share a file with specific users or create public link.

**Headers:**

```
Authorization: Bearer <jwt-token>
```

**Request Body:**

```json
{
  "type": "user|public",
  "emails": ["user@example.com"], // Required for type: user
  "permission": "read|write",
  "expiresAt": "2024-12-31T23:59:59.000Z"
}
```

### GET /files/shared/:shareId

Access shared file (public endpoint).

**Response:**

```json
{
  "success": true,
  "data": {
    "file": {
      "id": "uuid",
      "name": "shared-file.pdf",
      "url": "https://cloudinary.com/file.pdf"
    },
    "sharedBy": {
      "name": "Owner Name",
      "email": "owner@example.com"
    }
  }
}
```

---

## Error Codes

### Authentication Errors

- `AUTH001`: Invalid credentials
- `AUTH002`: Token expired
- `AUTH003`: Invalid token
- `AUTH004`: User not found

### File Errors

- `FILE001`: File not found
- `FILE002`: Insufficient permissions
- `FILE003`: File already exists
- `FILE004`: Invalid file type
- `FILE005`: File too large

### Folder Errors

- `FOLD001`: Folder not found
- `FOLD002`: Circular folder structure
- `FOLD003`: Folder name already exists
- `FOLD004`: Cannot delete root folder

### Storage Errors

- `STOR001`: Storage limit exceeded
- `STOR002`: Upload failed
- `STOR003`: Download failed

---

## Rate Limiting

- **Authentication endpoints**: 5 requests per minute per IP
- **File uploads**: 10 requests per minute per user
- **General endpoints**: 100 requests per minute per user

## File Size Limits

- **Maximum file size**: 100MB
- **Total storage per user**: 1GB (configurable)
- **Supported file types**: All common file types with MIME type validation

## Webhook Support

### POST /webhooks/cloudinary

Handle Cloudinary upload notifications.

**Headers:**

- `X-Cld-Signature`: Cloudinary signature for verification
- `X-Cld-Timestamp`: Request timestamp

**Response:**

```json
{
  "success": true,
  "message": "Webhook processed"
}
```
