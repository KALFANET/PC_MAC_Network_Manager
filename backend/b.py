import requests

# הגדרות ריפוזיטורי
owner = "KALFANET"
repo = "PC_MAC_Network_Manager"
branch = "main"
base_path = "backend"

# תיקיות שיש להתעלם מהן
excluded_dirs = {"node_modules", ".git", "__pycache__"}

# רשימה לשמירת קבצים שמצאנו
collected_files = []

# פונקציה לשליפת תוכן תיקייה מה-API של GitHub
def fetch_directory_contents(path):
    url = f"https://api.github.com/repos/{owner}/{repo}/contents/{path}?ref={branch}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"⚠️ שגיאה בשליפת {url}: {response.status_code}")
        return []

# פונקציה לסריקת תיקיות רקורסיבית
def collect_files_recursive(path, raw_base_url):
    contents = fetch_directory_contents(path)
    
    dist_files = []
    has_dist = False

    for item in contents:
        if item["type"] == "dir":
            dir_name = item["name"]
            if dir_name in excluded_dirs:
                continue  # מתעלם מתיקיות לא רצויות
            if dir_name == "dist":
                has_dist = True  # מסמן שתיקיית dist קיימת
                dist_files = fetch_directory_contents(f"{path}/{dir_name}")  # לוקח את הקבצים בתוכה
            else:
                collect_files_recursive(f"{path}/{dir_name}", raw_base_url)
        elif item["type"] == "file":
            collected_files.append(f"{raw_base_url}/{item['path']}")

    # אם יש dist – לוקח רק אותה, אחרת שומר את המקוריים
    if has_dist and dist_files:
        collected_files[:] = [f"{raw_base_url}/{file['path']}" for file in dist_files]

# פונקציה ראשית
def main():
    raw_base_url = f"https://raw.githubusercontent.com/{owner}/{repo}/{branch}"
    collect_files_recursive(base_path, raw_base_url)

    # שמירת הקישורים לקובץ טקסט
    with open("github_raw_links.txt", "w") as f:
        for link in collected_files:
            f.write(link + "\n")

    print("✅ רשימת הקישורים נשמרה ב-github_raw_links.txt")

if __name__ == "__main__":
    main()
