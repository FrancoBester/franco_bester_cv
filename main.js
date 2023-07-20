function isMobileDevice() {
    return /Mobi/i.test(navigator.userAgent);
  }
  
// Example usage
if (isMobileDevice()) {
    const banner = document.getElementById("banner")
    banner.src = "images/banner_32.jpg"
  
    console.log('Mobile device detected');

    const navigationInfo = `<button class="menu-button">Menu</button>
    <div>
        <div class="overlay">
            <div class="menu">
                <ul>
                    <li><a class="navlinks" href="index.html">Home</a></li>
                    <li><a class="navlinks" href="fees.html">Fees</a></li>
                    <li><a class="navlinks" href="patientGuide.html">Patient Guide</a></li>
                    <li><a class="navlinks" href="facilities.html">Facilities&Services</a></li>
                    <li><a class="navlinks" href="index.html">Visiting Hours</a></li>
                    <li><a class="navlinks" href="index.html">Contact Us</a></li>
                    <li><a class="navlinks" href="vacancies.html">Vacancies</a></li>
                    <li><a class="navlinks" href="about.html">About Us</a></li>
                    <li><a class="navlinks" href="rights.html">Patient Rights/Responsibilities</a></li>
                </ul>
            </div>
        </div>
    </div>`
    var navigationElement = document.getElementById('navigationPanel')
    navigationElement.innerHTML = navigationInfo
} else {
    const banner = document.getElementById("banner")
    banner.src = "images/banner.jpg"
    console.log('Not a mobile device');
    const navigationInfo = `<div class="d-flex flex-column">
                                <div class="topnav" id="navigation_bar">
                                    <a class="navlinks" href="index.html">Home</a>
                                    <a class="navlinks" href="fees.html">Fees</a>
                                    <a class="navlinks" href="patientGuide.html">Patient Guide</a>
                                    <a class="navlinks" href="facilities.html">Facilities&Services</a>
                                    <a class="navlinks" href="index.html">Visiting Hours</a>
                                    <a class="navlinks" href="index.html">Contact Us</a>
                                    <a class="navlinks" href="vacancies.html">Vacancies</a>
                                    <a class="navlinks" href="about.html">About Us</a>    
                                    <a class="navlinks" href="rights.html">Patient Rights/Responsibilities</a>          
                                </div>
                            </div>`
    var navigationElement = document.getElementById('navigationPanel')
    navigationElement.innerHTML = navigationInfo
    console.log(navigationElement)
    console.log(navigationElement.innerHTML)
}

document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.menu-button');
    const overlay = document.querySelector('.overlay');
  
    menuButton.addEventListener('click', function() {
      overlay.style.display = 'flex';
    });
  
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        overlay.style.display = 'none';
      }
    });
  });


function showDiv(elementID){
    window.location.href = elementID+'.html'
}

document.addEventListener('DOMContentLoaded', function(){
    var element = document.getElementById('Main')
    element.scrollIntoView({behavior: 'smooth'}) 
})

function showSection(elementID){
    hideSections()
    var element = document.getElementById(elementID)
    element.classList.remove("hideSection")
    element.classList.add("itemFees")
    element.scrollIntoView({behavior: 'smooth'}) 
    var link = document.getElementById(elementID+"Link")
    link.classList.add("linkClick")
    
}

function hideSections(){
    const itemList = ["medGeneral","medCasualties","medICU","medMaternity","nonGeneral","nonCasualties","nonICU","nonMaternity"]
    itemList.forEach(element => {
        var item = document.getElementById(element)
        var link = document.getElementById(element+"Link")
        link.classList.remove("linkClick")
        item.classList.add("hideSection")
    });
}

// Add class on touchstart
document.querySelector('.imageContainer').addEventListener('touchstart', function() {
    this.classList.add('touched');
  });
  
  // Remove class on touchend
  document.querySelector('.imageContainer').addEventListener('touchend', function() {
    this.classList.remove('touched');
  });

document.addEventListener("touchstart", function() {}, true);