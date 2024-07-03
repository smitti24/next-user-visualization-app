# User Data Visualization Tool

Welcome to the User Data Visualization Tool! This application is built using Next.js and uses Clerk for user authentication. Below you'll find the steps to get started with the application locally and how to access the live version.

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js

## Setup Instructions

### Disable Authentication

Since we are using Clerk as our auth provider, there is ofcouse private keys involved. So to run the application without the auth, we need to disable it.

If you want to run the application without authentication, follow these steps:

1. Navigate to `app/(admin)/layout.tsx`.
2. Find and comment out the following code to disable the redirect to the login screen:
   ```javascript
   if (!userId) {
     return redirect("/login");
   }
   ```
   This will prevent the application from redirecting to the login page if no user is authenticated.

### Running Locally

To run the application locally, follow these steps:

1. Open your terminal.
2. Clone the repository and navigate to the project directory.
3. Install dependencies:
   `npm i`

4. Start the development server:
   `npm run dev`

The application should now be running on http://localhost:3000.

## Live Version

To experience the full functionality of the application, including user authentication, visit the live site:
[User Data Visualizer Dashboard](https://user-data-visualization-mk7aifh96-smitti24s-projects.vercel.app/login)
