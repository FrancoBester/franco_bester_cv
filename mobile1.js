var list = ["generalWard","theatre","casualty","icu","maternity","cafe","ar","local"]

function isMobileDevice() {
  return /Mobi/i.test(navigator.userAgent);
}

if (isMobileDevice()) {
  list.forEach(function(element) {
    var touchElement = document.getElementById(element);

    function handleTouchStart(event) {
        try{
            var image = document.querySelector('.imageContainer img');
            image.style.opacity = '0.5';
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
