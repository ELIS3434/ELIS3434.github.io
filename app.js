// PetAlert Global - Main Application JavaScript
// Author: PetAlert Team
// Version: 1.0.0

class PetAlertApp {
    constructor() {
        this.currentLanguage = localStorage.getItem('petalert_language') || 'en';
        this.map = null;
        this.markers = null;
        this.currentLocation = null;
        this.posts = this.loadDemoData();

        this.init();
    }

    init() {
        this.initLanguage();
        this.initEventListeners();
        this.initMap();
        this.initForms();
        this.loadPosts();
        this.initServiceWorker();

        console.log('PetAlert Global initialized successfully');
    }

    // Language System
    initLanguage() {
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.value = this.currentLanguage;
            languageSelect.addEventListener('change', (e) => {
                this.changeLanguage(e.target.value);
            });
        }

        this.applyTranslations();
    }

    changeLanguage(language) {
        this.currentLanguage = language;
        localStorage.setItem('petalert_language', language);
        document.documentElement.lang = language;
        this.applyTranslations();

        // Update page URL for SEO
        const url = new URL(window.location);
        url.searchParams.set('lang', language);
        window.history.replaceState({}, '', url);
    }

    applyTranslations() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            if (translation) {
                if (element.tagName === 'INPUT' && element.type === 'text') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Update placeholders
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const translation = this.getTranslation(key);
            if (translation) {
                element.placeholder = translation;
            }
        });
    }

    getTranslation(key) {
        const translations = {
            en: {
                siteName: "PetAlert Global",
                home: "Home",
                announcements: "Announcements",
                addPost: "Add Post",
                contact: "Contact",
                heroTitle: "Find Your Lost Pet",
                heroSubtitle: "International platform connecting pet owners worldwide to reunite with their beloved companions",
                reportLost: "Report Lost Pet",
                searchPets: "Search Pets",
                reunited: "Pets Reunited",
                activePosts: "Active Posts",
                countries: "Countries",
                support: "Support",
                recentReports: "Recent Reports on Map",
                filters: "Filters",
                petType: "Pet Type",
                all: "All",
                dog: "Dog",
                cat: "Cat",
                bird: "Bird",
                rabbit: "Rabbit",
                other: "Other",
                status: "Status",
                lost: "Lost",
                found: "Found",
                applyFilters: "Apply Filters",
                latestPosts: "Latest Posts",
                viewAll: "View All Posts",
                footerDescription: "Connecting pet owners worldwide to reunite with their beloved companions.",
                quickLinks: "Quick Links",
                followUs: "Follow Us",
                allRightsReserved: "All rights reserved.",
                adSpace: "Advertisement space - Replace with AdSense code",
                // Add more translations...
                allAnnouncements: "All Announcements",
                browseAllPosts: "Browse all lost and found pet reports",
                addNew: "Add New Post",
                searchPlaceholder: "Search by pet name, breed, location...",
                search: "Search",
                newest: "Newest First",
                oldest: "Oldest First",
                byLocation: "By Location",
                filterResults: "Filter Results",
                allCountries: "All Countries",
                dateRange: "Date Range",
                anytime: "Anytime",
                today: "Today",
                thisWeek: "This Week",
                thisMonth: "This Month",
                clearFilters: "Clear Filters",
                createPost: "Create New Post",
                helpReunite: "Help reunite pets with their families",
                selectPostType: "Select Post Type",
                lostPet: "Lost Pet",
                foundPet: "Found Pet",
                lostDescription: "My pet is missing and I need help finding them",
                foundDescription: "I found a pet and want to help reunite them",
                petInformation: "Pet Information",
                petName: "Pet Name",
                petNameRequired: "Pet name is required",
                selectType: "Select type...",
                petTypeRequired: "Pet type is required",
                breed: "Breed",
                color: "Color",
                colorRequired: "Pet color is required",
                size: "Size",
                selectSize: "Select size...",
                small: "Small",
                medium: "Medium",
                large: "Large",
                extraLarge: "Extra Large",
                sizeRequired: "Pet size is required",
                age: "Age (years)",
                petPhoto: "Pet Photo",
                dragDropPhoto: "Drag & drop a photo here or click to browse",
                browseFiles: "Browse Files",
                photoRequired: "Pet photo is required",
                location: "Location",
                country: "Country",
                selectCountry: "Select country...",
                countryRequired: "Country is required",
                city: "City",
                cityRequired: "City is required",
                lastSeenLocation: "Last seen location (optional)",
                markOnMap: "Mark location on map",
                useCurrentLocation: "Use Current Location",
                additionalInfo: "Additional Information",
                dateEvent: "Date lost/found",
                timeEvent: "Time (optional)",
                dateRequired: "Date is required",
                description: "Description",
                descriptionRequired: "Description is required",
                contactInfo: "Contact Information",
                yourName: "Your Name",
                nameRequired: "Name is required",
                phoneNumber: "Phone Number",
                phoneRequired: "Phone number is required",
                emailAddress: "Email Address",
                emailRequired: "Valid email is required",
                submitPost: "Submit Post",
                contactUs: "Contact Us",
                getInTouch: "Get in touch with our team",
                emailSupport: "Email Support",
                emailSupportDesc: "Get help with your account or report issues",
                phoneSupport: "Phone Support",
                phoneSupportDesc: "24/7 emergency support for lost pets",
                liveChat: "Live Chat",
                liveChatDesc: "Chat with our support team in real-time",
                startChat: "Start Chat",
                sendMessage: "Send us a Message",
                firstName: "First Name",
                firstNameRequired: "First name is required",
                lastName: "Last Name",
                lastNameRequired: "Last name is required",
                subject: "Subject",
                selectSubject: "Select a subject...",
                generalInquiry: "General Inquiry",
                technicalSupport: "Technical Support",
                partnership: "Partnership",
                feedback: "Feedback",
                reportIssue: "Report Issue",
                subjectRequired: "Subject is required",
                message: "Message",
                messageRequired: "Message is required",
                subscribeNewsletter: "Subscribe to our newsletter for pet safety tips and updates",
                faq: "Frequently Asked Questions",
                faq1Question: "How do I report a lost pet?",
                faq1Answer: "Click on 'Add Post' in the navigation menu, select 'Lost Pet', fill out the form with your pet's details and upload a clear photo. Our system will automatically notify users in your area.",
                faq2Question: "Is PetAlert Global free to use?",
                faq2Answer: "Yes, all basic features of PetAlert Global are completely free. This includes posting lost/found pet reports, searching the database, and receiving notifications.",
                faq3Question: "How do I search for found pets?",
                faq3Answer: "Visit the 'Announcements' page where you can filter by location, pet type, and date. You can also view recent reports on the interactive map on our homepage.",
                faq4Question: "What should I do if I find a lost pet?",
                faq4Answer: "First, ensure the pet is safe and check for ID tags or microchips. Then post a 'Found Pet' report on our platform with the pet's photo and location details. Also contact local shelters and veterinarians.",
                faq5Question: "How do I delete or update my post?",
                faq5Answer: "After posting, you'll receive an email with a unique link to manage your post. You can use this link to update information or mark your pet as found/reunited."
            },
            pl: {
                siteName: "PetAlert Global",
                home: "Strona główna",
                announcements: "Ogłoszenia",
                addPost: "Dodaj ogłoszenie",
                contact: "Kontakt",
                heroTitle: "Znajdź swojego zagubionego pupila",
                heroSubtitle: "Międzynarodowa platforma łącząca właścicieli zwierząt z całego świata",
                reportLost: "Zgłoś zagubionego pupila",
                searchPets: "Szukaj zwierząt",
                reunited: "Pupile odnalezione",
                activePosts: "Aktywne ogłoszenia",
                countries: "Kraje",
                support: "Wsparcie",
                recentReports: "Najnowsze zgłoszenia na mapie",
                filters: "Filtry",
                petType: "Typ zwierzęcia",
                all: "Wszystkie",
                dog: "Pies",
                cat: "Kot",
                bird: "Ptak",
                rabbit: "Królik",
                other: "Inne",
                status: "Status",
                lost: "Zaginiony",
                found: "Znaleziony",
                applyFilters: "Zastosuj filtry",
                latestPosts: "Najnowsze ogłoszenia",
                viewAll: "Zobacz wszystkie",
                footerDescription: "Łączymy właścicieli zwierząt z całego świata z ich ukochanymi pupilami.",
                quickLinks: "Szybkie linki",
                followUs: "Śledź nas",
                allRightsReserved: "Wszystkie prawa zastrzeżone.",
                adSpace: "Miejsce na reklamę - Zastąp kodem AdSense"
            },
            es: {
                siteName: "PetAlert Global",
                home: "Inicio",
                announcements: "Anuncios",
                addPost: "Añadir publicación",
                contact: "Contacto",
                heroTitle: "Encuentra tu mascota perdida",
                heroSubtitle: "Plataforma internacional que conecta a dueños de mascotas de todo el mundo",
                reportLost: "Reportar mascota perdida",
                searchPets: "Buscar mascotas",
                reunited: "Mascotas reunidas",
                activePosts: "Publicaciones activas",
                countries: "Países",
                support: "Soporte",
                recentReports: "Reportes recientes en el mapa",
                filters: "Filtros",
                petType: "Tipo de mascota",
                all: "Todos",
                dog: "Perro",
                cat: "Gato",
                bird: "Ave",
                rabbit: "Conejo",
                other: "Otro",
                status: "Estado",
                lost: "Perdido",
                found: "Encontrado",
                applyFilters: "Aplicar filtros",
                latestPosts: "Últimas publicaciones",
                viewAll: "Ver todas",
                footerDescription: "Conectando dueños de mascotas de todo el mundo con sus queridos compañeros.",
                quickLinks: "Enlaces rápidos",
                followUs: "Síguenos",
                allRightsReserved: "Todos los derechos reservados.",
                adSpace: "Espacio publicitario - Reemplazar con código AdSense"
            },
            de: {
                siteName: "PetAlert Global",
                home: "Startseite",
                announcements: "Ankündigungen",
                addPost: "Beitrag hinzufügen",
                contact: "Kontakt",
                heroTitle: "Finde dein verlorenes Haustier",
                heroSubtitle: "Internationale Plattform, die Tierbesitzer weltweit verbindet",
                reportLost: "Verlorenes Haustier melden",
                searchPets: "Haustiere suchen",
                reunited: "Wiedervereinigt",
                activePosts: "Aktive Beiträge",
                countries: "Länder",
                support: "Unterstützung",
                recentReports: "Aktuelle Meldungen auf der Karte",
                filters: "Filter",
                petType: "Tierart",
                all: "Alle",
                dog: "Hund",
                cat: "Katze",
                bird: "Vogel",
                rabbit: "Kaninchen",
                other: "Andere",
                status: "Status",
                lost: "Verloren",
                found: "Gefunden",
                applyFilters: "Filter anwenden",
                latestPosts: "Neueste Beiträge",
                viewAll: "Alle anzeigen",
                footerDescription: "Tierbesitzer weltweit mit ihren geliebten Gefährten verbinden.",
                quickLinks: "Schnelle Links",
                followUs: "Folge uns",
                allRightsReserved: "Alle Rechte vorbehalten.",
                adSpace: "Werbefläche - Mit AdSense-Code ersetzen"
            },
            fr: {
                siteName: "PetAlert Global",
                home: "Accueil",
                announcements: "Annonces",
                addPost: "Ajouter une publication",
                contact: "Contact",
                heroTitle: "Trouvez votre animal perdu",
                heroSubtitle: "Plateforme internationale connectant les propriétaires d'animaux du monde entier",
                reportLost: "Signaler un animal perdu",
                searchPets: "Rechercher des animaux",
                reunited: "Animaux retrouvés",
                activePosts: "Publications actives",
                countries: "Pays",
                support: "Support",
                recentReports: "Rapports récents sur la carte",
                filters: "Filtres",
                petType: "Type d'animal",
                all: "Tous",
                dog: "Chien",
                cat: "Chat",
                bird: "Oiseau",
                rabbit: "Lapin",
                other: "Autre",
                status: "Statut",
                lost: "Perdu",
                found: "Trouvé",
                applyFilters: "Appliquer les filtres",
                latestPosts: "Dernières publications",
                viewAll: "Voir tout",
                footerDescription: "Connecter les propriétaires d'animaux du monde entier avec leurs compagnons bien-aimés.",
                quickLinks: "Liens rapides",
                followUs: "Suivez-nous",
                allRightsReserved: "Tous droits réservés.",
                adSpace: "Espace publicitaire - Remplacer par le code AdSense"
            }
        };

        return translations[this.currentLanguage]?.[key] || translations.en[key] || key;
    }

    // Map Initialization
    initMap() {
        const mapElement = document.getElementById('map');
        if (!mapElement) return;

        try {
            // Default: OpenStreetMap (no API key required)
            this.map = L.map('map', {
                preferCanvas: true,
                zoomControl: true
            }).setView([51.505, -0.09], 6);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 18
            }).addTo(this.map);

            // --- Mapbox/Google Maps upgrade point ---
            // To use Mapbox, replace the tileLayer URL and add your API key:
            // L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=YOUR_MAPBOX_KEY', { ... })
            // To use Google Maps, use a plugin and your API key.

            // Initialize marker cluster group
            if (window.L && L.markerClusterGroup) {
                this.markers = L.markerClusterGroup({
                    maxClusterRadius: 50,
                    spiderfyOnMaxZoom: true,
                    showCoverageOnHover: false,
                    zoomToBoundsOnClick: true
                });
                this.map.addLayer(this.markers);
            } else {
                this.markers = L.layerGroup().addTo(this.map);
            }

            this.addDemoMarkers();
            this.initLocationMap();

        } catch (error) {
            console.error('Error initializing map:', error);
        }
    }

    addDemoMarkers() {
        if (!this.map || !this.markers) return;

        const demoMarkers = [
            { lat: 52.5200, lng: 13.4050, type: 'lost', name: 'Max - German Shepherd', city: 'Berlin, DE' },
            { lat: 51.5074, lng: -0.1278, type: 'found', name: 'Luna - Tabby Cat', city: 'London, UK' },
            { lat: 48.8566, lng: 2.3522, type: 'lost', name: 'Bella - Golden Retriever', city: 'Paris, FR' },
            { lat: 52.2297, lng: 21.0122, type: 'found', name: 'Rex - Mixed Breed', city: 'Warsaw, PL' },
            { lat: 40.7128, lng: -74.0060, type: 'lost', name: 'Charlie - Beagle', city: 'New York, US' },
            { lat: 34.0522, lng: -118.2437, type: 'found', name: 'Milo - Persian Cat', city: 'Los Angeles, US' }
        ];

        demoMarkers.forEach(marker => {
            const icon = L.divIcon({
                className: `pet-marker pet-marker-${marker.type}`,
                html: `<i class="fas fa-${marker.type === 'lost' ? 'search' : 'heart'}"></i>`,
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            });

            const mapMarker = L.marker([marker.lat, marker.lng], { icon })
                .bindPopup(`
                    <div class="pet-popup">
                        <h6>${marker.name}</h6>
                        <p><strong>Status:</strong> ${marker.type === 'lost' ? 'Lost' : 'Found'}</p>
                        <p><strong>Location:</strong> ${marker.city}</p>
                        <button class="btn btn-sm btn-primary">View Details</button>
                    </div>
                `);

            this.markers.addLayer(mapMarker);
        });
    }

    initLocationMap() {
        const locationMapElement = document.getElementById('locationMap');
        if (!locationMapElement) return;

        try {
            const locationMap = L.map('locationMap').setView([51.505, -0.09], 10);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(locationMap);

            let locationMarker = null;

            locationMap.on('click', (e) => {
                if (locationMarker) {
                    locationMap.removeLayer(locationMarker);
                }

                locationMarker = L.marker(e.latlng).addTo(locationMap);
                document.getElementById('latitude').value = e.latlng.lat;
                document.getElementById('longitude').value = e.latlng.lng;
            });

        } catch (error) {
            console.error('Error initializing location map:', error);
        }
    }

    // Event Listeners
    initEventListeners() {
        // Post type selection
        document.querySelectorAll('.post-type-card').forEach(card => {
            card.addEventListener('click', (e) => {
                document.querySelectorAll('.post-type-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                document.getElementById('postType').value = card.dataset.type;
            });
        });

        // File upload
        this.initFileUpload();

        // Use current location button
        const useLocationBtn = document.getElementById('useCurrentLocation');
        if (useLocationBtn) {
            useLocationBtn.addEventListener('click', () => {
                this.getCurrentLocation();
            });
        }

        // Filter buttons
        const applyFiltersBtn = document.getElementById('applyFilters');
        if (applyFiltersBtn) {
            applyFiltersBtn.addEventListener('click', () => {
                this.applyFilters();
            });
        }

        const clearFiltersBtn = document.getElementById('clearFilters');
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', () => {
                this.clearFilters();
            });
        }

        // Search functionality
        const searchBtn = document.getElementById('searchBtn');
        const searchInput = document.getElementById('searchInput');
        if (searchBtn && searchInput) {
            searchBtn.addEventListener('click', () => {
                this.performSearch(searchInput.value);
            });

            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch(searchInput.value);
                }
            });
        }

        // Live chat button
        const liveChatBtn = document.getElementById('liveChatBtn');
        if (liveChatBtn) {
            liveChatBtn.addEventListener('click', () => {
                this.startLiveChat();
            });
        }
    }

    initFileUpload() {
        const fileInput = document.getElementById('petPhoto');
        const browseBtn = document.getElementById('browseBtn');
        const uploadArea = document.querySelector('.upload-area');
        const previewDiv = document.getElementById('photoPreview');
        const previewImg = document.getElementById('previewImage');
        const placeholder = document.getElementById('uploadPlaceholder');

        if (!fileInput || !uploadArea) return;

        if (browseBtn) {
            browseBtn.addEventListener('click', () => fileInput.click());
        }

        uploadArea.addEventListener('click', () => fileInput.click());

        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.handleFileSelect(files[0]);
            }
        });

        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.handleFileSelect(e.target.files[0]);
            }
        });
    }

    handleFileSelect(file) {
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file.');
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            alert('File size must be less than 5MB.');
            return;
        }

        // Create FormData for upload
        const formData = new FormData();
        formData.append('petPhoto', file);

        // Show loading state
        const previewDiv = document.getElementById('photoPreview');
        const previewImg = document.getElementById('previewImage');
        const placeholder = document.getElementById('uploadPlaceholder');
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'loading';
        loadingIndicator.innerHTML = 'Uploading...';
        
        if (previewDiv && placeholder) {
            previewDiv.style.display = 'block';
            placeholder.style.display = 'none';
            previewDiv.appendChild(loadingIndicator);
        }

        // Upload file to server
        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Update preview with uploaded image
                if (previewImg && previewDiv && placeholder) {
                    previewImg.src = data.file.url;
                    previewDiv.removeChild(loadingIndicator);
                }
                // Store the file URL in a hidden input
                const fileUrlInput = document.getElementById('petPhotoUrl');
                if (fileUrlInput) {
                    fileUrlInput.value = data.file.url;
                }
            } else {
                throw new Error(data.error || 'Upload failed');
            }
        })
        .catch(error => {
            console.error('Upload error:', error);
            alert('Failed to upload image. Please try again.');
            if (previewDiv && placeholder) {
                previewDiv.style.display = 'none';
                placeholder.style.display = 'block';
                if (loadingIndicator.parentNode === previewDiv) {
                    previewDiv.removeChild(loadingIndicator);
                }
            }
        });
    }

    // Forms
    initForms() {
        const petForm = document.getElementById('petForm');
        const contactForm = document.getElementById('contactForm');

        if (petForm) {
            petForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitPetForm();
            });
        }

        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitContactForm();
            });
        }
    }

    submitPetForm() {
        const form = document.getElementById('petForm');
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        // Collect form data
        const formData = new FormData(form);
        const petData = Object.fromEntries(formData.entries());

        // Add to local storage for demo
        const posts = JSON.parse(localStorage.getItem('petalert_posts') || '[]');
        petData.id = Date.now();
        petData.datePosted = new Date().toISOString();
        posts.unshift(petData);
        localStorage.setItem('petalert_posts', JSON.stringify(posts));

        // Show success message
        this.showSuccessMessage('Post submitted successfully! Your pet has been added to our database.');

        // Reset form
        form.reset();
        form.classList.remove('was-validated');

        // Hide photo preview
        const previewDiv = document.getElementById('photoPreview');
        const placeholder = document.getElementById('uploadPlaceholder');
        if (previewDiv && placeholder) {
            previewDiv.style.display = 'none';
            placeholder.style.display = 'block';
        }
    }

    submitContactForm() {
        const form = document.getElementById('contactForm');
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        // Simulate form submission
        this.showSuccessMessage('Thank you for your message! We will get back to you within 24 hours.');
        form.reset();
        form.classList.remove('was-validated');
    }

    // Utility functions
    getCurrentLocation() {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by this browser.');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                // Update location map if it exists
                const locationMap = window.locationMapInstance;
                if (locationMap) {
                    locationMap.setView([lat, lng], 13);
                    L.marker([lat, lng]).addTo(locationMap);
                }

                // Update form fields
                document.getElementById('latitude').value = lat;
                document.getElementById('longitude').value = lng;

                // Reverse geocoding (simplified)
                this.reverseGeocode(lat, lng);
            },
            (error) => {
                console.error('Error getting location:', error);
                alert('Could not get your current location. Please select manually on the map.');
            }
        );
    }

    reverseGeocode(lat, lng) {
        // Default: Nominatim (OpenStreetMap) - public endpoint, no API key
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
            .then(response => response.json())
            .then(data => {
                if (data.address) {
                    const cityInput = document.getElementById('city');
                    if (cityInput) {
                        cityInput.value = data.address.city || data.address.town || data.address.village || '';
                    }
                }
            })
            .catch(error => {
                // Fallback: leave city blank, log error
                console.error('Reverse geocoding error:', error);
            });
    }

    applyFilters() {
        // Implement filtering logic here
        console.log('Applying filters...');
        this.loadPosts();
    }

    clearFilters() {
        // Reset all filter inputs
        document.querySelectorAll('#petTypeFilter, #countryFilter, #dateFilter, #statusFilter').forEach(filter => {
            filter.value = 'all';
        });

        document.querySelectorAll('#lostCheck, #foundCheck').forEach(checkbox => {
            checkbox.checked = true;
        });

        this.loadPosts();
    }

    performSearch(query) {
        console.log('Searching for:', query);
        // Implement search logic here
        this.loadPosts();
    }

    startLiveChat() {
        // Implement live chat functionality
        alert('Live chat feature will be available soon! Please use our contact form for now.');
    }

    showSuccessMessage(message) {
        // Create and show success alert
        const alert = document.createElement('div');
        alert.className = 'alert alert-success alert-dismissible fade show position-fixed';
        alert.style.cssText = 'top: 20px; right: 20px; z-index: 9999; max-width: 400px;';
        alert.innerHTML = `
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        document.body.appendChild(alert);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (alert.parentNode) {
                alert.parentNode.removeChild(alert);
            }
        }, 5000);
    }

    // Demo data and post loading
    loadDemoData() {
        return [
            {
                id: 1,
                postType: 'lost',
                petName: 'Max',
                petType: 'dog',
                breed: 'German Shepherd',
                color: 'Brown and Black',
                size: 'large',
                country: 'DE',
                city: 'Berlin',
                dateEvent: '2025-06-10',
                description: 'Friendly dog, responds to whistle calls. Last seen in Tiergarten park.',
                contactName: 'Anna Schmidt',
                contactPhone: '+49 30 12345678',
                datePosted: '2025-06-11T10:00:00Z'
            },
            {
                id: 2,
                postType: 'found',
                petName: 'Unknown Cat',
                petType: 'cat',
                breed: 'Tabby',
                color: 'Orange and White',
                size: 'medium',
                country: 'GB',
                city: 'London',
                dateEvent: '2025-06-12',
                description: 'Sweet cat found near Hyde Park. Very friendly, well-fed.',
                contactName: 'James Wilson',
                contactPhone: '+44 20 7946 0958',
                datePosted: '2025-06-12T15:30:00Z'
            }
        ];
    }

    loadPosts() {
        const postsContainer = document.getElementById('postsContainer');
        const latestPostsContainer = document.getElementById('latestPosts');

        if (postsContainer) {
            this.renderPosts(postsContainer, this.posts);
        }

        if (latestPostsContainer) {
            this.renderPosts(latestPostsContainer, this.posts.slice(0, 6));
        }
    }

    renderPosts(container, posts) {
        container.innerHTML = '';

        posts.forEach(post => {
            const postCard = this.createPostCard(post);
            container.appendChild(postCard);
        });
    }

    createPostCard(post) {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4 mb-4';

        const statusBadge = post.postType === 'lost' ? 
            '<span class="pet-status lost">Lost</span>' : 
            '<span class="pet-status found">Found</span>';

        col.innerHTML = `
            <div class="card pet-card h-100">
                <div class="position-relative">
                    <img src="https://via.placeholder.com/300x200?text=${post.petName}" class="card-img-top" alt="${post.petName}">
                    ${statusBadge}
                </div>
                <div class="card-body">
                    <h5 class="card-title">${post.petName}</h5>
                    <p class="card-text">
                        <strong>Type:</strong> ${post.petType}<br>
                        <strong>Location:</strong> ${post.city}, ${post.country}<br>
                        <strong>Date:</strong> ${new Date(post.dateEvent).toLocaleDateString()}
                    </p>
                    <p class="card-text text-muted">${post.description.substring(0, 100)}...</p>
                </div>
                <div class="card-footer">
                    <button class="btn btn-primary btn-sm">View Details</button>
                    <button class="btn btn-outline-primary btn-sm">Contact</button>
                </div>
            </div>
        `;

        return col;
    }

    // Service Worker
    initServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker registered successfully');
                })
                .catch(error => {
                    console.error('Service Worker registration failed:', error);
                });
        }
    }

    // API call example with fallback to demo data
    fetchPetsFromAPI(filters = {}) {
        // Placeholder for real API endpoint
        const apiUrl = 'https://api.petalert.global/pets'; // Replace with your backend
        return fetch(apiUrl)
            .then(res => res.ok ? res.json() : Promise.reject('API error'))
            .catch(() => {
                // Fallback: return demo/mock data
                return this.loadDemoData();
            });
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.petAlertApp = new PetAlertApp();
});

// Add CSS for pet markers
const style = document.createElement('style');
style.textContent = `
    .pet-marker {
        background: #fff;
        border-radius: 50%;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #fff;
    }

    .pet-marker-lost {
        background: #ef4444;
    }

    .pet-marker-found {
        background: #22c55e;
    }

    .pet-popup {
        text-align: center;
        min-width: 200px;
    }

    .pet-popup h6 {
        margin-bottom: 0.5rem;
        color: #1e293b;
    }

    .pet-popup p {
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
    }
`;
document.head.appendChild(style);

// Cloudinary config - REPLACE <your-upload-preset> with your actual unsigned upload preset name
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dosxdpkuf/upload';
const CLOUDINARY_UPLOAD_PRESET = '<your-upload-preset>'; // <-- Fill this in from your Cloudinary dashboard

// Utility: Upload image to Cloudinary and return the URL
async function uploadToCloudinary(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    const res = await fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: formData
    });
    const data = await res.json();
    if (data.secure_url) return data.secure_url;
    throw new Error(data.error?.message || 'Upload failed');
}

// --- Main App Logic ---
document.addEventListener('DOMContentLoaded', function () {
    // Map setup
    let map = L.map('map').setView([52.2297, 21.0122], 6); // Centered on Poland
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    let marker;

    // Location picker for form
    map.on('click', function (e) {
        if (marker) map.removeLayer(marker);
        marker = L.marker(e.latlng).addTo(map);
        document.getElementById('petLocation').value = `${e.latlng.lat.toFixed(5)}, ${e.latlng.lng.toFixed(5)}`;
    });
    document.getElementById('useLocation').onclick = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (pos) {
                const lat = pos.coords.latitude;
                const lng = pos.coords.longitude;
                map.setView([lat, lng], 13);
                if (marker) map.removeLayer(marker);
                marker = L.marker([lat, lng]).addTo(map);
                document.getElementById('petLocation').value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
            });
        }
    };

    // Photo upload preview and Cloudinary upload
    let uploadedImageUrl = '';
    document.getElementById('petPhoto').addEventListener('change', async function (e) {
        const file = e.target.files[0];
        if (!file) return;
        const previewDiv = document.getElementById('photoPreview');
        previewDiv.innerHTML = '<span class="text-muted">Uploading...</span>';
        try {
            const url = await uploadToCloudinary(file);
            uploadedImageUrl = url;
            previewDiv.innerHTML = `<img src="${url}" alt="Preview" class="img-fluid rounded" style="max-height:150px;">`;
        } catch (err) {
            previewDiv.innerHTML = '<span class="text-danger">Upload failed. Try again.</span>';
            uploadedImageUrl = '';
        }
    });

    // Add post form logic
    document.getElementById('postForm').onsubmit = function (e) {
        e.preventDefault();
        const name = document.getElementById('petName').value.trim();
        const type = document.getElementById('petType').value;
        const status = document.getElementById('petStatus').value;
        const location = document.getElementById('petLocation').value;
        const desc = document.getElementById('petDesc').value.trim();
        if (!name || !type || !status || !location || !desc || !uploadedImageUrl) {
            alert('Please fill in all fields and upload a photo.');
            return;
        }
        // Save post to localStorage
        const posts = JSON.parse(localStorage.getItem('pf24_posts') || '[]');
        posts.unshift({
            name, type, status, location, desc, image: uploadedImageUrl, date: new Date().toISOString()
        });
        localStorage.setItem('pf24_posts', JSON.stringify(posts));
        // Reset form
        this.reset();
        document.getElementById('photoPreview').innerHTML = '';
        uploadedImageUrl = '';
        renderPosts();
        alert('Post added!');
    };

    // Render posts
    function renderPosts() {
        const posts = JSON.parse(localStorage.getItem('pf24_posts') || '[]');
        const container = document.getElementById('recentPosts');
        container.innerHTML = '';
        if (!posts.length) {
            container.innerHTML = '<div class="col-12 text-center text-muted">No posts yet.</div>';
            return;
        }
        posts.slice(0, 6).forEach((post, idx) => {
            const col = document.createElement('div');
            col.className = 'col-12 fade-in';
            col.innerHTML = `
                <div class="social-card">
                    <img src="${post.image}" class="avatar" alt="Pet photo">
                    <div class="card-content">
                        <div class="pet-name">${getPetTypeIcon(post.type)}${post.name}</div>
                        <div class="badges">
                            <span class="badge bg-${post.status === 'lost' ? 'danger' : 'success'}">${post.status.charAt(0).toUpperCase() + post.status.slice(1)}</span>
                            <span class="badge bg-secondary">${post.type}</span>
                        </div>
                        <div class="pet-location"><i class="bi bi-geo-alt"></i> ${post.location}
                            <button class="action-btn" title="Copy location" onclick="navigator.clipboard.writeText('${post.location}')"><i class="bi bi-clipboard"></i></button>
                            <button class="action-btn" title="Show on map" onclick="window.showOnMap('${post.location}')"><i class="bi bi-map"></i></button>
                        </div>
                        <div class="pet-date">${new Date(post.date).toLocaleDateString()}</div>
                        <div class="pet-desc">${post.desc}</div>
                        <button class="action-btn text-danger" title="Delete post" onclick="window.deletePost(${idx})"><i class="bi bi-trash"></i></button>
                    </div>
                </div>
            `;
            container.appendChild(col);
        });
    }
    renderPosts();

    // Search logic
    document.getElementById('searchForm').onsubmit = function (e) {
        e.preventDefault();
        const q = document.getElementById('searchInput').value.trim().toLowerCase();
        const type = document.getElementById('typeFilter').value;
        const status = document.getElementById('statusFilter').value;
        const posts = JSON.parse(localStorage.getItem('pf24_posts') || '[]');
        const filtered = posts.filter(post => {
            return (!q || post.name.toLowerCase().includes(q) || post.desc.toLowerCase().includes(q) || post.location.toLowerCase().includes(q)) &&
                (!type || post.type === type) &&
                (!status || post.status === status);
        });
        const container = document.getElementById('recentPosts');
        container.innerHTML = '';
        if (!filtered.length) {
            container.innerHTML = '<div class="col-12 text-center text-muted">No matching posts.</div>';
            return;
        }
        filtered.slice(0, 6).forEach(post => {
            const col = document.createElement('div');
            col.className = 'col-12';
            col.innerHTML = `
                <div class="social-card">
                    <img src="${post.image}" class="avatar" alt="Pet photo">
                    <div class="card-content">
                        <div class="pet-name">${post.name}</div>
                        <div class="badges">
                            <span class="badge bg-${post.status === 'lost' ? 'danger' : 'success'}">${post.status.charAt(0).toUpperCase() + post.status.slice(1)}</span>
                            <span class="badge bg-secondary">${post.type}</span>
                        </div>
                        <div class="pet-location"><i class="bi bi-geo-alt"></i> ${post.location}</div>
                        <div class="pet-date">${new Date(post.date).toLocaleDateString()}</div>
                        <div class="pet-desc">${post.desc}</div>
                    </div>
                </div>
            `;
            container.appendChild(col);
        });
    };

    // Success stories (static demo)
    function renderStories() {
        const stories = [
            { name: 'Max', desc: 'Max was found after 3 days thanks to the community!', img: 'https://res.cloudinary.com/demo/image/upload/v1690000000/max.jpg', author: 'Sarah Johnson, Berlin' },
            { name: 'Bella', desc: 'Bella reunited with her family in Warsaw!', img: 'https://res.cloudinary.com/demo/image/upload/v1690000000/bella.jpg', author: 'Anna Nowak, Warsaw' },
        ];
        const container = document.getElementById('successStories');
        container.innerHTML = '';
        stories.forEach(story => {
            const col = document.createElement('div');
            col.className = 'col-md-6 mb-4';
            col.innerHTML = `
                <div class="card h-100 shadow-sm">
                    <div class="row g-0 align-items-center">
                        <div class="col-4 text-center">
                            <img src="${story.img}" class="img-fluid rounded-circle m-3" style="max-height:100px;">
                        </div>
                        <div class="col-8">
                            <div class="card-body">
                                <h5 class="card-title">${story.name}</h5>
                                <p class="card-text small">${story.desc}</p>
                                <div class="text-muted small">${story.author}</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(col);
        });
    }
    renderStories();

    // Language switcher (demo only)
    window.setLang = function(lang) {
        alert('Language switching is a demo. Implement translations as needed.');
    };

    // Dark mode toggle
    document.getElementById('darkModeToggle').onclick = function() {
        document.body.classList.toggle('dark-mode');
        document.documentElement.classList.toggle('dark-mode');
        this.innerHTML = document.body.classList.contains('dark-mode') ? '<i class="bi bi-brightness-high"></i>' : '<i class="bi bi-moon"></i>';
    };
});

function getPetTypeIcon(type) {
    switch(type) {
        case 'dog': return '<i class="bi bi-shield-shaded pet-type-icon" title="Dog"></i>';
        case 'cat': return '<i class="bi bi-emoji-smile pet-type-icon" title="Cat"></i>';
        case 'bird': return '<i class="bi bi-twitter pet-type-icon" title="Bird"></i>';
        default: return '<i class="bi bi-question-circle pet-type-icon" title="Other"></i>';
    }
}

window.deletePost = function(idx) {
    const posts = JSON.parse(localStorage.getItem('pf24_posts') || '[]');
    posts.splice(idx, 1);
    localStorage.setItem('pf24_posts', JSON.stringify(posts));
    renderPosts();
};

window.showOnMap = function(location) {
    const [lat, lng] = location.split(',').map(Number);
    if (!isNaN(lat) && !isNaN(lng)) {
        map.setView([lat, lng], 15);
        if (marker) map.removeLayer(marker);
        marker = L.marker([lat, lng]).addTo(map);
    }
};

// --- Firebase Config ---
// TODO: Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAD15kGuroFJjTVHf8Mzta6wScutnVkXaU",
  authDomain: "petfinder24-947d4.firebaseapp.com",
  projectId: "petfinder24-947d4",
  storageBucket: "petfinder24-947d4.appspot.com",
  messagingSenderId: "742115560500",
  appId: "1:742115560500:web:ed53e23a5defa93f76ce61",
  measurementId: "G-DQH2KEXBF7"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// --- Google Maps Integration ---
let map, marker;
window.initMap = function() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 52.2297, lng: 21.0122 },
        zoom: 6,
        disableDefaultUI: false
    });
    map.addListener('click', function(e) {
        setMarker(e.latLng.lat(), e.latLng.lng());
        document.getElementById('petLocation').value = `${e.latLng.lat().toFixed(5)}, ${e.latLng.lng().toFixed(5)}`;
    });
};
function setMarker(lat, lng) {
    if (marker) marker.setMap(null);
    marker = new google.maps.Marker({ position: { lat, lng }, map });
}
document.getElementById('useLocation').onclick = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos) {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;
            map.setCenter({ lat, lng });
            map.setZoom(13);
            setMarker(lat, lng);
            document.getElementById('petLocation').value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
        }, function(err) {
            alert('Could not get your location.');
        });
    } else {
        alert('Geolocation is not supported by your browser.');
    }
};

// --- Firestore Posts Logic ---
async function fetchPosts() {
    const snapshot = await db.collection('posts').orderBy('date', 'desc').limit(6).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
async function addPost(post) {
    await db.collection('posts').add(post);
}
async function deletePostFirestore(id) {
    await db.collection('posts').doc(id).delete();
}

// --- UI Logic ---
async function renderPosts() {
    const posts = await fetchPosts();
    const container = document.getElementById('recentPosts');
    container.innerHTML = '';
    if (!posts.length) {
        container.innerHTML = '<div class="col-12 text-center text-muted">No posts yet.</div>';
        return;
    }
    posts.forEach(post => {
        const col = document.createElement('div');
        col.className = 'col-12 fade-in';
        col.innerHTML = `
            <div class="social-card">
                <img src="${post.image}" class="avatar" alt="Pet photo">
                <div class="card-content">
                    <div class="pet-name">${getPetTypeIcon(post.type)}${post.name}</div>
                    <div class="badges">
                        <span class="badge bg-${post.status === 'lost' ? 'danger' : 'success'}">${post.status.charAt(0).toUpperCase() + post.status.slice(1)}</span>
                        <span class="badge bg-secondary">${post.type}</span>
                    </div>
                    <div class="pet-location"><i class="bi bi-geo-alt"></i> ${post.location}
                        <button class="action-btn" title="Copy location" onclick="navigator.clipboard.writeText('${post.location}')"><i class="bi bi-clipboard"></i></button>
                        <button class="action-btn" title="Show on map" onclick="window.showOnMap('${post.location}')"><i class="bi bi-map"></i></button>
                    </div>
                    <div class="pet-date">${new Date(post.date).toLocaleDateString()}</div>
                    <div class="pet-desc">${post.desc}</div>
                    <button class="action-btn text-danger" title="Delete post" onclick="window.deletePostFirestore('${post.id}').then(renderPosts)"><i class="bi bi-trash"></i></button>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
}
window.deletePostFirestore = deletePostFirestore;
window.showOnMap = function(location) {
    const [lat, lng] = location.split(',').map(Number);
    if (!isNaN(lat) && !isNaN(lng)) {
        map.setCenter({ lat, lng });
        map.setZoom(15);
        setMarker(lat, lng);
    }
};

// --- Form Submission ---
let uploadedImageUrl = '';
document.getElementById('petPhoto').addEventListener('change', async function (e) {
    const file = e.target.files[0];
    if (!file) return;
    const previewDiv = document.getElementById('photoPreview');
    previewDiv.innerHTML = '<span class="text-muted">Uploading...</span>';
    try {
        const url = await uploadToCloudinary(file);
        uploadedImageUrl = url;
        previewDiv.innerHTML = `<img src="${url}" alt="Preview" class="img-fluid rounded" style="max-height:150px;">`;
    } catch (err) {
        previewDiv.innerHTML = '<span class="text-danger">Upload failed. Try again.</span>';
        uploadedImageUrl = '';
    }
});

document.getElementById('postForm').onsubmit = async function (e) {
    e.preventDefault();
    const name = document.getElementById('petName').value.trim();
    const type = document.getElementById('petType').value;
    const status = document.getElementById('petStatus').value;
    const location = document.getElementById('petLocation').value;
    const desc = document.getElementById('petDesc').value.trim();
    if (!name || !type || !status || !location || !desc || !uploadedImageUrl) {
        alert('Please fill in all fields and upload a photo.');
        return;
    }
    const post = {
        name, type, status, location, desc, image: uploadedImageUrl, date: new Date().toISOString()
    };
    await addPost(post);
    this.reset();
    document.getElementById('photoPreview').innerHTML = '';
    uploadedImageUrl = '';
    renderPosts();
    alert('Post added!');
};

// --- On Load ---
document.addEventListener('DOMContentLoaded', function () {
    renderPosts();
    // ... other UI logic ...
});
