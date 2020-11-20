const bookingimg = document.querySelector(".bookingimg");

let random = Math.floor(Math.random() * 5) + 1;
let currentslide = 1;
document.addEventListener("DOMContentLoaded", caraouselslider(random));
console.log({ random });

function caraouselslider(random) {
  currentslide = random;
  bookingimg.src = `/img/mainbg${random}.jpg`;
}
function nextslide() {
  if (currentslide === 5) {
    currentslide = 1;
  } else {
    currentslide++;
  }
  bookingimg.src = `/img/mainbg${currentslide}.jpg`;
}



const caraouselinterval = setInterval(() => {
  nextslide();
}, 5000);
