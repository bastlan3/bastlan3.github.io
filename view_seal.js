// Firebase configuration
const firebaseConfig = {
    // You'll replace this with your Firebase config
    // We'll add these values in Step 10
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get reference to Firebase storage
const storage = firebase.storage();

document.addEventListener('DOMContentLoaded', function() {
    const imageElement = document.getElementById('generatedImage');
    const loadingElement = document.getElementById('loading');
    
    // Get the image path from session storage
    const imagePath = sessionStorage.getItem('imagePath');
    
    if (!imagePath) {
        alert('No image found. Please generate an image first.');
        window.location.href = 'index.html';
        return;
    }
    
    // Get the image from Firebase Storage
    const imageRef = storage.ref(imagePath);
    
    imageRef.getDownloadURL()
        .then(url => {
            // Set the image source
            imageElement.src = url;
            
            // Hide loading spinner when image loads
            imageElement.onload = function() {
                loadingElement.classList.remove('visible');
            };
        })
        .catch(error => {
            console.error('Error loading image:', error);
            alert('Error loading image: ' + error.message);
            loadingElement.classList.remove('visible');
        });
});
