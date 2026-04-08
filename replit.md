# HuePrint

## Overview
HuePrint is a React + Vite web application running on port 5000.

## Tech Stack
- **Frontend**: React 18, Vite 5
- **Language**: JavaScript (JSX)
- **Package Manager**: npm

## Project Structure
```
├── src/
│   ├── App.jsx       # Main application component
│   ├── main.jsx      # React entry point
│   └── index.css     # Global styles
├── index.html        # HTML entry point
├── vite.config.js    # Vite configuration (port 5000, host 0.0.0.0, allowedHosts: true)
└── package.json      # Dependencies and scripts
```

## Running the App
The app runs via the "Start application" workflow:
```
npm run dev
```
This starts the Vite dev server at `http://0.0.0.0:5000`.

## Key Configuration
- Vite is configured with `allowedHosts: true` to work behind the Replit proxy
- Server binds to `0.0.0.0` so it's accessible from the Replit preview pane
