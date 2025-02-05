#!/bin/bash

echo "📂 יצירת קבצים חסרים ל-Agent..."

# יצירת תיקיות במידת הצורך
mkdir -p src/services
mkdir -p src/utils
mkdir -p logs
mkdir -p tests

# יצירת קבצים חסרים
touch src/services/device-manager.js
touch src/services/remote-access.js
touch src/agent-communication.js
touch src/utils/logger.js
touch logs/error-logs.js
touch tests/api-test.js
touch tests/network-test.js

echo "✅ כל הקבצים החסרים נוצרו בהצלחה!"