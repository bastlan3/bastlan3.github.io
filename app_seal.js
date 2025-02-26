// Firebase configuration
const firebaseConfig = {
    // You'll replace this with your Firebase config
    // We'll add these values in Step 10
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get references to Firebase services
const functions = firebase.functions();
const storage = firebase.storage();

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('sealForm');
    const loadingElement = document.getElementById('loading');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const sealNumber = document.getElementById('sealNumber').value;
        if (!sealNumber) {
            alert('Please enter a seal number');
            return;
        }
        
        // Show loading spinner
        loadingElement.classList.remove('hidden');
        form.classList.add('hidden');
        
        try {
            // Call the Firebase function
            const generateImage = functions.httpsCallable('generateImage');
            const result = await generateImage({ sealNumber: parseInt(sealNumber) });
            
            // Get the image path from the result
            const imagePath = result.data.imagePath;
            
            // Store the image path in session storage for the next page
            sessionStorage.setItem('imagePath', imagePath);
            
            // Redirect to the view image page
            window.location.href = 'view-image.html';
        } catch (error) {
            console.error('Error generating image:', error);
            alert('Error generating image: ' + error.message);
            
            // Hide loading spinner and show form again
            loadingElement.classList.add('hidden');
            form.classList.remove('hidden');
        }
    });
});
