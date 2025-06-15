import os
import zipfile
from datetime import datetime

# Create directory structure
os.makedirs("petalert-global", exist_ok=True)
os.makedirs("petalert-global/css", exist_ok=True)
os.makedirs("petalert-global/js", exist_ok=True)
os.makedirs("petalert-global/img", exist_ok=True)
os.makedirs("petalert-global/ads", exist_ok=True)

# Create index.html
index_html = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PetAlert Global - Lost Pets Platform</title>
    <meta name="description" content="International platform for finding lost pets. Report and search for missing animals worldwide.">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/leaflet.markercluster@1.4.1/dist/MarkerCluster.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="manifest" href="manifest.json">
    <link rel="icon" type="image/png" href="img/favicon.png">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
        <div class="container">
            <a class="navbar-brand fw-bold" href="index.html">
                <i class="fas fa-paw me-2"></i>
                <span data-i18n="siteName">PetAlert Global</span>
            </a>
            
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link active" href="index.html" data-i18n="home">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="announcements.html" data-i18n="announcements">Announcements</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="add.html" data-i18n="addPost">Add Post</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="contact.html" data-i18n="contact">Contact</a>
                    </li>
                </ul>
                
                <div class="d-flex align-items-center">
                    <select id="languageSelect" class="form-select form-select-sm me-3" style="width: auto;">
                        <option value="en">English</option>
                        <option value="pl">Polski</option>
                        <option value="es">Español</option>
                        <option value="de">Deutsch</option>
                        <option value="fr">Français</option>
                    </select>
                </div>
            </div>
        </div>
    </nav>

    <!-- Ad Banner -->
    <div class="ad-banner text-center py-2 bg-light">
        <div class="container">
            <div id="banner-ad" style="min-height: 90px; display: flex; align-items: center; justify-content: center;">
                <small class="text-muted" data-i18n="adSpace">Advertisement space - Replace with AdSense code</small>
            </div>
        </div>
    </div>

    <!-- Hero Section -->
    <section class="hero-section py-5 text-white">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6">
                    <h1 class="display-4 fw-bold mb-4" data-i18n="heroTitle">Find Your Lost Pet</h1>
                    <p class="lead mb-4" data-i18n="heroSubtitle">International platform connecting pet owners worldwide to reunite with their beloved companions</p>
                    <div class="d-flex gap-3">
                        <a href="add.html" class="btn btn-warning btn-lg" data-i18n="reportLost">Report Lost Pet</a>
                        <a href="announcements.html" class="btn btn-outline-light btn-lg" data-i18n="searchPets">Search Pets</a>
                    </div>
                </div>
                <div class="col-lg-6 text-center">
                    <i class="fas fa-search fa-10x opacity-50"></i>
                </div>
            </div>
        </div>
    </section>

    <!-- Quick Stats -->
    <section class="py-4 bg-light">
        <div class="container">
            <div class="row text-center">
                <div class="col-md-3">
                    <div class="stat-item">
                        <h3 class="text-primary mb-0">12,542</h3>
                        <small class="text-muted" data-i18n="reunited">Pets Reunited</small>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="stat-item">
                        <h3 class="text-success mb-0">3,891</h3>
                        <small class="text-muted" data-i18n="activePosts">Active Posts</small>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="stat-item">
                        <h3 class="text-info mb-0">156</h3>
                        <small class="text-muted" data-i18n="countries">Countries</small>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="stat-item">
                        <h3 class="text-warning mb-0">24/7</h3>
                        <small class="text-muted" data-i18n="support">Support</small>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Interactive Map -->
    <section class="py-5">
        <div class="container">
            <div class="row">
                <div class="col-lg-9">
                    <h2 class="mb-4" data-i18n="recentReports">Recent Reports on Map</h2>
                    <div class="map-container shadow rounded">
                        <div id="map" style="height: 500px;"></div>
                    </div>
                </div>
                <div class="col-lg-3">
                    <!-- Filters -->
                    <div class="card shadow-sm">
                        <div class="card-header bg-primary text-white">
                            <h5 class="mb-0" data-i18n="filters">Filters</h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label" data-i18n="petType">Pet Type:</label>
                                <select class="form-select" id="typeFilter">
                                    <option value="all" data-i18n="all">All</option>
                                    <option value="dog" data-i18n="dog">Dog</option>
                                    <option value="cat" data-i18n="cat">Cat</option>
                                    <option value="bird" data-i18n="bird">Bird</option>
                                    <option value="other" data-i18n="other">Other</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label" data-i18n="status">Status:</label>
                                <select class="form-select" id="statusFilter">
                                    <option value="all" data-i18n="all">All</option>
                                    <option value="lost" data-i18n="lost">Lost</option>
                                    <option value="found" data-i18n="found">Found</option>
                                </select>
                            </div>
                            <button class="btn btn-primary w-100" id="applyFilters" data-i18n="applyFilters">Apply Filters</button>
                        </div>
                    </div>

                    <!-- Ad Sidebar -->
                    <div class="mt-4">
                        <div id="sidebar-ad" class="text-center p-3 bg-light rounded">
                            <small class="text-muted" data-i18n="adSpace">Advertisement space</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Latest Posts -->
    <section class="py-5 bg-light">
        <div class="container">
            <h2 class="text-center mb-5" data-i18n="latestPosts">Latest Posts</h2>
            <div class="row" id="latestPosts">
                <!-- Posts will be loaded dynamically -->
            </div>
            <div class="text-center mt-4">
                <a href="announcements.html" class="btn btn-outline-primary" data-i18n="viewAll">View All Posts</a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-dark text-white py-5">
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <h5 data-i18n="siteName">PetAlert Global</h5>
                    <p class="text-muted" data-i18n="footerDescription">Connecting pet owners worldwide to reunite with their beloved companions.</p>
                </div>
                <div class="col-md-4">
                    <h6 data-i18n="quickLinks">Quick Links</h6>
                    <ul class="list-unstyled">
                        <li><a href="announcements.html" class="text-muted" data-i18n="announcements">Announcements</a></li>
                        <li><a href="add.html" class="text-muted" data-i18n="addPost">Add Post</a></li>
                        <li><a href="contact.html" class="text-muted" data-i18n="contact">Contact</a></li>
                    </ul>
                </div>
                <div class="col-md-4">
                    <h6 data-i18n="followUs">Follow Us</h6>
                    <div class="social-links">
                        <a href="#" class="text-muted me-3"><i class="fab fa-facebook fa-2x"></i></a>
                        <a href="#" class="text-muted me-3"><i class="fab fa-twitter fa-2x"></i></a>
                        <a href="#" class="text-muted"><i class="fab fa-instagram fa-2x"></i></a>
                    </div>
                </div>
            </div>
            <hr class="my-4">
            <div class="text-center">
                <p class="mb-0">&copy; 2025 PetAlert Global. <span data-i18n="allRightsReserved">All rights reserved.</span></p>
            </div>
        </div>
    </footer>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js"></script>
    <script src="js/app.js"></script>
</body>
</html>"""

with open("petalert-global/index.html", "w", encoding="utf-8") as f:
    f.write(index_html)

print("✅ Created index.html")