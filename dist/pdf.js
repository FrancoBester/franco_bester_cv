function isMobileDevice() {
    return /Mobi/i.test(navigator.userAgent);
  }
  
// Example usage
if (isMobileDevice()) {
    const pdf1 = document.getElementById('pdf1')
    pdf1.style.scale=0.7
    const pdf2 = document.getElementById('pdf2')
    pdf2.style.scale=0.7
}