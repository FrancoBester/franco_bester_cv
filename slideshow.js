document.addEventListener('DOMContentLoaded', function() {
    const slideContainer = document.querySelector('.slide-container');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
  
    // Array to store the image file names
    let imageFiles = [];
  
    // Fetch the images from the 'slideshow' folder
    fetchImagesFromFolder('slideshow', function(images) {
        imageFiles = images;
        console.log("%%")
        console.log(imageFiles.length)
        for(let i = 0; i< imageFiles.length;i++){
            // console.log(imageFiles[i])
            imageFiles[i] = imageFiles[i].substring(15)
            console.log(imageFiles[i])
        }

        showSlide(0); // Display the first slide
  
        // Button click event handlers
        prevButton.addEventListener('click', showPrevSlide);
        nextButton.addEventListener('click', showNextSlide);
    });
  
    // Function to fetch images from a folder
    function fetchImagesFromFolder(folderName, callback) {
      fetch(folderName)
        .then(response => response.text())
        .then(data => {
          const parser = new DOMParser();
          const html = parser.parseFromString(data, 'text/html');
          const links = html.querySelectorAll('a');
          const imageFiles = Array.from(links)
            .map(link => link.getAttribute('href'))
            .filter(href => href.match(/\.(jpe?g|png|gif)$/i)); // Filter image files
  
          callback(imageFiles);
        })
        .catch(error => console.error('Error fetching images:', error));
    }
  
    // Function to display a specific slide
    function showSlide(index) {
      // Clear the slide container
      slideContainer.innerHTML = '';
  
      // Create a new image element and append it to the slide container
      const img = document.createElement('img');
      console.log(imageFiles[index])
    
      img.src = 'slideshow/' + imageFiles[index].substring(1);
      console.log(img.src)
      img.alt = 'Slide ' + (index + 1);
      slideContainer.appendChild(img);
  
      // Show the slide container
      slideContainer.style.display = 'block';
  
      // Disable the previous button if it's the first slide
      prevButton.disabled = index === 0;
  
      // Disable the next button if it's the last slide
      nextButton.disabled = index === imageFiles.length - 1;
    }
  
    // Function to show the previous slide
    function showPrevSlide() {
      const currentIndex = imageFiles.findIndex(file => file === slideContainer.firstChild.src.split('/').pop());
      if (currentIndex > 0) {
        showSlide(currentIndex - 1);
      }
    }
  
    // Function to show the next slide
    function showNextSlide() {
        console.log('####')
        console.log('next')
        // console.log(file)
      const currentIndex = imageFiles.findIndex(file => file === slideContainer.firstChild.src.split('/').pop());

      console.log(currentIndex)
      console.log(imageFiles.length)
      if (currentIndex < imageFiles.length - 1) {
        showSlide(currentIndex + 1);
      }
    }
  });
  