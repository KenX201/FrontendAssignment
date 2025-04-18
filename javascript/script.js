// Dark mode toggle functionality
const themeToggle = document.getElementById('themeToggle');
const icon = themeToggle.querySelector('i');

// Check for saved user preference or use system preference
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.body.classList.add('dark-mode');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Store user preferences in localStorage
function storeUserPreferences() {
    // You can add more preferences to store here
    const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
}

// Load user preferences when page loads
window.addEventListener('load', () => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
});

document.addEventListener('DOMContentLoaded', function() {

    // Video handling functionality
    const articleCards = document.querySelectorAll('.article-card');
    let currentOpenVideo = null;

    articleCards.forEach((card, index) => {
        // Add play icon to each article card
        const imageContainer = card.querySelector('.article-image');
        const playIcon = document.createElement('i');
        playIcon.className = 'fas fa-play play-icon';
        imageContainer.appendChild(playIcon);

        // Handle click on article card
        card.addEventListener('click', function(e) {
            // Don't open if clicking on links or buttons
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;
            
            const videoUrl = this.getAttribute('data-video');
            if (!videoUrl) return;

            const containerId = `videoContainer${index + 1}`;
            const videoContainer = document.getElementById(containerId);

            // If this video is already open, close it
            if (currentOpenVideo === containerId) {
                videoContainer.classList.remove('active');
                videoContainer.innerHTML = '';
                currentOpenVideo = null;
                return;
            }

            // Close any other open videos
            document.querySelectorAll('.video-container').forEach(container => {
                if (container.id !== containerId) {
                    container.classList.remove('active');
                    container.innerHTML = '';
                }
            });

            // Open this video
            videoContainer.innerHTML = `
                <iframe src="${videoUrl}?autoplay=1" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                </iframe>
            `;
            videoContainer.classList.add('active');
            currentOpenVideo = containerId;

            // Smooth scroll to video
            setTimeout(() => {
                videoContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        });
    });

    // Close video when clicking anywhere outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.article-card') && 
            !e.target.closest('.video-container') && 
            currentOpenVideo) {
            const videoContainer = document.getElementById(currentOpenVideo);
            if (videoContainer) {
                videoContainer.classList.remove('active');
                videoContainer.innerHTML = '';
                currentOpenVideo = null;
            }
        }
    });
});document.addEventListener('DOMContentLoaded', function() {

    // Video handling functionality
    const articleCards = document.querySelectorAll('.article-card');
    let currentOpenVideo = null;

    articleCards.forEach((card, index) => {
        // Add play icon to each article card
        const imageContainer = card.querySelector('.article-image');
        const playIcon = document.createElement('i');
        playIcon.className = 'fas fa-play play-icon';
        imageContainer.appendChild(playIcon);

        // Handle click on article card
        card.addEventListener('click', function(e) {
            // Don't open if clicking on links or buttons
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;
            
            const videoUrl = this.getAttribute('data-video');
            if (!videoUrl) return;

            const containerId = `videoContainer${index + 1}`;
            const videoContainer = document.getElementById(containerId);

            // If this video is already open, close it
            if (currentOpenVideo === containerId) {
                videoContainer.classList.remove('active');
                videoContainer.innerHTML = '';
                currentOpenVideo = null;
                return;
            }

            // Close any other open videos
            document.querySelectorAll('.video-container').forEach(container => {
                if (container.id !== containerId) {
                    container.classList.remove('active');
                    container.innerHTML = '';
                }
            });

            // Open this video
            videoContainer.innerHTML = `
                <iframe src="${videoUrl}?autoplay=1" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                </iframe>
            `;
            videoContainer.classList.add('active');
            currentOpenVideo = containerId;

            // Smooth scroll to video
            setTimeout(() => {
                videoContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        });
    });

    // Close video when clicking anywhere outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.article-card') && 
            !e.target.closest('.video-container') && 
            currentOpenVideo) {
            const videoContainer = document.getElementById(currentOpenVideo);
            if (videoContainer) {
                videoContainer.classList.remove('active');
                videoContainer.innerHTML = '';
                currentOpenVideo = null;
            }
        }
    });
});