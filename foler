#!/bin/bash

# GitHub Token (יש להחליף בערך האמיתי שלך)
GITHUB_TOKEN="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"

# הגדרת ה-URL של המאגר ב-GitHub
GITHUB_REPO="https://github.com/KALFANET/PC_MAC_Network_Manager"

# שם התיקייה שנסרוק
TARGET_DIR="client-electron"

# קובץ פלט
OUTPUT_FILE="client-electron-files.txt"

# רשימת תיקיות שאין לכלול בקובץ הייצוא
EXCLUDE_DIRS=("node_modules" "dist" ".git" ".github" ".vscode" "__MACOSX")

# הגדרת הנתיבים לכלים
CURL=$(command -v curl)
JQ=$(command -v jq)
GREP="/usr/bin/grep"

# בדיקה אם curl, jq ו-grep זמינים
if [ -z "$CURL" ]; then
  echo "שגיאה: curl לא נמצא במערכת! יש להתקין אותו לפני הרצת הסקריפט."
  exit 1
fi

if [ -z "$JQ" ]; then
  echo "שגיאה: jq לא נמצא במערכת! יש להתקין אותו באמצעות: brew install jq (למשתמשי macOS)"
  exit 1
fi

if [ ! -x "$GREP" ]; then
  echo "שגיאה: grep לא נמצא בנתיב /usr/bin/grep"
  exit 1
fi

# פונקציה לשליפת קישורים מתיקייה ב-GitHub (תומך בסריקה רקורסיבית)
fetch_files() {
  local DIRECTORY=$1
  echo "סורק: $DIRECTORY"

  # שליפת נתונים מה-API עם אימות (GitHub Token)
  RESPONSE=$($CURL -s -H "Authorization: token $GITHUB_TOKEN" \
                "https://api.github.com/repos/KALFANET/PC_MAC_Network_Manager/contents/$DIRECTORY")

  # בדיקה אם ה-API החזיר הודעת שגיאה
  if echo "$RESPONSE" | $GREP -q "API rate limit exceeded"; then
    echo "שגיאה: חרגת ממגבלת ה-API של GitHub! נסה שוב מאוחר יותר או השתמש ב-Token עם גישה מורחבת."
    exit 1
  fi

  # בדיקה אם ה-API החזיר JSON תקין
  if ! echo "$RESPONSE" | $JQ empty > /dev/null 2>&1; then
    echo "שגיאה: הנתונים שהתקבלו מה-API אינם תקינים!"
    exit 1
  fi

  # עיבוד הנתונים רק אם הם תקינים
  echo "$RESPONSE" | $JQ -r '.[] | "\(.type) \(.path) \(.download_url)"' |
  while read -r TYPE PATH URL; do
    # סינון תיקיות מיותרות
    for EXCLUDED in "${EXCLUDE_DIRS[@]}"; do
      if [[ "$PATH" == *"$EXCLUDED"* ]]; then
        continue 2
      fi
    done

    # אם זה קובץ, נוסיף אותו לרשימה
    if [[ "$TYPE" == "file" ]]; then
      echo "$GITHUB_REPO/blob/main/$PATH" >> "$OUTPUT_FILE"
    fi

    # אם זה תיקייה, נבצע שליפה רקורסיבית
    if [[ "$TYPE" == "dir" ]]; then
      fetch_files "$PATH"
    fi
  done
}

# ניקוי תוכן הקובץ הקיים (אם יש)
> "$OUTPUT_FILE"

# קריאה לפונקציה כדי לשלוף את כל הקבצים מהתיקייה הנדרשת
fetch_files "$TARGET_DIR"

echo "יצוא הושלם! קובץ הקישורים נשמר כ- $OUTPUT_FILE"