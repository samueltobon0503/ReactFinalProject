# Spotify React Client Application
# Equipo sin nombre (Samuel Tobon, Jhoel Torres, Nicoles Restrepo)

This project is a medium size React-based web application designed to consume the Spotify API, offering a rich user experience for music interaction. It boasts a modular architecture, comprehensive authentication mechanisms, and a focus on security and maintainability, to use the app you have to enter by 127.0 0.1:3000 because it is the way that the app is registered in the integrations portals.

## Features

- **Spotify API Integration**: Seamlessly interacts with the Spotify API to provide music browsing, playback, and playlist management capabilities.
- **Comprehensive Authentication**:
  - **Firebase Integration**: Utilizes Firebase for robust backend services.
  - **Multiple Sign-in Options**: Supports user authentication via Email/Password, Google, and Spotify accounts.
- **Modular Architecture**: Organized into distinct modules (e.g., dashboard, profile) for better code organization and scalability.
- **Core Services**: Includes a core module that simulates backend functionality and handles service calls, centralizing data fetching and business logic.
- **User Dashboard**: A dedicated section for users to manage their music, playlists, and preferences.
- **User Profile Management**: Allows users to view and potentially update their profile information.
- **Secure Token Management**: Implements security measures such as token encryption before storing sensitive user tokens in `localStorage`.
- **Environment Variable Configuration**: Easily configurable using environment variables for sensitive data and API keys.
- **Responsive UI**: Built with modern UI frameworks for a consistent and visually appealing experience across devices.

## Technologies Used

### Frontend:
- React (Core library)
- Bootstrap (CSS Framework)
- PrimeReact (UI Component Library)

### Backend/Services:
- Firebase (Authentication, Storage)
- Spotify Web API

### Security:
- Token Encryption (for localStorage)

## Architecture Overview

The application follows a modular and component-based architecture, designed for scalability and maintainability.

## Installation & Setup

To get a local copy up and running, follow these simple steps:

1. **Clone the repository**:
* In console *
git clone (https://github.com/samueltobon0503/ReactFinalProject)
cd npm install
npm start
in the browser use 127.0 0.1:3000
