const bookingimg = document.querySelector(".bookingimg");
const modeoftransport = document.querySelector(".modeoftransport");
const modeoftransportvalue = document.querySelectorAll(".modeoftransport h4");
const ticketbooking = document.querySelector(".ticketbooking")
const ticketbookingh2 = document.querySelector(".ticketbooking h2")
const ticketdetails = document.querySelector(".ticketdetails");
const roundtripcheckbox = document.querySelector("#roundtripcheckbox")
const returndatebooking = document.querySelector("#returndatebooking");
const transportmodeinput = document.querySelector("#transportmodeinput");

//by default date will be disabled
returndatebooking.disabled = true;


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



const caraouselinterval = setInterval(() => {
  nextslide();
}, 5000);


modeoftransport.addEventListener("click",(e)=>{
    console.log(e.target.textContent)
    if(e.target.textContent === 'TRAIN'){
      ticketbookingh2.style.backgroundColor = `rgb(234, 250, 178)`;
       ticketbookingh2.textContent = 'TRAIN BOOKING'
       transportmodeinput.value = 'TRAIN'
    }
    else if(e.target.textContent === 'BUS'){
      ticketbookingh2.style.backgroundColor = `rgb(250, 178, 178)`;
        ticketbookingh2.textContent = 'BUS BOOKING'
       transportmodeinput.value = 'BUS'

     }
     else{
      ticketbookingh2.style.backgroundColor = `rgb(191, 255, 255)`;
        ticketbookingh2.textContent = 'PLANE BOOKING'
       transportmodeinput.value = 'PLANE'
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


//checkbox if not checked disable date of return booking
roundtripcheckbox.addEventListener("click",()=>{
  if (roundtripcheckbox.checked == true){
    returndatebooking.disabled = false;
    returndatebooking.required = true;
  } else {
    returndatebooking.disabled = true;
    returndatebooking.required = false;



  }
})
