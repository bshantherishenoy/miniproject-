const bookingimg = document.querySelector(".bookingimg");
const sliderleft = document.querySelector(".slider-left");
const sliderright = document.querySelector(".slider-right");
const slider = document.querySelector(".caraouselslider");
const modeoftransport = document.querySelector(".modeoftransport");
const modeoftransportvalue = document.querySelectorAll(".modeoftransport h4");
const ticketbooking = document.querySelector(".ticketbooking")
const ticketbookingh2 = document.querySelector(".ticketbooking h2")
const ticketdetails = document.querySelector(".ticketdetails");


// caraousel
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

function previousslide() {
  if (currentslide === 1) {
    currentslide = 5;
  } else {
    currentslide--;
  }
  bookingimg.src = `/img/mainbg${currentslide}.jpg`;
}

const caraouselinterval = setInterval(() => {
  nextslide();
}, 5000);

slider.addEventListener("click", (e) => {
  clearInterval(caraouselinterval);
  if (e.target.classList.contains("slider-left")) {
    previousslide();
  } else {
    nextslide();
  }
});

modeoftransport.addEventListener("click",(e)=>{
    console.log(e.target.textContent)
    if(e.target.textContent === 'TRAIN'){
      ticketbookingh2.style.backgroundColor = `rgb(234, 250, 178)`;
       ticketbookingh2.textContent = 'TRAIN BOOKING'
    }
    else if(e.target.textContent === 'BUS'){
      ticketbookingh2.style.backgroundColor = `rgb(250, 178, 178)`;
        ticketbookingh2.textContent = 'BUS BOOKING'
     }
     else{
      ticketbookingh2.style.backgroundColor = `rgb(191, 255, 255)`;
        ticketbookingh2.textContent = 'PLANE BOOKING'
     }
  
modeoftransportvalue.forEach((value)=>{
    if(value.textContent === e.target.textContent){
        value.style.backgroundColor = 'whitesmoke';
        value.style.color = 'black'
    }
    else{
        value.style.backgroundColor = 'black';
        value.style.color = 'white'
    }
})
})
// date
// Initialize all input of date type.
const calendars = bulmaCalendar.attach('[type="date"]', options);

// Loop on each calendar initialized
calendars.forEach(calendar => {
	// Add listener to date:selected event
	calendar.on('date:selected', date => {
		console.log(date);
	});
});

// To access to bulmaCalendar instance of an element
const element = document.querySelector('#my-element');
if (element) {
	// bulmaCalendar instance is available as element.bulmaCalendar
	element.bulmaCalendar.on('select', datepicker => {
		console.log(datepicker.data.value());
	});
}
