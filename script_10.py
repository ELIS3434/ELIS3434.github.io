# Create additional configuration files

# .gitignore
gitignore_content = """# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Production builds
/build
/dist

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE files
.vscode/
.idea/
*.swp
*.swo
*~

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
.nyc_output

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# next.js build output
.next

# nuxt.js build output
.nuxt

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# Local development
*.local

# Editor backup files
*~
*.bak
*.tmp
*.temp

# Image cache
/img/cache/
/img/uploads/

# User uploads (in production these should be in cloud storage)
/uploads/
/user-uploads/"""

with open("petalert-global/.gitignore", "w", encoding="utf-8") as f:
    f.write(gitignore_content)

# robots.txt
robots_content = """User-agent: *
Allow: /

# Sitemap location
Sitemap: https://yourdomain.com/sitemap.xml

# Disallow sensitive areas
Disallow: /admin/
Disallow: /api/
Disallow: /private/
Disallow: /*.json$
Disallow: /ads/

# Allow social media crawlers
User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

# Crawl-delay for better performance
Crawl-delay: 1"""

with open("petalert-global/robots.txt", "w", encoding="utf-8") as f:
    f.write(robots_content)

# sitemap.xml
sitemap_content = """<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">

    <!-- Homepage -->
    <url>
        <loc>https://yourdomain.com/</loc>
        <lastmod>2025-06-15</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
        <xhtml:link rel="alternate" hreflang="en" href="https://yourdomain.com/?lang=en"/>
        <xhtml:link rel="alternate" hreflang="pl" href="https://yourdomain.com/?lang=pl"/>
        <xhtml:link rel="alternate" hreflang="es" href="https://yourdomain.com/?lang=es"/>
        <xhtml:link rel="alternate" hreflang="de" href="https://yourdomain.com/?lang=de"/>
        <xhtml:link rel="alternate" hreflang="fr" href="https://yourdomain.com/?lang=fr"/>
    </url>

    <!-- Announcements Page -->
    <url>
        <loc>https://yourdomain.com/announcements.html</loc>
        <lastmod>2025-06-15</lastmod>
        <changefreq>hourly</changefreq>
        <priority>0.9</priority>
        <xhtml:link rel="alternate" hreflang="en" href="https://yourdomain.com/announcements.html?lang=en"/>
        <xhtml:link rel="alternate" hreflang="pl" href="https://yourdomain.com/announcements.html?lang=pl"/>
        <xhtml:link rel="alternate" hreflang="es" href="https://yourdomain.com/announcements.html?lang=es"/>
        <xhtml:link rel="alternate" hreflang="de" href="https://yourdomain.com/announcements.html?lang=de"/>
        <xhtml:link rel="alternate" hreflang="fr" href="https://yourdomain.com/announcements.html?lang=fr"/>
    </url>

    <!-- Add Post Page -->
    <url>
        <loc>https://yourdomain.com/add.html</loc>
        <lastmod>2025-06-15</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
        <xhtml:link rel="alternate" hreflang="en" href="https://yourdomain.com/add.html?lang=en"/>
        <xhtml:link rel="alternate" hreflang="pl" href="https://yourdomain.com/add.html?lang=pl"/>
        <xhtml:link rel="alternate" hreflang="es" href="https://yourdomain.com/add.html?lang=es"/>
        <xhtml:link rel="alternate" hreflang="de" href="https://yourdomain.com/add.html?lang=de"/>
        <xhtml:link rel="alternate" hreflang="fr" href="https://yourdomain.com/add.html?lang=fr"/>
    </url>

    <!-- Contact Page -->
    <url>
        <loc>https://yourdomain.com/contact.html</loc>
        <lastmod>2025-06-15</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
        <xhtml:link rel="alternate" hreflang="en" href="https://yourdomain.com/contact.html?lang=en"/>
        <xhtml:link rel="alternate" hreflang="pl" href="https://yourdomain.com/contact.html?lang=pl"/>
        <xhtml:link rel="alternate" hreflang="es" href="https://yourdomain.com/contact.html?lang=es"/>
        <xhtml:link rel="alternate" hreflang="de" href="https://yourdomain.com/contact.html?lang=de"/>
        <xhtml:link rel="alternate" hreflang="fr" href="https://yourdomain.com/contact.html?lang=fr"/>
    </url>

</urlset>"""

with open("petalert-global/sitemap.xml", "w", encoding="utf-8") as f:
    f.write(sitemap_content)

# Create deployment configuration files

# netlify.toml
netlify_config = """[build]
  publish = "."
  command = "echo 'No build step required - static site'"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://unpkg.com https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com; img-src 'self' data: https:; font-src 'self' https://cdnjs.cloudflare.com; connect-src 'self' https:;"

[[headers]]
  for = "/sw.js"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"

[[headers]]
  for = "/manifest.json"
  [headers.values]
    Cache-Control = "public, max-age=86400"

[[headers]]
  for = "*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.png"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.jpg"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[redirects]]
  from = "/pet/*"
  to = "/announcements.html"
  status = 301

[[redirects]]
  from = "/report"
  to = "/add.html"
  status = 301"""

with open("petalert-global/netlify.toml", "w", encoding="utf-8") as f:
    f.write(netlify_config)

# vercel.json
vercel_config = """{
  "version": 2,
  "public": true,
  "github": {
    "enabled": false
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://unpkg.com https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com; img-src 'self' data: https:; font-src 'self' https://cdnjs.cloudflare.com; connect-src 'self' https:;"
        }
      ]
    },
    {
      "source": "/sw.js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/pet/(.*)",
      "destination": "/announcements.html",
      "permanent": true
    },
    {
      "source": "/report",
      "destination": "/add.html",
      "permanent": true
    }
  ]
}"""

with open("petalert-global/vercel.json", "w", encoding="utf-8") as f:
    f.write(vercel_config)

print("✅ Created configuration files (.gitignore, robots.txt, sitemap.xml, netlify.toml, vercel.json)")