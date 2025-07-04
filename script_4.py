# Create comprehensive CSS file
css_content = """:root {
    --primary-color: #2563eb;
    --secondary-color: #3b82f6;
    --success-color: #22c55e;
    --danger-color: #ef4444;
    --warning-color: #f59e0b;
    --info-color: #06b6d4;
    --light-color: #f8fafc;
    --dark-color: #1e293b;
    --gray-100: #f1f5f9;
    --gray-200: #e2e8f0;
    --gray-300: #cbd5e1;
    --gray-400: #94a3b8;
    --gray-500: #64748b;
    --gray-600: #475569;
    --gray-700: #334155;
    --gray-800: #1e293b;
    --gray-900: #0f172a;
    --border-radius: 0.5rem;
    --box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --transition: all 0.3s ease;
}

* {
    box-sizing: border-box;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: var(--gray-700);
    background-color: #ffffff;
}

/* Enhanced Typography */
h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 1rem;
}

h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.75rem; }
h4 { font-size: 1.5rem; }
h5 { font-size: 1.25rem; }
h6 { font-size: 1rem; }

/* Navigation Enhancements */
.navbar-brand {
    font-size: 1.5rem;
    font-weight: 700;
}

.navbar-nav .nav-link {
    font-weight: 500;
    padding: 0.75rem 1rem;
    border-radius: var(--border-radius);
    transition: var(--transition);
}

.navbar-nav .nav-link:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-1px);
}

.navbar-nav .nav-link.active {
    background-color: rgba(255, 255, 255, 0.2);
    font-weight: 600;
}

/* Hero Section */
.hero-section {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    position: relative;
    overflow: hidden;
    min-height: 60vh;
    display: flex;
    align-items: center;
}

.hero-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    opacity: 0.3;
}

.hero-section .container {
    position: relative;
    z-index: 2;
}

/* Page Header */
.page-header {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    padding: 3rem 0;
}

/* Cards and Components */
.card {
    border: none;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    transition: var(--transition);
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.card-header {
    border-bottom: none;
    border-radius: var(--border-radius) var(--border-radius) 0 0 !important;
    font-weight: 600;
}

/* Button Enhancements */
.btn {
    font-weight: 500;
    border-radius: var(--border-radius);
    padding: 0.75rem 1.5rem;
    transition: var(--transition);
    border: none;
    position: relative;
    overflow: hidden;
}

.btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
}

.btn:hover::before {
    left: 100%;
}

.btn-primary {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.5);
}

.btn-warning {
    background: linear-gradient(135deg, var(--warning-color) 0%, #fbbf24 100%);
    color: white;
}

.btn-warning:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px -5px rgba(245, 158, 11, 0.5);
    color: white;
}

/* Form Enhancements */
.form-control, .form-select {
    border: 2px solid var(--gray-200);
    border-radius: var(--border-radius);
    padding: 0.75rem 1rem;
    transition: var(--transition);
    font-size: 1rem;
}

.form-control:focus, .form-select:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 0.2rem rgba(37, 99, 235, 0.25);
}

.form-label {
    font-weight: 600;
    color: var(--gray-700);
    margin-bottom: 0.5rem;
}

/* Map Container */
.map-container {
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--box-shadow);
}

#map {
    border-radius: var(--border-radius);
}

/* Post Type Selection */
.post-type-card {
    cursor: pointer;
    transition: var(--transition);
    border: 2px solid var(--gray-200);
}

.post-type-card:hover {
    transform: translateY(-3px);
    box-shadow: var(--box-shadow);
}

.post-type-card.active {
    border-color: var(--primary-color);
    background-color: rgba(37, 99, 235, 0.05);
}

/* Upload Area */
.upload-area {
    border: 2px dashed var(--gray-300);
    background-color: var(--gray-50);
    transition: var(--transition);
    cursor: pointer;
}

.upload-area:hover {
    border-color: var(--primary-color);
    background-color: rgba(37, 99, 235, 0.05);
}

.upload-area.dragover {
    border-color: var(--primary-color);
    background-color: rgba(37, 99, 235, 0.1);
}

.border-dashed {
    border-style: dashed !important;
}

/* Pet Cards */
.pet-card {
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--box-shadow);
    transition: var(--transition);
    border: 1px solid var(--gray-200);
}

.pet-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.pet-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.pet-card .card-body {
    padding: 1.5rem;
}

.pet-status {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 0.25rem 0.75rem;
    border-radius: 50px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
}

.pet-status.lost {
    background-color: var(--danger-color);
    color: white;
}

.pet-status.found {
    background-color: var(--success-color);
    color: white;
}

/* Statistics */
.stat-item {
    padding: 1rem;
    transition: var(--transition);
}

.stat-item:hover {
    transform: translateY(-3px);
}

.stat-item h3 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

/* Ad Spaces */
.ad-banner {
    border-top: 1px solid var(--gray-200);
    border-bottom: 1px solid var(--gray-200);
}

#banner-ad, #sidebar-ad {
    background-color: var(--gray-100);
    border: 1px solid var(--gray-200);
    border-radius: var(--border-radius);
    min-height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Footer */
footer {
    background: linear-gradient(135deg, var(--gray-800) 0%, var(--gray-900) 100%);
}

footer a {
    text-decoration: none;
    transition: var(--transition);
}

footer a:hover {
    color: var(--primary-color) !important;
    transform: translateX(5px);
}

.social-links a {
    transition: var(--transition);
}

.social-links a:hover {
    transform: translateY(-3px);
}

/* Leaflet Map Customizations */
.leaflet-popup-content-wrapper {
    border-radius: var(--border-radius);
}

.leaflet-popup-content {
    margin: 1rem;
    line-height: 1.6;
}

/* Responsive Design */
@media (max-width: 768px) {
    .hero-section {
        min-height: 50vh;
        text-align: center;
    }
    
    .hero-section h1 {
        font-size: 2rem;
    }
    
    .hero-section .lead {
        font-size: 1rem;
    }
    
    .btn-lg {
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
    }
    
    .stat-item h3 {
        font-size: 2rem;
    }
    
    .card-body {
        padding: 1rem;
    }
}

@media (max-width: 576px) {
    .hero-section h1 {
        font-size: 1.75rem;
    }
    
    .hero-section .btn {
        display: block;
        width: 100%;
        margin-bottom: 0.5rem;
    }
    
    .stat-item {
        margin-bottom: 1rem;
    }
    
    .pet-card {
        margin-bottom: 1rem;
    }
}

/* Loading States */
.loading {
    opacity: 0.6;
    pointer-events: none;
}

.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid var(--primary-color);
    border-radius: 50%;
    border-top-color: transparent;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

/* Accessibility Improvements */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

/* Focus Styles */
.btn:focus, .form-control:focus, .form-select:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(37, 99, 235, 0.25);
}

/* Animation Classes */
.fade-in {
    animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.slide-in-left {
    animation: slideInLeft 0.5s ease-out;
}

@keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-30px); }
    to { opacity: 1; transform: translateX(0); }
}

.slide-in-right {
    animation: slideInRight 0.5s ease-out;
}

@keyframes slideInRight {
    from { opacity: 0; transform: translateX(30px); }
    to { opacity: 1; transform: translateX(0); }
}

/* Print Styles */
@media print {
    .navbar, .ad-banner, #sidebar-ad, footer {
        display: none !important;
    }
    
    .container {
        max-width: none !important;
    }
    
    .card {
        box-shadow: none;
        border: 1px solid var(--gray-300);
    }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
    :root {
        --gray-100: #1e293b;
        --gray-200: #334155;
        --gray-300: #475569;
        --gray-400: #64748b;
        --gray-500: #94a3b8;
        --gray-600: #cbd5e1;
        --gray-700: #e2e8f0;
        --gray-800: #f1f5f9;
        --gray-900: #f8fafc;
    }
    
    body {
        background-color: var(--gray-900);
        color: var(--gray-700);
    }
    
    .card {
        background-color: var(--gray-800);
        color: var(--gray-700);
    }
    
    .form-control, .form-select {
        background-color: var(--gray-800);
        border-color: var(--gray-600);
        color: var(--gray-700);
    }
    
    .bg-light {
        background-color: var(--gray-800) !important;
    }
}"""

with open("petalert-global/css/style.css", "w", encoding="utf-8") as f:
    f.write(css_content)

print("✅ Created style.css")