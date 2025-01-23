async function loadContent() {
    try {
        const response = await fetch('https://bastlan3.github.io/data/content.json');
        const data = await response.json();
        
        const content = data.content[data.currentNumber];
        document.getElementById('display-text').textContent = content.text;
        document.getElementById('display-image').src = content.image;
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

// Update every 60 seconds
setInterval(loadContent, 60000);
loadContent();
