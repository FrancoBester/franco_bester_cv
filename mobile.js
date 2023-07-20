var list = ["room","valuables","meals","wtb","discharge","feedback"]

function isMobileDevice() {
  return /Mobi/i.test(navigator.userAgent);
}

if (isMobileDevice()) {
  list.forEach(function(element) {
    var touchElement = document.getElementById(element);

    function handleTouchStart(event) {
        try{
            const textOverlayElement = document.querySelector('.textOverlay')

            textOverlayElement.classList.replace("textOverlay","textOverlayMobile");
            textOverlayElement.style.color = 'white';
            textOverlayElement.style.top = '50%';
            throw new Error("")
        }catch(error)
        {

        }
    }

    function handleTouchEnd(event) {
      const textOverlayElement = document.querySelector('.textOverlayMobile')
    }

    touchElement.addEventListener('touchstart', handleTouchStart);
    touchElement.addEventListener('touchend', handleTouchEnd);
  });
}
