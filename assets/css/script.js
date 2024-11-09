'use strict';

/**
 * Navbar toggle
 */
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const menuToggleBtn = document.querySelector("[data-menu-toggle-btn]");

menuToggleBtn.addEventListener("click", function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
});

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
    menuToggleBtn.classList.toggle("active");
  });
}

/**
 * Header sticky & back to top
 */
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

/**
 * Search box toggle
 */
const searchBtn = document.querySelector("[data-search-btn]");
const searchContainer = document.querySelector("[data-search-container]");
const searchSubmitBtn = document.querySelector("[data-search-submit-btn]");
const searchCloseBtn = document.querySelector("[data-search-close-btn]");

const searchBoxElems = [searchBtn, searchSubmitBtn, searchCloseBtn];

for (let i = 0; i < searchBoxElems.length; i++) {
  searchBoxElems[i].addEventListener("click", function () {
    searchContainer.classList.toggle("active");
    document.body.classList.toggle("active");
  });
}

/**
 * Move cycle on scroll
 */
const deliveryBoy = document.querySelector("[data-delivery-boy]");

let deliveryBoyMove = -80;
let lastScrollPos = 0;

window.addEventListener("scroll", function () {
  let deliveryBoyTopPos = deliveryBoy.getBoundingClientRect().top;

  if (deliveryBoyTopPos < 500 && deliveryBoyTopPos > -250) {
    let activeScrollPos = window.scrollY;

    if (lastScrollPos < activeScrollPos) {
      deliveryBoyMove += 1;
    } else {
      deliveryBoyMove -= 1;
    }

    lastScrollPos = activeScrollPos;
    deliveryBoy.style.transform = `translateX(${deliveryBoyMove}px)`;
  }
});

/**
 * Image Upload, Capture and Save functionality
 */

// Select necessary elements
const uploadInput = document.getElementById('uploadImage');
const cameraCanvas = document.getElementById('cameraCanvas');
const captureButton = document.getElementById('captureImage');
const openCameraButton = document.getElementById('openCamera');
const saveButton = document.getElementById('saveImageButton');
const cameraStream = document.getElementById('cameraStream');
const uploadedImagePreview = document.getElementById('uploadedImagePreview');
const droppedImagePreview = document.getElementById('droppedImagePreview');
const cameraImagePreview = document.getElementById('cameraImagePreview');
let capturedImageData = null;

// Handle image upload from file input
uploadInput.addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = new Image();
      img.onload = function() {
        // Draw the image to canvas to prepare it for saving
        cameraCanvas.width = img.width;
        cameraCanvas.height = img.height;
        const ctx = cameraCanvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        capturedImageData = cameraCanvas.toDataURL('image/jpeg'); // Save image as data URI

        // Show image preview
        uploadedImagePreview.src = e.target.result;
        uploadedImagePreview.classList.remove('hidden');
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// Handle drag and drop image
const dropZone = document.getElementById('dropZone');
dropZone.addEventListener('dragover', function(e) {
  e.preventDefault();
});
dropZone.addEventListener('drop', function(e) {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image')) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = new Image();
      img.onload = function() {
        // Draw the image to canvas to prepare it for saving
        cameraCanvas.width = img.width;
        cameraCanvas.height = img.height;
        const ctx = cameraCanvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        capturedImageData = cameraCanvas.toDataURL('image/jpeg'); // Save image as data URI

        // Show image preview
        droppedImagePreview.src = e.target.result;
        droppedImagePreview.classList.remove('hidden');
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    alert('Please drop a valid image file.');
  }
});

// Open the camera feed when the button is clicked
openCameraButton.addEventListener('click', async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    cameraStream.srcObject = stream;
    captureButton.classList.remove('hidden'); // Show the capture button

    captureButton.addEventListener('click', () => {
      cameraCanvas.width = cameraStream.videoWidth;
      cameraCanvas.height = cameraStream.videoHeight;
      const context = cameraCanvas.getContext('2d');
      context.drawImage(cameraStream, 0, 0);
      capturedImageData = cameraCanvas.toDataURL('image/jpeg'); // Save image as data URI

      // Show image preview
      cameraImagePreview.src = capturedImageData;
      cameraImagePreview.classList.remove('hidden');

      // Stop the camera
      stream.getTracks().forEach(track => track.stop());
      cameraStream.srcObject = null; // Clear the camera stream
    });
  } catch (error) {
    console.error("Camera access error:", error);
  }
});

// Save the image as "one.jpg" when the "Upload" button is clicked
saveButton.addEventListener('click', () => {
  if (capturedImageData) {
    console.log('Sending image data to server...');

    // Send image data to the server
    fetch('http://localhost:4000/save-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ imageData: capturedImageData })
    })
    .then(response => {
      console.log('Received response from server:', response);
      return response.json();
    })
    .then(data => {
      if (data.success) {
        console.log('Image saved successfully');
        alert('Image saved successfully');
        
        // Display the last index from the output.json file
        if (data.lastIndex) {
          console.log('Last index from output.json:', data.lastIndex);
          document.getElementById('output').innerHTML = JSON.stringify(data.lastIndex, null, 2);
          document.getElementById('outputSection').classList.remove('hidden');  // Show the output section
        }
      } else {
        console.error('Server responded with an error:', data.message);
      }
    })
    .catch(error => {
      console.error('Error communicating with the server:', error);
      alert('Failed to communicate with the server');
    });
  } else {
    alert('No image to save!');
  }
});