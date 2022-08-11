# Getting Started

This is an example of how you can run a project locally. To run a local copy, follow these simple steps as an example.

Current version of node: 16.14.0

### Installation

1. Register on [https://firebase.google.com/](https://firebase.google.com/) in order to get a free API Key
2. Clone the repo `console`
   ```sh
   git clone git@github.com:awicone/pfofile-react-firebase.git
   ```
3. Install required packages `console`
   ```sh
   yarn
   ```
4. In root derictory create an .env file with the following variables (available in .env.example file)
   ```js
   VITE_API_KEY=""
   VITE_AUTH_DOMAIN=""
   VITE_PROJECT_ID=""
   VITE_STORAGE_BUCKET=""
   VITE_MESSAGING_SENDER_ID=""
   VITE_APP_ID=""
   ```
5. Run this project! `console`
   ```js
   yarn dev
   ```

## Usage

In order to perform authorization, you need to create a user in your Firebase personal account (console). After logging in, the user will have access to all the functions of the application.
