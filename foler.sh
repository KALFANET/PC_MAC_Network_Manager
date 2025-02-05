#!/bin/bash

# יצירת תיקיית client-electron בתוך התיקייה הנוכחית
mkdir -p client-electron
cd client-electron

# יצירת תיקיות משנה
mkdir -p src/{components,pages,utils,services,assets}
mkdir -p public
mkdir -p config

# יצירת קובצי בסיס
touch src/{App.tsx,main.ts,preload.ts,ipcHandler.ts,store.ts,index.tsx}
touch src/components/{Navbar.tsx,Sidebar.tsx,Dashboard.tsx}
touch src/pages/{DevicesPage.tsx,SettingsPage.tsx,UsersPage.tsx}
touch src/services/{api.ts,authService.ts}
touch src/utils/helpers.ts
touch public/index.html
touch config/webpack.config.js
touch package.json
touch tsconfig.json
touch README.md
touch .gitignore

# הוספת תוכן בסיסי ל-index.html
cat <<EOL > public/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PC & MAC Network Manager Client</title>
</head>
<body>
    <div id="root"></div>
    <script src="./bundle.js"></script>
</body>
</html>
EOL

# הוספת תוכן בסיסי ל-package.json
cat <<EOL > package.json
{
  "name": "pc-mac-network-manager-client-electron",
  "version": "1.0.0",
  "description": "Electron-based network manager client",
  "main": "main.ts",
  "scripts": {
    "start": "electron .",
    "build": "webpack"
  },
  "dependencies": {
    "electron": "^28.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "redux": "^4.1.0",
    "react-redux": "^8.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "webpack": "^5.0.0",
    "webpack-cli": "^5.0.0"
  }
}
EOL

# הודעה לסיום
echo "✅ מבנה התיקיות והקבצים של client-electron נוצר בהצלחה בתוך `pwd`!"
