# Create add.html
add_html = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Post - PetAlert Global</title>
    <meta name="description" content="Report a lost or found pet to help reunite families with their beloved companions.">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="css/style.css">
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
                        <a class="nav-link" href="index.html" data-i18n="home">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="announcements.html" data-i18n="announcements">Announcements</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="add.html" data-i18n="addPost">Add Post</a>
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

    <!-- Page Header -->
    <section class="page-header py-4 bg-primary text-white">
        <div class="container">
            <h1 class="mb-0" data-i18n="createPost">Create New Post</h1>
            <p class="mb-0 opacity-75" data-i18n="helpReunite">Help reunite pets with their families</p>
        </div>
    </section>

    <!-- Main Form -->
    <section class="py-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="card shadow">
                        <div class="card-body p-5">
                            <form id="petForm" novalidate>
                                <!-- Post Type Selection -->
                                <div class="mb-4">
                                    <h4 class="mb-3" data-i18n="selectPostType">Select Post Type</h4>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="card border-danger post-type-card" data-type="lost">
                                                <div class="card-body text-center">
                                                    <i class="fas fa-search fa-3x text-danger mb-3"></i>
                                                    <h5 class="text-danger" data-i18n="lostPet">Lost Pet</h5>
                                                    <p class="text-muted" data-i18n="lostDescription">My pet is missing and I need help finding them</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="card border-success post-type-card" data-type="found">
                                                <div class="card-body text-center">
                                                    <i class="fas fa-heart fa-3x text-success mb-3"></i>
                                                    <h5 class="text-success" data-i18n="foundPet">Found Pet</h5>
                                                    <p class="text-muted" data-i18n="foundDescription">I found a pet and want to help reunite them</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <input type="hidden" id="postType" name="postType" required>
                                </div>

                                <!-- Pet Information -->
                                <div class="mb-4">
                                    <h4 class="mb-3" data-i18n="petInformation">Pet Information</h4>
                                    
                                    <div class="row">
                                        <div class="col-md-6 mb-3">
                                            <label for="petName" class="form-label" data-i18n="petName">Pet Name</label>
                                            <input type="text" class="form-control" id="petName" name="petName" required>
                                            <div class="invalid-feedback" data-i18n="petNameRequired">Pet name is required</div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <label for="petType" class="form-label" data-i18n="petType">Pet Type</label>
                                            <select class="form-select" id="petType" name="petType" required>
                                                <option value="" data-i18n="selectType">Select type...</option>
                                                <option value="dog" data-i18n="dog">Dog</option>
                                                <option value="cat" data-i18n="cat">Cat</option>
                                                <option value="bird" data-i18n="bird">Bird</option>
                                                <option value="rabbit" data-i18n="rabbit">Rabbit</option>
                                                <option value="other" data-i18n="other">Other</option>
                                            </select>
                                            <div class="invalid-feedback" data-i18n="petTypeRequired">Pet type is required</div>
                                        </div>
                                    </div>
                                    
                                    <div class="row">
                                        <div class="col-md-6 mb-3">
                                            <label for="petBreed" class="form-label" data-i18n="breed">Breed</label>
                                            <input type="text" class="form-control" id="petBreed" name="petBreed">
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <label for="petColor" class="form-label" data-i18n="color">Color</label>
                                            <input type="text" class="form-control" id="petColor" name="petColor" required>
                                            <div class="invalid-feedback" data-i18n="colorRequired">Pet color is required</div>
                                        </div>
                                    </div>
                                    
                                    <div class="row">
                                        <div class="col-md-6 mb-3">
                                            <label for="petSize" class="form-label" data-i18n="size">Size</label>
                                            <select class="form-select" id="petSize" name="petSize" required>
                                                <option value="" data-i18n="selectSize">Select size...</option>
                                                <option value="small" data-i18n="small">Small</option>
                                                <option value="medium" data-i18n="medium">Medium</option>
                                                <option value="large" data-i18n="large">Large</option>
                                                <option value="extra-large" data-i18n="extraLarge">Extra Large</option>
                                            </select>
                                            <div class="invalid-feedback" data-i18n="sizeRequired">Pet size is required</div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <label for="petAge" class="form-label" data-i18n="age">Age (years)</label>
                                            <input type="number" class="form-control" id="petAge" name="petAge" min="0" max="30">
                                        </div>
                                    </div>
                                </div>

                                <!-- Photo Upload -->
                                <div class="mb-4">
                                    <h4 class="mb-3" data-i18n="petPhoto">Pet Photo</h4>
                                    <div class="upload-area border-dashed rounded-3 p-4 text-center">
                                        <div id="photoPreview" class="mb-3" style="display: none;">
                                            <img id="previewImage" src="" alt="Preview" class="img-fluid rounded" style="max-height: 300px;">
                                        </div>
                                        <div id="uploadPlaceholder">
                                            <i class="fas fa-cloud-upload-alt fa-3x text-muted mb-3"></i>
                                            <p class="text-muted" data-i18n="dragDropPhoto">Drag & drop a photo here or click to browse</p>
                                            <button type="button" class="btn btn-outline-primary" id="browseBtn" data-i18n="browseFiles">Browse Files</button>
                                        </div>
                                        <input type="file" id="petPhoto" name="petPhoto" accept="image/*" style="display: none;" required>
                                        <div class="invalid-feedback" data-i18n="photoRequired">Pet photo is required</div>
                                    </div>
                                </div>

                                <!-- Location -->
                                <div class="mb-4">
                                    <h4 class="mb-3" data-i18n="location">Location</h4>
                                    <div class="row">
                                        <div class="col-md-6 mb-3">
                                            <label for="country" class="form-label" data-i18n="country">Country</label>
                                            <select class="form-select" id="country" name="country" required>
                                                <option value="" data-i18n="selectCountry">Select country...</option>
                                                <option value="US">United States</option>
                                                <option value="GB">United Kingdom</option>
                                                <option value="DE">Germany</option>
                                                <option value="FR">France</option>
                                                <option value="ES">Spain</option>
                                                <option value="PL">Poland</option>
                                                <option value="IT">Italy</option>
                                            </select>
                                            <div class="invalid-feedback" data-i18n="countryRequired">Country is required</div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <label for="city" class="form-label" data-i18n="city">City</label>
                                            <input type="text" class="form-control" id="city" name="city" required>
                                            <div class="invalid-feedback" data-i18n="cityRequired">City is required</div>
                                        </div>
                                    </div>
                                    
                                    <div class="mb-3">
                                        <label for="address" class="form-label" data-i18n="lastSeenLocation">Last seen location (optional)</label>
                                        <input type="text" class="form-control" id="address" name="address" placeholder="Street address or landmark">
                                    </div>
                                    
                                    <div class="mb-3">
                                        <label for="mapLocation" class="form-label" data-i18n="markOnMap">Mark location on map</label>
                                        <div id="locationMap" style="height: 300px;" class="rounded border"></div>
                                        <input type="hidden" id="latitude" name="latitude">
                                        <input type="hidden" id="longitude" name="longitude">
                                    </div>
                                    
                                    <button type="button" class="btn btn-outline-primary" id="useCurrentLocation">
                                        <i class="fas fa-map-marker-alt me-2"></i>
                                        <span data-i18n="useCurrentLocation">Use Current Location</span>
                                    </button>
                                </div>

                                <!-- Date and Description -->
                                <div class="mb-4">
                                    <h4 class="mb-3" data-i18n="additionalInfo">Additional Information</h4>
                                    
                                    <div class="row">
                                        <div class="col-md-6 mb-3">
                                            <label for="dateEvent" class="form-label" data-i18n="dateEvent">Date lost/found</label>
                                            <input type="date" class="form-control" id="dateEvent" name="dateEvent" required>
                                            <div class="invalid-feedback" data-i18n="dateRequired">Date is required</div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <label for="timeEvent" class="form-label" data-i18n="timeEvent">Time (optional)</label>
                                            <input type="time" class="form-control" id="timeEvent" name="timeEvent">
                                        </div>
                                    </div>
                                    
                                    <div class="mb-3">
                                        <label for="description" class="form-label" data-i18n="description">Description</label>
                                        <textarea class="form-control" id="description" name="description" rows="4" required placeholder="Describe your pet's personality, special markings, circumstances of disappearance..."></textarea>
                                        <div class="invalid-feedback" data-i18n="descriptionRequired">Description is required</div>
                                    </div>
                                </div>

                                <!-- Contact Information -->
                                <div class="mb-4">
                                    <h4 class="mb-3" data-i18n="contactInfo">Contact Information</h4>
                                    
                                    <div class="row">
                                        <div class="col-md-6 mb-3">
                                            <label for="contactName" class="form-label" data-i18n="yourName">Your Name</label>
                                            <input type="text" class="form-control" id="contactName" name="contactName" required>
                                            <div class="invalid-feedback" data-i18n="nameRequired">Name is required</div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <label for="contactPhone" class="form-label" data-i18n="phoneNumber">Phone Number</label>
                                            <input type="tel" class="form-control" id="contactPhone" name="contactPhone" required>
                                            <div class="invalid-feedback" data-i18n="phoneRequired">Phone number is required</div>
                                        </div>
                                    </div>
                                    
                                    <div class="mb-3">
                                        <label for="contactEmail" class="form-label" data-i18n="emailAddress">Email Address</label>
                                        <input type="email" class="form-control" id="contactEmail" name="contactEmail" required>
                                        <div class="invalid-feedback" data-i18n="emailRequired">Valid email is required</div>
                                    </div>
                                </div>

                                <!-- Submit -->
                                <div class="text-center">
                                    <button type="submit" class="btn btn-primary btn-lg px-5">
                                        <i class="fas fa-paper-plane me-2"></i>
                                        <span data-i18n="submitPost">Submit Post</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
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
    <script src="js/app.js"></script>
</body>
</html>"""

with open("petalert-global/add.html", "w", encoding="utf-8") as f:
    f.write(add_html)

print("✅ Created add.html")