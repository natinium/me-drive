Installing Auth.js
Start by installing the appropriate package for your framework.

cd apps/web && yarn workspace web add next-auth@beta

Installing @auth/core is not necessary, as a user you should never have to interact with @auth/core.

Setup Environment
The only environment variable that is mandatory is the AUTH_SECRET. This is a random value used by the library to encrypt tokens and email verification hashes. (See Deployment to learn more). You can generate one via the official Auth.js CLI running:

cd apps/web && npx auth secret

This will also add it to your .env file to the web app, respecting the framework conventions (eg.: Next.js’ .env.local).

Configure
Next, create the Auth.js config file and object at the web app src/ folder. This is where you can control the behaviour of the library and specify custom authentication logic, adapters, etc. We recommend all frameworks to create an auth.ts file in the project. In this file we’ll pass in all the options to the framework specific initialization function and then export the route handler(s), signin and signout methods, and more.

Start by creating a new auth.ts file at the web/src of your app with the following content.
./auth.ts

import NextAuth from "next-auth"

export const { handlers, signIn, signOut, auth } = NextAuth({
providers: [],
})
Add a Route Handler under /app/api/auth/[...nextauth]/route.ts.
This file must be an App Router Route Handler, however, the rest of your app can stay under page/ if you’d like.

./app/api/auth/[...nextauth]/route.ts

import { handlers } from "@/auth" // Referring to the auth.ts we just created
export const { GET, POST } = handlers
Add optional Middleware to keep the session alive, this will update the session expiry every time its called.
./middleware.ts

export { auth as middleware } from "@/auth"
Setup Authentication Methods
With that, the basic setup is complete! Next we’ll setup the first authentication methods and fill out that providers array.

To setup Auth.js with any external authentication mechanisms or use a traditional username/email and password flow, we can use the Credentials provider. This provider is designed to forward any credentials inserted into the login form (i.e. username/password, but not limited to) to your authentication service.

Credentials Provider
To use the Credentials Provider, you’ll first need to import and configure it in your Auth.js setup. This provider allows you to implement custom login logic based on form input values.

Here’s how to set it up:

Import the provider.
Add it to the providers array in your Auth.js config.
Define the credentials and authorize fields.
credentials

set the auth pages that are currently at the (auth) folder to the auth js config.

authorize
The authorize function handles the custom login logic and determines whether the credentials provided are valid.

It receives the input values defined in credentials, and you must return either a user object or null. If null is returned, the login fails.

./auth.ts

import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
// Your own logic for dealing with plaintext password strings; be careful!
import { saltAndHashPassword } from "@/utils/password"

export const { handlers, signIn, signOut, auth } = NextAuth({
providers: [
Credentials({
// You can specify which fields should be submitted, by adding keys to the `credentials` object.
// e.g. domain, username, password, 2FA token, etc.
credentials: {
email: {},
password: {},
},
authorize: async (credentials) => {
let user = null

        // logic to salt and hash password
        const pwHash = saltAndHashPassword(credentials.password)

        // logic to verify if the user exists
        user = await getUserFromDb(credentials.email, pwHash)

        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.")
        }

        // return user object with their profile data
        return user
      },
    }),

],
})
If you’re using TypeScript, you can augment the User interface to match the response of your authorize callback, so whenever you read the user in other callbacks (like the jwt) the type will match correctly.

here is an example Signin Form and sample implemntation guide examples....based on it update the current login and signup pages to use them

import { signIn } from "@/auth"

export function SignIn() {
return (

<form
action={async (formData) => {
"use server"
await signIn("credentials", formData)
}} >
<label>
Email
<input name="email" type="email" />
</label>
<label>
Password
<input name="password" type="password" />
</label>
<button>Sign In</button>
</form>
)
}
Validating credentials
Always validate the credentials server-side, i.e. by leveraging a schema validation library like Zod.

cd apps/web && yarn workspace web add zod

Next, we’ll set up the schema and parsing in our auth.ts configuration file, using the authorize callback on the Credentials provider.

./lib/zod.ts

import { object, string } from "zod"

export const signInSchema = object({
email: string({ required_error: "Email is required" })
.min(1, "Email is required")
.email("Invalid email"),
password: string({ required_error: "Password is required" })
.min(1, "Password is required")
.min(8, "Password must be more than 8 characters")
.max(32, "Password must be less than 32 characters"),
})
./auth.ts

import NextAuth from "next-auth"
import { ZodError } from "zod"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "./lib/zod"
// Your own logic for dealing with plaintext password strings; be careful!
import { saltAndHashPassword } from "@/utils/password"
import { getUserFromDb } from "@/utils/db"

export const { handlers, auth } = NextAuth({
providers: [
Credentials({
// You can specify which fields should be submitted, by adding keys to the `credentials` object.
// e.g. domain, username, password, 2FA token, etc.
credentials: {
email: {},
password: {},
},
authorize: async (credentials) => {
try {
let user = null

          const { email, password } = await signInSchema.parseAsync(credentials)

          // logic to salt and hash password
          const pwHash = saltAndHashPassword(password)

          // logic to verify if the user exists
          user = await getUserFromDb(email, pwHash)

          if (!user) {
            throw new Error("Invalid credentials.")
          }

          // return JSON object with the user data
          return user
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null
          }
        }
      },
    }),

],
})
When authorize returns null, Auth.js handles the error in one of two ways:

Using built-in pages:

The user is redirected to the login page with the query string: ?error=CredentialsSignin&code=credentials. You can customize the code using the credentials provider options.
Using form actions or custom error handling (e.g., in Remix, SvelteKit): The error is thrown as credentialssignin and must be caught manually in your server action. See more in the Auth.js error reference.
