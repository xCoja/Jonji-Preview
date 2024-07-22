// main.js
function countdown() {
    // Set the date we're counting down to
    var countDownDate = new Date("Jul 27, 2024 23:12:00").getTime();

    // Update the count down every 1 second
    var x = setInterval(function() {
        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the elements with respective IDs
        document.getElementById("days").innerHTML = days;
        document.getElementById("hours").innerHTML = hours;
        document.getElementById("minutes").innerHTML = minutes;
        document.getElementById("seconds").innerHTML = seconds;

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("days").innerHTML = "0";
            document.getElementById("hours").innerHTML = "0";
            document.getElementById("minutes").innerHTML = "0";
            document.getElementById("seconds").innerHTML = "0";
        }
    }, 1000);
}

function createBubbles() {
    const bubblesContainer = document.querySelector('.bubbles-container');
    const bubbleCount = 100;

    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = Math.random() * 3 + 3;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.animationDelay = `${Math.random() * 15}s`;
        bubble.style.background = `rgb(245, 191, 76, ${Math.random() * 0.5 + 0.2})`;

        bubblesContainer.appendChild(bubble);
    }
}

const YOUTUBE_RSS_FEED = 'https://www.youtube.com/feeds/videos.xml?channel_id=UCxElbn4HsMP9hYoM_dYjX2g'; // Your friend's YouTube channel ID
const RSS2JSON_API_URL = 'https://api.rss2json.com/v1/api.json?rss_url=';

async function fetchYouTubeVideos() {
    const response = await fetch(`${RSS2JSON_API_URL}${encodeURIComponent(YOUTUBE_RSS_FEED)}`);
    const data = await response.json();
    displayYouTubeVideos(data.items.slice(0, 5));
}

function displayYouTubeVideos(videos) {
    const youtubeVideosContainer = document.getElementById('youtube-videos');
    youtubeVideosContainer.innerHTML = '';

    videos.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.className = 'youtube-video-card';
        videoCard.innerHTML = `
            <a href="${video.link}" target="_blank">
                <img src="${video.thumbnail.replace('hqdefault', 'maxresdefault')}" alt="${video.title}" class="youtube-video-thumbnail">
                <div class="youtube-video-title">${video.title}</div>
            </a>
        `;
        youtubeVideosContainer.appendChild(videoCard);
    });
}

// Combined window.onload function
window.onload = function() {
    countdown();
    fetchYouTubeVideos();

    const participateButton = document.querySelector('.how-to-participate');
    const popupOverlay = document.getElementById('popup-overlay');
    const popupClose = document.getElementById('popup-close');

    participateButton.addEventListener('click', (event) => {
        event.stopPropagation();
        popupOverlay.style.display = 'flex';
    });

    popupClose.addEventListener('click', (event) => {
        event.stopPropagation();
        popupOverlay.style.display = 'none';
    });

    popupOverlay.addEventListener('click', (event) => {
        if (event.target === popupOverlay) {
            popupOverlay.style.display = 'none';
        }
    });

    createBubbles();
};
