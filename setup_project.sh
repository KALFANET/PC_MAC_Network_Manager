#!/bin/bash

echo "🚀 התחלת יצירת מבנה הפרויקט..."

# יצירת תיקיית backend עם מבנה תיקיות מסודר
mkdir -p backend/src/controllers
mkdir -p backend/src/routes
mkdir -p backend/src/services
mkdir -p backend/src/models
mkdir -p backend/src/config
mkdir -p backend/src/middlewares

# יצירת קבצי הבסיס
touch backend/src/app.js
touch backend/src/database.js
touch backend/.env
touch backend/package.json
touch backend/README.md

# הוספת קובץ .gitkeep לכל תיקייה כדי לוודא שהן נשמרות ב-Git
find backend/src -type d -exec touch {}/.gitkeep \;

# מתן הרשאות הרצה לקובץ עצמו
chmod +x setup_project.sh

# מתן הרשאות קריאה/כתיבה לתיקיית backend
chmod -R 755 backend

# הצגת מבנה הפרויקט לווידוא יצירה תקינה
echo "📂 מבנה הפרויקט שנוצר:"
ls -R backend

echo "✅ יצירת מבנה הפרויקט הושלמה בהצלחה!"