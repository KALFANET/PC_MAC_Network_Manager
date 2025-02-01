#!/bin/bash

# יצירת התיקייה הראשית
mkdir -p PC_MAC_Network_Manager

# מעבר לתוך התיקייה הראשית
cd PC_MAC_Network_Manager || exit

# יצירת מבנה backend
mkdir -p backend/src/{controllers,routes,services,models,config,middlewares}
touch backend/src/app.js
touch backend/src/database.js
touch backend/.env
touch backend/package.json
touch backend/README.md

# הוספת קובץ gitkeep בתיקיות ריקות כדי לוודא שהן יתעדכנו ב-Git
touch backend/src/controllers/.gitkeep
touch backend/src/routes/.gitkeep
touch backend/src/services/.gitkeep
touch backend/src/models/.gitkeep
touch backend/src/config/.gitkeep
touch backend/src/middlewares/.gitkeep

# יצירת תיקייה ל-Frontend (לעתיד)
mkdir -p frontend

# הודעה לסיום
echo "✅ מבנה הפרויקט נוצר בהצלחה!"