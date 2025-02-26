// Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyCeevx3F38lmkPUBU-tqcNG44O3jbvkoGo",

  authDomain: "sealday-37c48.firebaseapp.com",

  databaseURL: "https://sealday-37c48-default-rtdb.firebaseio.com",

  projectId: "sealday-37c48",

  storageBucket: "sealday-37c48.firebasestorage.app",

  messagingSenderId: "662454805975",

  appId: "1:662454805975:web:65b7f55d1364f9e7f09792",

  measurementId: "G-4506BQFMW8"

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
