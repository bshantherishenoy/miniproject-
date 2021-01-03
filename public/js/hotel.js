let url = `http://localhost:3000`;
let bangalorearray, delhiarray, mumbaiarray, hyderabadarray, chennaiarray;
const destination = document.querySelector(".destination");
const duration = document.querySelector(".duration");
const fromdate = document.querySelector(".fromdate")
const todate = document.querySelector(".todate");
let selectedclass;
const mainContainer = document.querySelector(".main-container");
let destinationvalue;
let  bookingid;

fetch(`${url}/hoteldetails`)
  .then((hotel) => {
    return hotel.json()
  })
  .then((hotel1) => {
    console.log(hotel1);
    destinationvalue = hotel1.to;
     bookingid = hotel1.bookingid;

    //get duration between two dates
    let durationvalue = datediff(parseDate(hotel1.departuredate), parseDate(hotel1.returndate));
    console.log(durationvalue);

    //If dauration is zero (same date of booking and returning) make the duration as 1 (minimumu)
    if (durationvalue == 0) {
      durationvalue = 1
    }

    destination.innerHTML = `${hotel1.to}`;
    fromdate.innerHTML = `${hotel1.departuredate}`;
    todate.innerHTML = `${hotel1.returndate}`
    if (durationvalue > 1) {
      duration.innerHTML = `${durationvalue} Days `
    }
    else {
      duration.innerHTML = `${durationvalue} Day `
    }




    fetch("./JSON/hotel.json")
      .then((details) => {
        return details.json()
      })
      .then((data) => {
        console.log(data.hotel[0]);
        bangalorearray = data.hotel[0].bangalore[0];
        delhiarray = data.hotel[0].delhi[0];
        mumbaiarray = data.hotel[0].mumbai[0];
        hyderabadarray = data.hotel[0].hyderabad[0];
        chennaiarray = data.hotel[0].chennai[0];
   

        if (hotel1.to.toLowerCase() == "mumbai") {
          selectedclass = mumbaiarray;
        }
        else if (hotel1.to.toLowerCase() == "banglore") {
          selectedclass = bangalorearray;
        }
        else if (hotel1.to.toLowerCase() == "delhi") {
          selectedclass = delhiarray;
        }
        else if (hotel1.to.toLowerCase() == "hyderabad") {
          selectedclass = hyderabadarray;
        }
        else {
          selectedclass = chennaiarray;
        }
        console.log(selectedclass);

        let selectedhotel


//loop 4 hotels
        for (i = 0; i < 4; i++) {
          let randomtripadvisor = Math.floor(Math.random() * (10 - 5) + 5);
          let randomprice = Math.floor(Math.random()* (50000 - 20000) +  20000)
          let randomincrement = Math.floor(Math.random()* (10000 - 5000) + 5000);
          let div = document.createElement('div');
          if (i == 0) {
            selectedhotel = selectedclass.hotel1[0];
          }
          else if (i == 1) {
            selectedhotel = selectedclass.hotel2[0];
          }
          else if (i == 2) {
            selectedhotel = selectedclass.hotel3[0];
          }
          else {
            selectedhotel = selectedclass.hotel4[0];
          }

          div.innerHTML = ` <div class="row no-gutters hotel">
<div class="col-4 s1">
  <div id="demo${i}" class="carousel slide" data-interval="false" data-ride="carousel" data-pause="hover" >

   <!-- Indicators -->
     <ul class="carousel-indicators">
      <li data-target="#demo${i}" data-slide-to="0" class="active"></li>
       <li data-target="#demo${i}" data-slide-to="1"></li>
       <li data-target="#demo${i}" data-slide-to="2"></li>
       <li data-target="#demo${i}" data-slide-to="3"></li>
     </ul>

  <!-- The slideshow -->
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="${selectedhotel.hotelimages.image1}" class="imh"  alt="Los Angeles">
      </div>
    <div class="carousel-item">
        <img src="${selectedhotel.hotelimages.image2}" class="imh" alt="Chicago">
    </div>
    <div class="carousel-item">
       <img src="${selectedhotel.hotelimages.image3}" class="imh" alt="New York">
    </div>
    <div class="carousel-item">
       <img src="${selectedhotel.hotelimages.image4}" class="imh" alt="New York">
    </div>
    </div>

     <!-- Left and right controls -->
    <a class="carousel-control-prev" href="#demo${i}" data-slide="prev">
      <span class="carousel-control-prev-icon"></span>
    </a>
    <a class="carousel-control-next" href="#demo${i}" data-slide="next">
      <span class="carousel-control-next-icon"></span>
    </a>
  </div>
</div>
<div class="col-3 a1 one-edge-shadow ">
 <h2><strong>${selectedhotel.hoteldetails.name}</strong></h2>
 <p class="pz"><strong><ion-icon name="location-outline"></ion-icon></strong>${selectedhotel.hoteldetails.address}</p>
 <p class="pz"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></p>
  <hr>
  <p><strong>Amenities:</strong></p>
 <ul style="text-align:justify;">
   <li>
     <span title="Restaurants"><i class="fas fa-utensils "></i></span>
     <span title="Free Wifi"><i class="fas fa-wifi "></i></span>
     <span title="Gym"><i class="fas fa-dumbbell"></i></span>
     <span title="Bar"><i class="fas fa-glass-cheers"></i></span>
     <span title="Parking"><i class="fas fa-parking"></i></span>
     <span title="Family"><i class="fas fa-user-friends"></i></span>
     <span title="Stay"><i class="fas fa-bed"></i></span>
   </li>
 </ul>
 <hr>
 <p>${randomtripadvisor}/10 by Trip Advisor.
   Best for booking.

 </p>
</div>
<div class="col-3 b1 one-edge-shadow ">
  <table class="table table-borderless" style="margin:0px;padding-left:10px">
    <thead>
      <tr>
        <th>Rooms Offered</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td  style="padding:0px;"><div class="radio">
          <label><h6><input type="radio" class="radio${i}" name="optradio${i}" checked="checked"> SINGLE</h6></label>
        </div>
        </td>
        <td  style="padding:0px;"><h6><span>${randomprice}</span><i class="fas fa-rupee-sign"></i></h6></td>
      </tr>
      <tr>

        <td class="item" style="padding:0px;"><div class="radio">
          <label><h6><input type="radio" class="radio${i}" name="optradio${i}"> DOUBLE</h6></label>
        </div>
        </td>
          <td  style="padding:0px;"><h6> <span> ${randomprice + randomincrement}</span><i class="fas fa-rupee-sign"></i></h6></td>
        </tr>

        <tr>
          <td  style="padding:0px;"><div class="radio">
            <label><h6><input type="radio" class="radio${i}" name="optradio${i}"> TWIN</h6></label>
          </div>
        </td>
        <td  style="padding:0px;"><h6><span>${randomprice + (randomincrement * 2)}</span><i class="fas fa-rupee-sign"></i></h6></td>
        </tr>
        <tr>
          <td  style="padding:0px;"><div class="radio">
            <label><h6><input type="radio" class="radio${i}" name="optradio${i}">DELUX</h6></label>
          </div></td>
          <td  style="padding:0px;"><h6><span>${randomprice + (randomincrement * 3)}</span><i class="fas fa-rupee-sign"></i></h6></td>
          </tr>
          <tr>
            <td  style="padding:0px;"><div class="radio">
              <label><h6><input type="radio" class="radio${i}" name="optradio${i}"> SUIT</h6></label>
            </div></td>
            <td  style="padding:0px;"><h6><span>${randomprice + (randomincrement * 4)}</span><i class="fas fa-rupee-sign"></i></h6></td>
            </tr>
          </tbody>
        </table>
        </div>
        <div class="col-2 c1 one-edge-shadow">
          <p class="paragraph">* Prices based on per night stay T/C apply</p>
          <hr>
          <br>
          <div class="d-grid  mx-auto button">
             <button class="btn btn-danger btn-lg booknow book${i}" type="submit">Book Now</button>
          </div>
          <br>
          <hr>
        </div>
</div>`

          mainContainer.appendChild(div);
        }



      
      })





  })

let radiobuttons;
let checkedradio;
  mainContainer.addEventListener("click",(e)=>{
    if(e.target.classList.contains("booknow")){
      
      if(e.target.classList.contains("book0")){
radiobuttons = document.querySelectorAll(".radio0")
      }
      else if(e.target.classList.contains("book1")){
        radiobuttons = document.querySelectorAll(".radio1")
      }
      else if(e.target.classList.contains("book2")){
        radiobuttons = document.querySelectorAll(".radio2")
      }
      else{
        radiobuttons = document.querySelectorAll(".radio3")
      }
      console.log(radiobuttons);
      for(let i = 0; i < radiobuttons.length; i++) { 
        if(radiobuttons[i].checked) {
          checkedradio = radiobuttons[i]
        }
     
    } 
    // console.log(checkedradio.parentElement.textContent);
    // console.log(checkedradio.parentElement.parentElement.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent);
//write code from here

// console.log(e.target.parentElement.parentElement.parentElement.children[1].children[0].children[0].textContent);
// console.log(e.target.parentElement.parentElement.parentElement.children[1].children[1].textContent);
let hotelclass = checkedradio.parentElement.textContent;
let hotelprice = checkedradio.parentElement.parentElement.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
let hotelname = e.target.parentElement.parentElement.parentElement.children[1].children[0].children[0].textContent;
let hoteladdress = e.target.parentElement.parentElement.parentElement.children[1].children[1].textContent;

let data = {
  hotelclass,
  hotelprice,
  hotelname,
  hoteladdress,
  destinationvalue,
  bookingid
}
console.log(data);
//send data to server


fetch(`${url}/hotelbooking`, {
  headers: {
      "Content-type": "application/json; charset=UTF-8"
  },
  method: 'POST',

  body: JSON.stringify(data)
})
.then(()=>{
  window.location = `${url}/summary`;
})





    }
  })

//function to create date js  from string value of date
function parseDate(str) {
  var mdy = str.split('-');
  return new Date(mdy[0], mdy[1] - 1, mdy[2]);
}

//function to return the difference from two dates
function datediff(first, second) {
  // Take the difference between the dates and divide by milliseconds per day.
  return Math.round((second - first) / (1000 * 60 * 60 * 24));
}






