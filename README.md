# Mulamumammba API Manager Web Client


![1](https://github.com/user-attachments/assets/1f4438db-afd5-438c-8130-ee08ca09553f)

## Overview
Mulamumammba API Manager Web Client is a React-based frontend built with Next.js. It serves as the user interface for testing various APIs and creating RESTful APIs by integrating with the Mulamumammba API Manager backend.

## Features
- User authentication (login and registration)
- API testing UI for providing base URLs and endpoints
- Dashboard to manage created APIs
- Responsive and user-friendly design

## Technologies Used
- **Frontend Framework:** Next.js (React)
- **Styling:** CSS Modules & Global CSS
- **State Management:** Local State (extendable to Redux or Context API)
- **API Communication:** Fetch API
- **Backend:** Java with Springboot [(Located at this repo)](https://github.com/MulamuMammba/APIManager)

## Directory Structure
```
└── mulamumammba-apimanager-webclient/
    ├── README.md
    ├── jsconfig.json
    ├── next.config.mjs
    ├── package.json
    ├── public/
    └── src/
        └── app/
            ├── globals.css
            ├── layout.js
            ├── page.js
            ├── page.module.css
            ├── dashboard/
            │   ├── dashboard.css
            │   └── page.js
            ├── login/
            │   └── page.js
            └── register/
                └── page.js
```

## Getting Started
### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/mulamumammba-apimanager-webclient.git
   ```
2. Navigate to the project directory:
   ```sh
   cd mulamumammba-apimanager-webclient
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```
5. The application will be available at `http://localhost:3000`

## API Integration
This frontend is designed to communicate with the Mulamumammba API Manager backend. Ensure the backend is running and update API URLs in the codebase accordingly.

## Available Pages
- **Home (`/`)** - Landing page
- **Login (`/login`)** - User authentication page
- **Register (`/register`)** - User registration page
- **Dashboard (`/dashboard`)** - API management interface

## Contributing
Contributions are welcome! Fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.

## Additional Screenshots

![3](https://github.com/user-attachments/assets/3b331ea3-2862-4e0f-809d-1b12159c4572)
![2](https://github.com/user-attachments/assets/63ff5880-3ec5-4e12-820b-2ee022902da9)
![1](https://github.com/user-attachments/assets/d0807c66-c247-43b6-bb92-0f3eb61f4494)


