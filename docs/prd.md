# MeDrive - Product Requirements Document (PRD)

## 1. Introduction

This document outlines the minimum essential features for MeDrive, a self-hostable cloud file hosting application designed as a Google Drive clone.

## 2. Core Features

### 2.1 User Authentication

- **Login Page**: Users can log in with their credentials.
- **Signup Page**: New users can create an account.

### 2.2 Main Application Layout

- **Sidebar**: Navigation for main sections.
  - **Header**: Contains application logo.
  - **"New" Dropdown Button**: Allows users to:
    - Upload new files (opens a modal).
    - Create new folders (opens a modal).
- **Main Area**: Displays content based on sidebar selection.
- **Navbar**: Top navigation within the main area.

### 2.3 Sidebar Navigation

- **Dashboard Page**: Displays statistical cards and recently accessed files.
- **My Drive Page**: Displays a table of all user's files and folders.

### 2.4 File and Folder Management

- **File Listing**: Users can view all their files and folders in a table format.
- **Folder Navigation**: Users can open folders to view their contents.
- **Nested Folders**: Users can create folders within other folders.
- **File Upload**: Users can upload new files.
- **Folder Creation**: Users can create new folders.

## 3. Self-Hostability

- The application must be designed to be easily deployable and runnable on a user's own server environment.

## 4. User Interface (UI) Specifications

### 4.1 Overall Layout

- The application features a two-column layout: a fixed-width left sidebar and a main content area.
- The main content area includes a top navigation bar (navbar) and the primary content display.

### 4.2 Sidebar

- **Width**: Fixed width.
- **Header**: Contains the application logo/name ("FileManager").
- **"New" Button**: A prominent blue button labeled "+ New" at the top. Clicking this button reveals a dropdown menu with two options:
  - "Upload new file": Opens a modal for file selection.
  - "Create new folder": Opens a modal for folder naming.
- **Navigation Links**: Below the "New" button, there are two primary navigation links:
  - "Dashboard": Icon (e.g., dashboard/grid icon) and text.
  - "My Drive": Icon (e.g., folder/drive icon) and text.
- **User Profile Section**: At the bottom of the sidebar, a section displays:
  - User's avatar/initials.
  - User's name (e.g., "John Doe").
  - User's email (e.g., "john@example.com").
  - A toggle switch for theme (e.g., light/dark mode).
  - A "Sign Up" button (likely for new users or account management).

### 4.3 Main Area - Navbar

- **Breadcrumbs**: Displays the current navigation path (e.g., "Home > Dashboard" or "Home > My Drive").
- **Search Bar**: A search input field on the right side, labeled "Search files...".
- **User Avatar/Profile Icon**: On the far right, an icon representing the logged-in user, possibly with a dropdown for account settings.

### 4.4 Dashboard Page UI

- **Welcome Message**: A prominent greeting (e.g., "Welcome back, John").
- **Action Buttons**: Two buttons below the welcome message:
  - "Upload Files": Likely opens the file upload modal.
  - "Create Folder": Likely opens the create folder modal.
- **Stat Cards**: A section displaying key statistics in card format:
  - "Total Files": Number of files and percentage change.
  - "Folders": Number of folders and new folders this week.
  - "Storage Used": Current storage usage and total capacity.
  - "Shared Files": Number of shared files and new shared files.
- **Storage Usage Bar**: A visual progress bar showing storage consumption.
- **Recent Files Section**: A table-like display of recently accessed files, including:
  - File Icon.
  - File Name.
  - Size.
  - Modified date.
  - Status (e.g., "active", "archived").
  - Ellipsis menu for more options.

### 4.5 My Drive Page UI

- **Header**: "My Drive" with a small icon.
- **Current Path**: Displays the current folder path (e.g., "My Drive").
- **Action Buttons**: On the right side of the header:
  - "New Folder": Button to create a new folder.
  - "Upload": Button to upload files.
- **Search Bar**: A search input field specific to the current folder, labeled "Search files and folders...".
- **File/Folder Table**: A detailed table displaying contents of the current directory with columns for:
  - Checkbox for selection.
  - Name (with file/folder icon).
  - Owner.
  - Modified date.
  - Size.
  - Status (e.g., "Private", "Shared").
  - Ellipsis menu for more options (e.g., rename, delete, share).
- **Folder Navigation**: Clicking on a folder name in the table navigates into that folder, updating the table content and breadcrumbs.
