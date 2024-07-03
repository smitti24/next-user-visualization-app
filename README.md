# User Data Visualization Tool

Welcome to the User Data Visualization Tool! This application is built using Next.js and uses Clerk for user authentication. Below you'll find the steps to get started with the application locally and how to access the live version.

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js

## Setup Instructions

### Disable Authentication

Since we are using Clerk as our auth provider, there is ofcourse private keys involved.

In the live running app, I have added Clerk as my auth provider, but ive created a branch for dev that can be pulled that does not contain authentication.

### Running Locally

To run the application locally, follow these steps:

1. Please pull the following branch:
2. Open your terminal.
3. Clone the repository and navigate to the project directory.
4. Install dependencies:
   `npm i`

5. Start the development server:
   `npm run dev`

The application should now be running on http://localhost:3000.

## Live Version

To experience the full functionality of the application, including user authentication, visit the live site:
[User Data Visualizer Dashboard](https://user-data-visualization-mk7aifh96-smitti24s-projects.vercel.app/login)
