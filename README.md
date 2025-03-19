# Peddlebot

[![Build Express Application](https://github.com/edwinhern/express-typescript-2024/actions/workflows/build.yml/badge.svg?branch=master)](https://github.com/edwinhern/express-typescript-2024/actions/workflows/build.yml)
[![Docker Image CI](https://github.com/edwinhern/express-typescript-2024/actions/workflows/docker-image.yml/badge.svg?branch=master)](https://github.com/edwinhern/express-typescript-2024/actions/workflows/docker-image.yml)

Peddlebot is a modern WhatsApp-sending bot designed to integrate with WhatsApp Business. Built with Node/Express and powered by the Express TypeScript Boilerplate 2024, Peddlebot offers a robust, scalable, and secure solution for automated WhatsApp messaging.

## 🌟 Introduction

Welcome to Peddlebot! This application leverages the latest Node.js and Express technologies along with TypeScript to provide a reliable platform for sending WhatsApp messages via WhatsApp Business. Whether you need to broadcast updates, reminders, or alerts, Peddlebot is designed to help you connect with your audience effectively.

## 💡 Motivation and Intentions

Peddlebot was created to streamline the process of setting up and managing WhatsApp Business sessions for automated messaging. Key motivations include:

- **Seamless Integration:** Easily connect with WhatsApp Business for automated communication.
- **Scalability:** Manage sessions and messaging through a robust, PM2-managed Node/Express application.
- **Efficiency:** Reduce manual overhead by automating session management, authentication clearing, and QR code scanning.
- **Modern Development:** Built on the Express TypeScript Boilerplate 2024 to ensure best practices in code quality, testing, and performance.

## 🚀 Features

- **Automated WhatsApp Messaging:** Send messages via WhatsApp Business seamlessly.
- **Session Management:** Verify, clear, and restart sessions to ensure a fresh WhatsApp Business connection.
- **Staging Environment Ready:** Detailed setup steps for deploying on a staging server.
- **PM2 Integration:** Use PM2 to monitor, stop, and restart the application for smooth operations.
- **Real-Time Log Monitoring:** Follow application logs to track QR code generation and session initialization.
- **Modern Tech Stack:** Leverages Express, TypeScript, and Node.js with a scalable project structure.

## 🛠️ WhatsApp Business Setup on Staging Server

Before launching Peddlebot in production, follow these steps on your staging server to set up the WhatsApp Business connection:

1. **Session Verification and Deletion:**  
   Ensure no active WhatsApp Business sessions are running on your main account (on your mobile phone). Check the account settings or use staging commands to verify and terminate any existing sessions.

2. **Staging Server Login:**  
   Access your staging server via SSH (or a similar remote access method) with the appropriate credentials.

3. **Directory Navigation:**  
   Navigate to the Peddlebot directory containing the wa-peddlebot application files.

   ```bash
   cd peddlebot
   ```

4. **Node Version Management:**  
   Use the correct Node.js version for the project:

   ```bash
   nvm use
   ```

   (Make sure NVM is installed on your server.)

5. **pm2 Session Check and Stop:**  
   The wa-peddlebot application is managed by pm2, a process manager. Check if an active pm2 session for wa-peddlebot is running. If a session exists, it needs to be stopped before proceeding. Check for any running PM2 processes:

   ```bash
   pm2 list
   ```

   Then stop the Peddlebot process if active:

   ```bash
   pm2 stop <process_name_or_id>
   ```

6. **Authentication Clearing:**  
   Clear any stored WhatsApp Business authentication data to ensure a clean connection:

   ```bash
   npm run clear-auth
   ```

7. **pm2 Session Restart:**  
   Restart the PM2 session to launch Peddlebot with updated settings:

   ```bash
   pm2 restart <process_name_or_id>
   ```

8. **Log Monitoring:**  
   Monitor the application logs in real-time:

   ```bash
   pm2 logs <process_name_or_id> -f
   ```

9. **QR Code Generation and Scanning:**  
   Once you see the log message "loading complete," a QR code will be generated and displayed in the logs.
   - Open the WhatsApp mobile app (using your master account) and choose the option to link a device.
   - Scan the QR code with your mobile app.  
     This will connect your WhatsApp Business account to Peddlebot.

## 📁 Getting Started

### Step 1: 🚀 Initial Setup

- **Clone the Repository:**
  ```bash
  git clone https://github.com/peddlesoft/whatsapp-peddlebot/
  ```
- **Navigate to the Project:**
  ```bash
  cd whatsapp-peddlebot
  ```
- **Install Dependencies:**
  ```bash
  npm ci
  ```

### Step 2: ⚙️ Environment Configuration

- **Create .env File:**  
  Copy `.env.template` to `.env` and update with your configuration:
  ```bash
  cp .env.template .env
  ```
- **Fill In Required Environment Variables:**  
  Ensure you configure any variables related to your WhatsApp Business API credentials and other settings.

### Step 3: 🏃‍♂️ Running the Project

- **Development Mode:**
  ```bash
  npm run dev
  ```
- **Build the Project:**
  ```bash
  npm run build
  ```
- **Production Mode:**
  Set `NODE_ENV="production"` in your `.env` file, then run:
  ```bash
  npm run build && npm run start
  ```

## 📁 Project Structure

The project is organized following the Express TypeScript Boilerplate 2024 conventions:

```
.
├── api
│   ├── healthCheck
│   │   ├── __tests__
│   │   │   └── healthCheckRouter.test.ts
│   │   └── healthCheckRouter.ts
│   └── whatsapp
│       ├── __tests__
│       │   └── whatsappService.test.ts
│       ├── whatsappController.ts
│       ├── whatsappRouter.ts
│       └── whatsappService.ts
├── common
│   ├── middleware
│   │   ├── errorHandler.ts
│   │   ├── rateLimiter.ts
│   │   └── requestLogger.ts
│   ├── models
│   │   └── serviceResponse.ts
│   └── utils
│       ├── commonValidation.ts
│       └── envConfig.ts
├── index.ts
└── server.ts
```

## 🔧 Testing and Quality Assurance

- **Run Tests:**
  ```bash
  npm run test
  ```
- **Linting and Formatting:**  
  Use ESLint and Prettier to maintain code quality.
- **Continuous Integration:**  
  CI/CD is not set up yet

## 📝 Summary

This guide outlines how to set up WhatsApp Business on a staging server using wa-peddlebot. It involves:

- Checking for and deleting existing sessions.
- Navigating to the wa-peddlebot directory.
- Ensuring the correct Node version is used.
- Stopping any existing pm2 session.
- Clearing authentication.
- Restarting the pm2 session.
- Monitoring logs for "loading complete" and the QR code.
- Scanning the QR code with the master WhatsApp account.
