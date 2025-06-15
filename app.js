class PetAlertApp {
    constructor() {
        this.posts = [];
        this.filteredPosts = [];
        this.currentPage = 1;
        this.postsPerPage = 12;
        this.currentView = 'grid';
        this.map = null;
        this.markers = [];
        
        this.init();
    }

    init() {
        this.initMap();
        this.loadPosts();
        this.setupEventListeners();
        this.setupFilters();
    }

    initMap() {
        this.map = L.map('map').setView([52.520008, 13.404954], 6);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);

        // Add sample markers
        this.addSampleMarkers();
    }

    addSampleMarkers() {
        const samplePets = [
            { lat: 52.520008, lng: 13.404954, name: "Max", type: "lost", status: "dog" },
            { lat: 52.370216, lng: 4.895168, name: "Luna", type: "found", status: "cat" },
            { lat: 48.856614, lng: 2.352222, name: "Buddy", type: "reunited", status: "dog" }
        ];

        samplePets.forEach(pet => {
            const icon = this.getMarkerIcon(pet.type);
            const marker = L.marker([pet.lat, pet.lng], { icon })
                .addTo(this.map)
                .bindPopup(`
                    <div class="popup-content">
                        <h6>${pet.name}</h6>
                        <p>Status: ${pet.type}</p>
                        <p>Type: ${pet.status}</p>
                    </div>
                `);
            
            this.markers.push(marker);
        });
    }

    getMarkerIcon(type) {
        const colors = {
            lost: '#ef4444',
            found: '#22c55e',
            reunited: '#f59e0b'
        };

        return L.divIcon({
            html: `<div style="background-color: ${colors[type]}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
            iconSize: [20, 20],
            className: 'custom-marker'
        });
    }

    loadPosts() {
        // Simulate API call
        setTimeout(() => {
            this.posts = this.generateSamplePosts();
            this.filteredPosts = [...this.posts];
            this.renderPosts();
        }, 500);
    }

    generateSamplePosts() {
        const pets = [
            {
                id: 1,
                name: "Max",
                type: "dog",
                breed: "Golden Retriever",
                status: "lost",
                location: "Berlin, Germany",
                date: "2025-06-14",
                image: "img/dog1.jpg",
                description: "Friendly golden retriever, responds to Max"
            },
            {
                id: 2,
                name: "Luna",
                type: "cat",
                breed: "Persian",
                status: "found",
                location: "Amsterdam, Netherlands",
                date: "2025-06-13",
                image: "img/cat1.jpg",
                description: "White Persian cat found near central park"
            },
            // Add more sample pets...
        ];

        return pets;
    }

    renderPosts() {
        const container = document.getElementById('postsContainer');
        const startIndex = (this.currentPage - 1) * this.postsPerPage;
        const endIndex = startIndex + this.postsPerPage;
        const postsToShow = this.filteredPosts.slice(0, endIndex);

        if (this.currentPage === 1) {
            container.innerHTML = '';
        }

        postsToShow.slice(startIndex).forEach(post => {
            const postElement = this.createPostElement(post);
            container.appendChild(postElement);
        });

        // Update view class
        container.className = this.currentView === 'grid' ? 'posts-grid' : 'posts-list';
    }

    createPostElement(post) {
        const div = document.createElement('div');
        div.className = 'pet-card';
        div.onclick = () => this.showPostDetails(post);

        div.innerHTML = `
            <img src="${post.image}" alt="${post.name}" class="pet-image">
            <div class="pet-info">
                <span class="pet-status status-${post.status}">${post.status.toUpperCase()}</span>
                <div class="pet-name">${post.name}</div>
                <div class="pet-details">${post.breed} • ${post.type}</div>
                <div class="pet-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${post.location}
                </div>
                <div class="pet-date">
                    <small class="text-muted">${this.formatDate(post.date)}</small>
                </div>
            </div>
        `;

        return div;
    }

    setupEventListeners() {
        // Quick filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.applyFilter(e.target.dataset.filter);
            });
        });

        // Search input
        document.getElementById('searchInput').addEventListener('input', 
            this.debounce(() => this.performSearch(), 300)
        );

        // Advanced filters
        ['petType', 'petSize', 'location', 'dateRange'].forEach(id => {
            document.getElementById(id).addEventListener('change', () => this.applyAdvancedFilters());
        });
    }

    applyFilter(filter) {
        if (filter === 'all') {
            this.filteredPosts = [...this.posts];
        } else {
            this.filteredPosts = this.posts.filter(post => 
                post.status === filter || post.type === filter
            );
        }
        
        this.currentPage = 1;
        this.renderPosts();
    }

    performSearch() {
        const query = document.getElementById('searchInput').value.toLowerCase();
        
        if (!query) {
            this.filteredPosts = [...this.posts];
        } else {
            this.filteredPosts = this.posts.filter(post =>
                post.name.toLowerCase().includes(query) ||
                post.breed.toLowerCase().includes(query) ||
                post.description.toLowerCase().includes(query) ||
                post.location.toLowerCase().includes(query)
            );
        }
        
        this.currentPage = 1;
        this.renderPosts();
    }

    applyAdvancedFilters() {
        const type = document.getElementById('petType').value;
        const size = document.getElementById('petSize').value;
        const location = document.getElementById('location').value.toLowerCase();
        const date = document.getElementById('dateRange').value;

        this.filteredPosts = this.posts.filter(post => {
            return (!type || post.type === type) &&
                   (!size || post.size === size) &&
                   (!location || post.location.toLowerCase().includes(location)) &&
                   (!date || post.date >= date);
        });

        this.currentPage = 1;
        this.renderPosts();
    }

    toggleView(view) {
        this.currentView = view;
        
        document.querySelectorAll('.view-toggle button').forEach(btn => 
            btn.classList.remove('active')
        );
        document.getElementById(view + 'View').classList.add('active');
        
        this.renderPosts();
    }

    loadMorePosts() {
        this.currentPage++;
        this.renderPosts();
    }

    showPostDetails(post) {
        // Show detailed modal or navigate to detail page
        alert(`Showing details for ${post.name}`);
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Global functions
function showReportModal() {
    const modal = new bootstrap.Modal(document.getElementById('reportModal'));
    modal.show();
}

function scrollToSearch() {
    document.getElementById('search-section').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

function toggleView(view) {
    window.petAlert.toggleView(view);
}

function performSearch() {
    window.petAlert.performSearch();
}

function loadMorePosts() {
    window.petAlert.loadMorePosts();
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    window.petAlert = new PetAlertApp();
});
