// Get current viewed videos from session storage
let viewedVideos = JSON.parse(sessionStorage.getItem('viewedVideos')) || [];

function trackViewedVideo(videoId, title) {

    // Remove any existing entry for this video
    viewedVideos = viewedVideos.filter(v => v.id !== videoId);

    // Add new entry
    viewedVideos.push({
        id: videoId,
        title: title,
        timestamp: Date.now()
    });

    // Keep only the last 5 viewed videos
    viewedVideos = viewedVideos.sort((a, b) => b.timestamp - a.timestamp).slice(0, 5);

    // Save back to session storage
    sessionStorage.setItem('viewedVideos', JSON.stringify(viewedVideos));

    console.log('Successfully tracked:', {
        videoId,
        currentStorage: JSON.parse(sessionStorage.getItem('viewedVideos'))
    });

}

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

// Add this function to display recently viewed videos
function displayRecentlyViewed() {

    const recentlyViewedSection = document.getElementById('recentlyViewed');
    const viewedList = document.getElementById('viewedList');

    try {
        const viewedVideos = JSON.parse(sessionStorage.getItem('viewedVideos')) || [];

        // Double check elements exist
        if (!recentlyViewedSection) {
            throw new Error('Element #recentlyViewed not found');
        }
        if (!viewedList) {
            throw new Error('Element #viewedList not found');
        }

        recentlyViewedSection.style.display = 'none';

        recentlyViewedSection.style.display = 'block';
        viewedList.innerHTML = '';

        viewedVideos.forEach(video => {
            const viewedItem = document.createElement('div');
            viewedItem.className = 'viewed-item';
            viewedItem.innerHTML = `
                <h3>${video.title}</h3>
                <p>Viewed ${timeSince(new Date(video.timestamp))} ago</p>
            `;
            viewedList.appendChild(viewedItem);
        });
    } catch (error) {
        console.error('Error displaying recently viewed:', error);
        recentlyViewedSection.style.display = 'none';
    }
}

// Helper function to format time
function timeSince(date) {
    const seconds = Math.floor((new Date() - date) / 1000);

    let interval = Math.floor(seconds / 86400);
    if (interval >= 1) return interval + " day" + (interval === 1 ? "" : "s");

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return interval + " hour" + (interval === 1 ? "" : "s");

    interval = Math.floor(seconds / 60);
    if (interval >= 1) return interval + " minute" + (interval === 1 ? "" : "s");

    return Math.floor(seconds) + " second" + (seconds === 1 ? "" : "s");
}

// Check if sessionStorage has any items
if (sessionStorage.length > 0) {
    console.log("Session storage contains data");
} else {
    console.log("Session storage is empty");
}

// Check if 'viewedVideos' exists in session storage
if (sessionStorage.getItem('viewedVideos')) {
    // Data exists - parse and use it
    const viewedVideos = JSON.parse(sessionStorage.getItem('viewedVideos'));
    console.log("Found", viewedVideos.length, "recently viewed videos");
} else {
    // No data found
    console.log("No recently viewed videos found");
}

function checkRecentlyViewed() {
    const recentlyViewedSection = document.getElementById('recentlyViewed');
    const viewedList = document.getElementById('viewedList');

    // Check if we have any viewed videos
    const viewedVideos = sessionStorage.getItem('viewedVideos');

    if (!viewedVideos || JSON.parse(viewedVideos).length === 0) {
        // Show a message when empty
        viewedList.innerHTML = `
            <div class="empty-message">
                <i class="far fa-eye-slash"></i>
                <p>No recently viewed workouts yet</p>
            </div>
        `;
        return;
    }

    // If we have data, display it
    displayRecentlyViewed();
}



document.addEventListener('DOMContentLoaded', function () {

    function displayRecentlyViewed() {

        const recentlyViewedSection = document.getElementById('recentlyViewed');
        const viewedList = document.getElementById('viewedList');

        if (!recentlyViewedSection || !viewedList) {
            console.error('Required elements not found!');
            return; // Exit if elements don't exist
        }

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
            card.addEventListener('click', function (e) {
                // Don't open if clicking on links or buttons
                if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;

                const videoUrl = this.getAttribute('data-video');
                if (!videoUrl) return;

                const videoId = videoUrl.split('/').pop();
                const videoTitle = this.querySelector('.article-title')?.textContent || 'Unknown Workout';

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
                </iframe>`;
                videoContainer.classList.add('active');
                currentOpenVideo = containerId;

                // Smooth scroll to video
                setTimeout(() => {
                    videoContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);

                // Update session storage
                trackViewedVideo(videoId, videoTitle);

                // Immediately update the display
                checkRecentlyViewed();
            });
        });

        // Close video when clicking anywhere outside
        document.addEventListener('click', function (e) {
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
    }

    displayRecentlyViewed();
});


// Immediately check if it saved
console.log('Saved data:', sessionStorage.getItem('viewedVideos'));

try {
    const data = JSON.parse(sessionStorage.getItem('viewedVideos'));
    console.log('Retrieved:', data);
} catch (error) {
    console.error('Error reading sessionStorage:', error);
}

window.addEventListener('storage', (event) => {
    console.log('Storage event:', event);
});

// Save to session storage
function saveToSession() {
    const sampleData = [
        { id: 'abc123', title: 'Sample Workout', timestamp: Date.now() }
    ];
    sessionStorage.setItem('viewedVideos', JSON.stringify(sampleData));
    console.log('Data saved to sessionStorage');
}

// Read from session storage
function readFromSession() {
    const data = sessionStorage.getItem('viewedVideos');
    if (data) {
        console.log('Found data:', JSON.parse(data));
    } else {
        console.log('No data found in sessionStorage');
    }
}

// Test it
saveToSession();
readFromSession();

// View all session storage contents in console
console.log("Session Storage Contents:");
for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    console.log(`${key}:`, sessionStorage.getItem(key));
}