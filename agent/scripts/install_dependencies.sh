#!/bin/bash

echo "🚀 התקנת כל התלויות עבור ה-Agent..."

# 1️⃣ עדכון מערכת והתקנת חבילות בסיסיות
echo "🔄 מעדכן את המערכת..."
sudo apt update && sudo apt upgrade -y

# 2️⃣ התקנת Node.js ו-NPM (אם לא קיים)
if ! command -v node &> /dev/null
then
    echo "📥 מתקין Node.js ו-NPM..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt install -y nodejs
else
    echo "✅ Node.js כבר מותקן."
fi

# 3️⃣ התקנת Python3 (נדרש עבור סקריפטים מסוימים)
if ! command -v python3 &> /dev/null
then
    echo "📥 מתקין Python3..."
    sudo apt install -y python3 python3-pip
else
    echo "✅ Python3 כבר מותקן."
fi

# 4️⃣ התקנת תלויות Node.js
echo "📦 מתקין חבילות Node.js..."
npm install

# 5️⃣ התקנת תלויות Python (במידה והסקריפטים דורשים זאת)
echo "🐍 מתקין תלויות Python..."
pip3 install -r requirements.txt || echo "⚠️ קובץ requirements.txt לא נמצא, דלג..."

# 6️⃣ התקנת PM2 לניהול התהליכים
if ! command -v pm2 &> /dev/null
then
    echo "📥 מתקין PM2 לניהול תהליכי ה-Agent..."
    npm install -g pm2
else
    echo "✅ PM2 כבר מותקן."
fi

# 7️⃣ הגדרת הרשאות להרצת הסקריפטים
echo "🔧 נותן הרשאות הרצה לסקריפטים..."
chmod +x scripts/*.sh

echo "✅ כל התלויות הותקנו בהצלחה!"