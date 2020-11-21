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


modeoftransport.addEventListener("click", (e) => {
  console.log(e.target.id)
  if (e.target.id == 'train') {
    ticketbookingh2.textContent = 'TRAIN BOOKING'
    transportmodeinput.value = 'TRAIN'
  }

  else if (e.target.id === 'bus') {
    ticketbookingh2.style.backgroundColor = `#fceef5`;
    ticketbookingh2.textContent = 'BUS BOOKING';
    ticketbookingh2.style.color = '<b></b>lack';
    transportmodeinput.value = 'BUS'
  }
  else {
    ticketbookingh2.style.backgroundColor = `#fceef5`;
    ticketbookingh2.textContent = 'PLANE BOOKING';
    ticketbookingh2.style.color = 'black';
    transportmodeinput.value = 'PLANE'
  }

  modeoftransportvalue.forEach((value) => {
    if (value.textContent === e.target.textContent) {
      value.style.backgroundColor = 'whitesmoke';
      value.style.color = 'black'
    }
    else {
      value.style.backgroundColor = 'black';
      value.style.color = 'white'
    }
  })
})


//checkbox if not checked disable date of return booking
roundtripcheckbox.addEventListener("click", () => {
  if (roundtripcheckbox.checked == true) {
    returndatebooking.disabled = false;
    returndatebooking.required = true;
  } else {
    returndatebooking.disabled = true;
    returndatebooking.required = false;



  }
})
