// document.addEventListener('DOMContentLoaded', function() {
//     const menuButton = document.querySelector('.menu-button');
//     const overlay = document.querySelector('.overlay');
  
//     menuButton.addEventListener('click', function() {
//       overlay.style.display = 'flex';
//     });
  
//     overlay.addEventListener('click', function(e) {
//       if (e.target === overlay) {
//         overlay.style.display = 'none';
//       }
//     });
//   });
  
var element = document.getElementById('myElement');

function handleTouchStart(event) {
  console.log('User started touching the element.');
  element.style.backgroundColor="red"
  // Additional logic can be added here based on your requirements
}

function handleTouchEnd(event) {
  console.log('User stopped touching the element.');
  // Additional logic can be added here based on your requirements
}

element.addEventListener('touchstart', handleTouchStart);
element.addEventListener('touchend', handleTouchEnd);