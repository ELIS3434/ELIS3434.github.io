# Create manifest.json for PWA
manifest_content = """{
    "name": "PetAlert Global - Lost Pets Platform",
    "short_name": "PetAlert",
    "description": "International platform for finding lost pets and reuniting families worldwide",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#ffffff",
    "theme_color": "#2563eb",
    "orientation": "portrait-primary",
    "scope": "/",
    "lang": "en",
    "dir": "ltr",
    "categories": ["social", "utilities", "lifestyle"],
    "icons": [
        {
            "src": "img/icon-192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any maskable"
        },
        {
            "src": "img/icon-512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any maskable"
        },
        {
            "src": "img/favicon.png",
            "sizes": "32x32",
            "type": "image/png"
        }
    ],
    "screenshots": [
        {
            "src": "img/screenshot-desktop.png",
            "sizes": "1280x720",
            "type": "image/png",
            "form_factor": "wide"
        },
        {
            "src": "img/screenshot-mobile.png",
            "sizes": "375x667",
            "type": "image/png",
            "form_factor": "narrow"
        }
    ],
    "shortcuts": [
        {
            "name": "Report Lost Pet",
            "short_name": "Report",
            "description": "Quickly report a lost pet",
            "url": "/add.html?type=lost",
            "icons": [
                {
                    "src": "img/icon-192.png",
                    "sizes": "192x192"
                }
            ]
        },
        {
            "name": "Search Pets",
            "short_name": "Search",
            "description": "Search for lost pets",
            "url": "/announcements.html",
            "icons": [
                {
                    "src": "img/icon-192.png",
                    "sizes": "192x192"
                }
            ]
        }
    ]
}"""

with open("petalert-global/manifest.json", "w", encoding="utf-8") as f:
    f.write(manifest_content)

print("✅ Created manifest.json")