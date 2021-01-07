


const maincontainer = document.querySelector(".maincontainer");
let url = `http://localhost:3000`;
let busbookings, trainbookings, flightbookings, hotelbookings, userdata, returnid = [], alluserdata, currentbookingid, currenthotel, currentuser;
var notyf = new Notyf();
//function for client side uuid

function create_UUID() {

  let randomNumber1 = Math.floor(Math.random() * 10);
  let randomNumber2 = Math.floor(Math.random() * 10);
  let randomNumber3 = Math.floor(Math.random() * 10);
  let randomNumber4 = Math.floor(Math.random() * 10);
  let randomNumber5 = Math.floor(Math.random() * 10);
  let randomNumber6 = Math.floor(Math.random() * 10);
  let randomNumber7 = Math.floor(Math.random() * 10);
  let randomstring = `${randomNumber1}${randomNumber2}${randomNumber3}${randomNumber4}${randomNumber5}${randomNumber6}${randomNumber7}`
  return randomstring
}

fetch(`${url}/mybookingstatus`)
  .then((data) => {
    console.log(data);
    return data.json()
  })
  .then((data2) => {
    console.log(data2);
    busbookings = data2.busbookings;
    trainbookings = data2.trainbookings;
    flightbookings = data2.flightbookings;
    hotelbookings = data2.hotelbookings;
    userdata = data2.returnbookings;
    alluserdata = data2.alluserdata;

    console.log(busbookings.length);
    if(busbookings.length == 0 && trainbookings.length == 0 && flightbookings.length == 0){
      console.log("hereeeeeeeee");
      maincontainer.innerHTML = `<div style="display:flex; justify-content:center; align-items:center"><h2>NO BOOKINGS TO SHOW :(</h2>
   
        
        </div>`

    }
    // if (userdata.length != null) {
    //   userdata.forEach(element => {
    //     returnid.push(element.bookingid);
    //   });
    //   console.log(returnid);
    // }
    if (busbookings.length != null) {
      for (let i = 0; i < busbookings.length; i++) {
        console.log(i);
        if (busbookings[i + 1] != undefined && busbookings[i + 1].bookingid == busbookings[i].bookingid) {
          //render round trip
          //get hotel details
          for (let j = 0; j < hotelbookings.length; j++) {
            console.log(busbookings[i].bookingid);
            if (hotelbookings[j].bookingid == busbookings[i].bookingid) {
              console.log(hotelbookings[j]);
              currenthotel = hotelbookings[j];
              break;
            }
          }
          console.log(alluserdata);
          //get usertravel details
          for (let k = 0; k < alluserdata.length; k++) {
            if (alluserdata[k].bookingid == busbookings[i].bookingid) {
              currentuser = alluserdata[k];
              break;
            }

          }
          console.log(busbookings[i], currenthotel, currentuser);
          let uniqueid = create_UUID();
          //here make a div and append it
          let div = document.createElement('div');
          div.innerHTML = `
          <div class="book1">
       
          <div class="container-fluid">
            <div class="row nogutters">
              <div class="col-4">
                <div class="transport-booking">
                <h4 >Mode of transport: <span><strong> Bus</strong></span></h4>
                <span>Details:</span>
                <table class="table table-borderless">
                <tbody>
                  <tr>
                    <td scope="row">Name</td>
                    <td><strong>${busbookings[i].busname}</strong></td>
                    <td>Class</td>
                    <td><strong>${busbookings[i].class}</strong></td>
                  </tr>
                  <tr>
                    <td scope="row">From Time</td>
                    <td><strong>1${busbookings[i].fromtime}</strong></td>
                    <td>To Time</td>
                    <td><strong>${busbookings[i].totime}</strong></td>
                  </tr>
                  <tr>
                  <td scope="row">From</td>
                  <td><strong>${currentuser.from}</strong></td>
                  <td>To</td>
                  <td><strong>${currentuser.to}</strong></td>
                  </tr>
                  <tr>
                  <td scope="row">Adults</td>
                  <td><strong>${currentuser.adult}</strong></td>
                  <td>Children</td>
                  <td><strong>${currentuser.children}</strong></td>
                  </tr>
                  <tr>
                  <td scope="row">Date</td>
                  <td><strong>${currentuser.departuredate}</strong></td>
                  <td>Price</td>
                  <td class="Price" style="padding-left: 0px;
                  padding-bottom: 0px;"><strong>${busbookings[i].price}<i class="fas fa-rupee-sign"></i></strong></td>
                
               
                  </tbody>
                </table>
        
                </div>
              </div>
              <!-- ends -->
              <div class="col-4">
                <div class="hotel-booking">
                  <h4> <span>Name:</span><strong> ${currenthotel.hotelname}</strong></h4>
                  <span>Details:</span>
                  <p><strong>Location: </strong>${currenthotel.hoteladdress}</p>
                  <table class="table table-borderless">
                  <tbody>
                    <tr>
                      <td scope="row">From</td>
                      <td><strong>${currentuser.departuredate}</strong></td>
                   
                    </tr>
                    <tr>
                      <td scope="row">Room-type</td>
                      <td><strong>${currenthotel.hotelclass}</strong></td>
                    </tr>
                    <tr>
                    <td scope="row">Adults</td>
                    <td><strong>${currentuser.adult}</strong></td>
                    <td>Children</td>
                    <td><strong>${currentuser.children}</strong></td>
                    </tr>
                    <tr>
                   
                    <td>Price</td>
                    <td class="Price" style="padding-left: 0px;
                    padding-bottom: 0px;"><strong>${currenthotel.hotelprice}<i class="fas fa-rupee-sign"></i></strong></td>
                    </tr>
                    </tbody>
                  </table>
        
                </div>
              </div>
              <div class="col-4">
                <div class="hoteldiv">
                <div class="hotel-hide">
                 <h3 class="p1"> PAYMENT</h3>
                
                  <table class="table table-borderless">
                    <tbody>
                      <tr>
                        <td style="padding-bottom:0px"scope="row">AMOUNT PAID</td>
                        <td style="padding-bottom:0px" class="pay"><strong>HOTEL</strong></td>
                        <td style="padding-bottom:0px"  class="pay"><strong>${currenthotel.hotelprice}</strong></td>
                      </tr>
                      <tr>
                        <td scope="row"></td>
                        <td style="padding-bottom:0px"><strong>TRANSPORT</strong></td>
                        <td style="padding-bottom:0px"><strong>${Number(busbookings[i].price)}</strong></td>
                      </tr>
                      <tr>
                      <td scope="row"></td>
                      <td style="padding-bottom:0px"><strong>TRANSPORT (Returnbooking)</strong></td>
                      <td style="padding-bottom:0px"><strong>${Number(busbookings[i + 1].price)}</strong></td>
                    </tr>
                    </tbody>
                  </table>
                   <table class="table">
                     <tr>
                       <td  scope="row"></td>
                       <td ><strong> GRAND TOTAL</strong></td>
                       <td class="Price " style="text-align:right"><strong>${Number(currenthotel.hotelprice) + Number(busbookings[i].price) + Number(busbookings[i + 1].price)}<i class="fas fa-rupee-sign"></i></strong></td>
                     </tr>
                   </table>
                   <table class="table">
                     <tr>
                       <td scope="row">Payment Method</td>
                       <td><strong>CARD</strong></td>
                       <td>Type</td>
                       <td><strong>VISA</strong></td>
                     </tr>
                     <tr>
                       <td scope="row">Card NO</td>
                       <td ><strong>4193 4279 4176 XXXX</strong></td>
                       <td >Exp</td>
                       <td ><strong>11/28</strong></td>
                     </tr>
         
                   </table>
         
            
            <!--  -->
                </div>
              </div>
        
            </div>
        
          </div>
          <hr>
          <div class="text-center">
            <input class="btn btn-success" type="submit" value="Payment Successful">
            <!-- Button trigger modal -->
          <button type="button" class="btn btn-danger cancelbooking" data-bs-toggle="modal" data-bs-target="#a${uniqueid}">
            Cancel Booking
          </button>
        
          <!-- Modal -->
          <div class="modal fade" id="a${uniqueid}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel"><strong>Are you sure??..you want to cancel?</strong></h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  Only 75% of the amount will be refunded.
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-danger ${currentuser.bookingid} destroy">Continue</button>
                </div>
              </div>
            </div>
          </div>
          </div>
          <hr>
          <hr>
          </div>
      `


          maincontainer.appendChild(div);
          i = i + 1;
        }
        else {
          let uniqueid = create_UUID();
          //single way booking
          let div = document.createElement('div');

          //get user travel details
          for (let k = 0; k < alluserdata.length; k++) {
            if (alluserdata[k].bookingid == busbookings[i].bookingid) {
              currentuser = alluserdata[k];
              break;
            }

          }
          div.innerHTML = `
          <div class="book1">
       
          <div class="container-fluid">
            <div class="row nogutters">
              <div class="col-4">
                <div class="transport-booking">
                <h4 >Mode of transport: <span><strong> Bus</strong></span></h4>
                <span>Details:</span>
                <table class="table table-borderless">
                <tbody>
                  <tr>
                    <td scope="row">Name</td>
                    <td><strong>${busbookings[i].busname}</strong></td>
                    <td>Class</td>
                    <td><strong>${busbookings[i].class}</strong></td>
                  </tr>
                  <tr>
                    <td scope="row">From Time</td>
                    <td><strong>1${busbookings[i].fromtime}</strong></td>
                    <td>To Time</td>
                    <td><strong>${busbookings[i].totime}</strong></td>
                  </tr>
                  <tr>
                  <td scope="row">From</td>
                  <td><strong>${currentuser.from}</strong></td>
                  <td>To</td>
                  <td><strong>${currentuser.to}</strong></td>
                  </tr>
                  <tr>
                  <td scope="row">Adults</td>
                  <td><strong>${currentuser.adult}</strong></td>
                  <td>Children</td>
                  <td><strong>${currentuser.children}</strong></td>
                  </tr>
                  <tr>
                  <td scope="row">Date</td>
                  <td><strong>${currentuser.departuredate}</strong></td>
                  <td>Price</td>
                  <td class="Price" style="padding-left: 0px;
                  padding-bottom: 0px;"><strong>${busbookings[i].price}<i class="fas fa-rupee-sign"></i></strong></td>
                
               
                  </tbody>
                </table>
        
                </div>
              </div>
              <!-- ends -->
              <div class="col-4" style="visibility:hidden;">
                <div class="hotel-booking">
                  <h4> <span>Name:</span><strong></strong></h4>
                  <span>Details:</span>
                  <p><strong>Location: </strong></p>
                  <table class="table table-borderless">
                  <tbody>
                    <tr>
                      <td scope="row">From</td>
                      <td><strong></strong></td>
                   
                    </tr>
                    <tr>
                      <td scope="row">Room-type</td>
                      <td><strong></strong></td>
                    </tr>
                    <tr>
                    <td scope="row">Adults</td>
                    <td><strong></strong></td>
                    <td>Children</td>
                    <td><strong></strong></td>
                    </tr>
                    <tr>
                   
                    <td>Price</td>
                    <td class="Price" style="padding-left: 0px;
                    padding-bottom: 0px;"><strong><i class="fas fa-rupee-sign"></i></strong></td>
                    </tr>
                    </tbody>
                  </table>
        
                </div>
              </div>
              <div class="col-4">
                <div class="hoteldiv">
                <div class="hotel-hide">
                 <h3 class="p1"> PAYMENT</h3>
                
                  <table class="table table-borderless">
                    <tbody>
                      <tr>
                        <td style="padding-bottom:0px"scope="row">AMOUNT PAID</td>
                      </tr>
                      <tr>
                        <td scope="row"></td>
                        <td style="padding-bottom:0px"><strong>TRANSPORT</strong></td>
                        <td style="padding-bottom:0px"><strong>${Number(busbookings[i].price)}</strong></td>
                      </tr>
                    </tbody>
                  </table>
                   <table class="table">
                     <tr>
                       <td  scope="row"></td>
                       <td ><strong> GRAND TOTAL</strong></td>
                       <td class="Price " style="text-align:right"><strong>${Number(busbookings[i].price)}<i class="fas fa-rupee-sign"></i></strong></td>
                     </tr>
                   </table>
                   <table class="table">
                     <tr>
                       <td scope="row">Payment Method</td>
                       <td><strong>CARD</strong></td>
                       <td>Type</td>
                       <td><strong>VISA</strong></td>
                     </tr>
                     <tr>
                       <td scope="row">Card NO</td>
                       <td ><strong>4193 4279 4176 XXXX</strong></td>
                       <td >Exp</td>
                       <td ><strong>11/28</strong></td>
                     </tr>
         
                   </table>
         
            
            <!--  -->
                </div>
              </div>
        
            </div>
        
          </div>
          <hr>
          <div class="text-center">
            <input class="btn btn-success" type="submit" value="Payment Successful">
            <!-- Button trigger modal -->
          <button type="button" class="btn btn-danger cancelbooking" data-bs-toggle="modal" data-bs-target="#a${uniqueid}">
            Cancel Booking
          </button>
        
          <!-- Modal -->
          <div class="modal fade" id="a${uniqueid}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel"><strong>Are you sure??..you want to cancel?</strong></h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  Only 75% of the amount will be refunded.
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-danger ${currentuser.bookingid} destroy">Continue</button>
                </div>
              </div>
            </div>
          </div>
          </div>
          <hr>
          <hr>
          </div>
      `

          maincontainer.appendChild(div);
        }

      }
    }


    //flight bookings display
    if (flightbookings.length != null) {
      for (let i = 0; i < flightbookings.length; i++) {
        console.log(i);
        if (flightbookings[i + 1] != undefined && flightbookings[i + 1].bookingid == flightbookings[i].bookingid) {
          //render round trip
          //get hotel details
          for (let j = 0; j < hotelbookings.length; j++) {
            console.log(flightbookings[i].bookingid);
            if (hotelbookings[j].bookingid == flightbookings[i].bookingid) {
              console.log(hotelbookings[j]);
              currenthotel = hotelbookings[j];
              break;
            }
          }
          console.log(alluserdata);
          //get usertravel details
          for (let k = 0; k < alluserdata.length; k++) {
            if (alluserdata[k].bookingid == flightbookings[i].bookingid) {
              currentuser = alluserdata[k];
              break;
            }

          }
          console.log(flightbookings[i], currenthotel, currentuser);
          let uniqueid = create_UUID();

          //here make a div and append it
          let div = document.createElement('div');
          div.innerHTML = `
      <div class="book1">
   
      <div class="container-fluid">
        <div class="row nogutters">
          <div class="col-4">
            <div class="transport-booking">
            <h4 >Mode of transport: <span><strong> FLIGHT</strong></span></h4>
            <span>Details:</span>
            <table class="table table-borderless">
            <tbody>
              <tr>
                <td scope="row">Name</td>
                <td><strong>${flightbookings[i].flightname}</strong></td>
                <td>Flight ID</td>
                <td><strong>${flightbookings[i].flightid}</strong></td>
              </tr>
              <tr>
                <td scope="row">From Time</td>
                <td><strong>1${flightbookings[i].fromtime}</strong></td>
                <td>To Time</td>
                <td><strong>${flightbookings[i].totime}</strong></td>
              </tr>
              <tr>
              <td scope="row">From</td>
              <td><strong>${currentuser.from}</strong></td>
              <td>To</td>
              <td><strong>${currentuser.to}</strong></td>
              </tr>
              <tr>
              <td scope="row">Adults</td>
              <td><strong>${currentuser.adult}</strong></td>
              <td>Children</td>
              <td><strong>${currentuser.children}</strong></td>
              </tr>
              <tr>
              <td scope="row">Date</td>
              <td><strong>${currentuser.departuredate}</strong></td>
              <td>Price</td>
              <td class="Price" style="padding-left: 0px;
              padding-bottom: 0px;"><strong>${flightbookings[i].price}<i class="fas fa-rupee-sign"></i></strong></td>
            
           
              </tbody>
            </table>
    
            </div>
          </div>
          <!-- ends -->
          <div class="col-4">
            <div class="hotel-booking">
              <h4> <span>Name:</span><strong> ${currenthotel.hotelname}</strong></h4>
              <span>Details:</span>
              <p><strong>Location: </strong>${currenthotel.hoteladdress}</p>
              <table class="table table-borderless">
              <tbody>
                <tr>
                  <td scope="row">From</td>
                  <td><strong>${currentuser.departuredate}</strong></td>
               
                </tr>
                <tr>
                  <td scope="row">Room-type</td>
                  <td><strong>${currenthotel.hotelclass}</strong></td>
                </tr>
                <tr>
                <td scope="row">Adults</td>
                <td><strong>${currentuser.adult}</strong></td>
                <td>Children</td>
                <td><strong>${currentuser.children}</strong></td>
                </tr>
                <tr>
               
                <td>Price</td>
                <td class="Price" style="padding-left: 0px;
                padding-bottom: 0px;"><strong>${currenthotel.hotelprice}<i class="fas fa-rupee-sign"></i></strong></td>
                </tr>
                </tbody>
              </table>
    
            </div>
          </div>
          <div class="col-4">
            <div class="hoteldiv">
            <div class="hotel-hide">
             <h3 class="p1"> PAYMENT</h3>
            
              <table class="table table-borderless">
                <tbody>
                  <tr>
                    <td style="padding-bottom:0px"scope="row">AMOUNT PAID</td>
                    <td style="padding-bottom:0px" class="pay"><strong>HOTEL</strong></td>
                    <td style="padding-bottom:0px"  class="pay"><strong>${currenthotel.hotelprice}</strong></td>
                  </tr>
                  <tr>
                    <td scope="row"></td>
                    <td style="padding-bottom:0px"><strong>TRANSPORT</strong></td>
                    <td style="padding-bottom:0px"><strong>${Number(flightbookings[i].price)}</strong></td>
                  </tr>
                  <tr>
                  <td scope="row"></td>
                  <td style="padding-bottom:0px"><strong>TRANSPORT (Returnbooking)</strong></td>
                  <td style="padding-bottom:0px"><strong>${Number(flightbookings[i + 1].price)}</strong></td>
                </tr>
                </tbody>
              </table>
               <table class="table">
                 <tr>
                   <td  scope="row"></td>
                   <td ><strong> GRAND TOTAL</strong></td>
                   <td class="Price " style="text-align:right"><strong>${Number(currenthotel.hotelprice) + Number(flightbookings[i].price) + Number(flightbookings[i + 1].price)}<i class="fas fa-rupee-sign"></i></strong></td>
                 </tr>
               </table>
               <table class="table">
                 <tr>
                   <td scope="row">Payment Method</td>
                   <td><strong>CARD</strong></td>
                   <td>Type</td>
                   <td><strong>VISA</strong></td>
                 </tr>
                 <tr>
                   <td scope="row">Card NO</td>
                   <td ><strong>4193 4279 4176 XXXX</strong></td>
                   <td >Exp</td>
                   <td ><strong>11/28</strong></td>
                 </tr>
     
               </table>
     
        
        <!--  -->
            </div>
          </div>
    
        </div>
    
      </div>
      <hr>
      <div class="text-center">
        <input class="btn btn-success" type="submit" value="Payment Successful">
        <!-- Button trigger modal -->
      <button type="button" class="btn btn-danger cancelbooking" data-bs-toggle="modal" data-bs-target="#a${uniqueid}">
        Cancel Booking
      </button>
    
      <!-- Modal -->
      <div class="modal fade" id="a${uniqueid}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel"><strong>Are you sure??..you want to cancel?</strong></h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Only 75% of the amount will be refunded.
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-danger ${currentuser.bookingid} destroy">Continue</button>
            </div>
          </div>
        </div>
      </div>
      </div>
      <hr>
      <hr>
      </div>
  `


          maincontainer.appendChild(div);
          i = i + 1;
        }
        else {
          let uniqueid = create_UUID();

          //single way booking
          let div = document.createElement('div');

          //get user travel details
          for (let k = 0; k < alluserdata.length; k++) {
            if (alluserdata[k].bookingid == flightbookings[i].bookingid) {
              currentuser = alluserdata[k];
              break;
            }

          }
          div.innerHTML = `
      <div class="book1">
   
      <div class="container-fluid">
        <div class="row nogutters">
          <div class="col-4">
            <div class="transport-booking">
            <h4 >Mode of transport: <span><strong> FLIGHT</strong></span></h4>
            <span>Details:</span>
            <table class="table table-borderless">
            <tbody>
              <tr>
                <td scope="row">Name</td>
                <td><strong>${flightbookings[i].flightname}</strong></td>
                <td>Flight ID</td>
                <td><strong>${flightbookings[i].flightid}</strong></td>
              </tr>
              <tr>
                <td scope="row">From Time</td>
                <td><strong>1${flightbookings[i].fromtime}</strong></td>
                <td>To Time</td>
                <td><strong>${flightbookings[i].totime}</strong></td>
              </tr>
              <tr>
              <td scope="row">From</td>
              <td><strong>${currentuser.from}</strong></td>
              <td>To</td>
              <td><strong>${currentuser.to}</strong></td>
              </tr>
              <tr>
              <td scope="row">Adults</td>
              <td><strong>${currentuser.adult}</strong></td>
              <td>Children</td>
              <td><strong>${currentuser.children}</strong></td>
              </tr>
              <tr>
              <td scope="row">Date</td>
              <td><strong>${currentuser.departuredate}</strong></td>
              <td>Price</td>
              <td class="Price" style="padding-left: 0px;
              padding-bottom: 0px;"><strong>${flightbookings[i].price}<i class="fas fa-rupee-sign"></i></strong></td>
            
           
              </tbody>
            </table>
    
            </div>
          </div>
          <!-- ends -->
          <div class="col-4" style="visibility:hidden;">
            <div class="hotel-booking">
              <h4> <span>Name:</span><strong></strong></h4>
              <span>Details:</span>
              <p><strong>Location: </strong></p>
              <table class="table table-borderless">
              <tbody>
                <tr>
                  <td scope="row">From</td>
                  <td><strong></strong></td>
               
                </tr>
                <tr>
                  <td scope="row">Room-type</td>
                  <td><strong></strong></td>
                </tr>
                <tr>
                <td scope="row">Adults</td>
                <td><strong></strong></td>
                <td>Children</td>
                <td><strong></strong></td>
                </tr>
                <tr>
               
                <td>Price</td>
                <td class="Price" style="padding-left: 0px;
                padding-bottom: 0px;"><strong><i class="fas fa-rupee-sign"></i></strong></td>
                </tr>
                </tbody>
              </table>
    
            </div>
          </div>
          <div class="col-4">
            <div class="hoteldiv">
            <div class="hotel-hide">
             <h3 class="p1"> PAYMENT</h3>
            
              <table class="table table-borderless">
                <tbody>
                  <tr>
                    <td style="padding-bottom:0px"scope="row">AMOUNT PAID</td>
                  </tr>
                  <tr>
                    <td scope="row"></td>
                    <td style="padding-bottom:0px"><strong>TRANSPORT</strong></td>
                    <td style="padding-bottom:0px"><strong>${Number(flightbookings[i].price)}</strong></td>
                  </tr>
                </tbody>
              </table>
               <table class="table">
                 <tr>
                   <td  scope="row"></td>
                   <td ><strong> GRAND TOTAL</strong></td>
                   <td class="Price " style="text-align:right"><strong>${Number(flightbookings[i].price)}<i class="fas fa-rupee-sign"></i></strong></td>
                 </tr>
               </table>
               <table class="table">
                 <tr>
                   <td scope="row">Payment Method</td>
                   <td><strong>CARD</strong></td>
                   <td>Type</td>
                   <td><strong>VISA</strong></td>
                 </tr>
                 <tr>
                   <td scope="row">Card NO</td>
                   <td ><strong>4193 4279 4176 XXXX</strong></td>
                   <td >Exp</td>
                   <td ><strong>11/28</strong></td>
                 </tr>
     
               </table>
     
        
        <!--  -->
            </div>
          </div>
    
        </div>
    
      </div>
      <hr>
      <div class="text-center">
        <input class="btn btn-success" type="submit" value="Payment Successful">
        <!-- Button trigger modal -->
      <button type="button" class="btn btn-danger cancelbooking" data-bs-toggle="modal" data-bs-target="#a${uniqueid}">
        Cancel Booking
      </button>
    
      <!-- Modal -->
      <div class="modal fade" id="a${uniqueid}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel"><strong>Are you sure??..you want to cancel?</strong></h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Only 75% of the amount will be refunded.
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-danger ${currentuser.bookingid} destroy">Continue</button>
            </div>
          </div>
        </div>
      </div>
      </div>
      <hr>
      <hr>
      </div>
  `

          maincontainer.appendChild(div);
        }

      }
    }


    //train bookings display

    if (trainbookings.length != null) {
      let uniqueid = create_UUID();

      for (let i = 0; i < trainbookings.length; i++) {
        console.log(i);
        if (trainbookings[i + 1] != undefined && trainbookings[i + 1].bookingid == trainbookings[i].bookingid) {
          //render round trip
          //get hotel details
          for (let j = 0; j < hotelbookings.length; j++) {
            console.log(trainbookings[i].bookingid);
            if (hotelbookings[j].bookingid == trainbookings[i].bookingid) {
              console.log(hotelbookings[j]);
              currenthotel = hotelbookings[j];
              break;
            }
          }
          console.log(alluserdata);
          //get usertravel details
          for (let k = 0; k < alluserdata.length; k++) {
            if (alluserdata[k].bookingid == trainbookings[i].bookingid) {
              currentuser = alluserdata[k];
              break;
            }

          }
          console.log(trainbookings[i], currenthotel, currentuser);

          //here make a div and append it
          let div = document.createElement('div');
          div.innerHTML = `
      <div class="book1">
   
      <div class="container-fluid">
        <div class="row nogutters">
          <div class="col-4">
            <div class="transport-booking">
            <h4 >Mode of transport: <span><strong> TRAIN</strong></span></h4>
            <span>Details:</span>
            <table class="table table-borderless">
            <tbody>
              <tr>
                <td scope="row">Name</td>
                <td><strong>${trainbookings[i].trainname}</strong></td>
                <td>Class</td>
                <td><strong>${trainbookings[i].class}</strong></td>
              </tr>
              <tr>
                <td scope="row">From Time</td>
                <td><strong>1${trainbookings[i].fromtime}</strong></td>
                <td>To Time</td>
                <td><strong>${trainbookings[i].totime}</strong></td>
              </tr>
              <tr>
              <td scope="row">From</td>
              <td><strong>${currentuser.from}</strong></td>
              <td>To</td>
              <td><strong>${currentuser.to}</strong></td>
              </tr>
              <tr>
              <td scope="row">Adults</td>
              <td><strong>${currentuser.adult}</strong></td>
              <td>Children</td>
              <td><strong>${currentuser.children}</strong></td>
              </tr>
              <tr>
              <td scope="row">Date</td>
              <td><strong>${currentuser.departuredate}</strong></td>
              <td>Price</td>
              <td class="Price" style="padding-left: 0px;
              padding-bottom: 0px;"><strong>${trainbookings[i].price}<i class="fas fa-rupee-sign"></i></strong></td>
            
           
              </tbody>
            </table>
    
            </div>
          </div>
          <!-- ends -->
          <div class="col-4">
            <div class="hotel-booking">
              <h4> <span>Name:</span><strong> ${currenthotel.hotelname}</strong></h4>
              <span>Details:</span>
              <p><strong>Location: </strong>${currenthotel.hoteladdress}</p>
              <table class="table table-borderless">
              <tbody>
                <tr>
                  <td scope="row">From</td>
                  <td><strong>${currentuser.departuredate}</strong></td>
               
                </tr>
                <tr>
                  <td scope="row">Room-type</td>
                  <td><strong>${currenthotel.hotelclass}</strong></td>
                </tr>
                <tr>
                <td scope="row">Adults</td>
                <td><strong>${currentuser.adult}</strong></td>
                <td>Children</td>
                <td><strong>${currentuser.children}</strong></td>
                </tr>
                <tr>
               
                <td>Price</td>
                <td class="Price" style="padding-left: 0px;
                padding-bottom: 0px;"><strong>${currenthotel.hotelprice}<i class="fas fa-rupee-sign"></i></strong></td>
                </tr>
                </tbody>
              </table>
    
            </div>
          </div>
          <div class="col-4">
            <div class="hoteldiv">
            <div class="hotel-hide">
             <h3 class="p1"> PAYMENT</h3>
            
              <table class="table table-borderless">
                <tbody>
                  <tr>
                    <td style="padding-bottom:0px"scope="row">AMOUNT PAID</td>
                    <td style="padding-bottom:0px" class="pay"><strong>HOTEL</strong></td>
                    <td style="padding-bottom:0px"  class="pay"><strong>${currenthotel.hotelprice}</strong></td>
                  </tr>
                  <tr>
                    <td scope="row"></td>
                    <td style="padding-bottom:0px"><strong>TRANSPORT</strong></td>
                    <td style="padding-bottom:0px"><strong>${Number(trainbookings[i].price)}</strong></td>
                  </tr>
                  <tr>
                  <td scope="row"></td>
                  <td style="padding-bottom:0px"><strong>TRANSPORT (Returnbooking)</strong></td>
                  <td style="padding-bottom:0px"><strong>${Number(trainbookings[i + 1].price)}</strong></td>
                </tr>
                </tbody>
              </table>
               <table class="table">
                 <tr>
                   <td  scope="row"></td>
                   <td ><strong> GRAND TOTAL</strong></td>
                   <td class="Price " style="text-align:right"><strong>${Number(currenthotel.hotelprice) + Number(trainbookings[i].price) + Number(trainbookings[i + 1].price)}<i class="fas fa-rupee-sign"></i></strong></td>
                 </tr>
               </table>
               <table class="table">
                 <tr>
                   <td scope="row">Payment Method</td>
                   <td><strong>CARD</strong></td>
                   <td>Type</td>
                   <td><strong>VISA</strong></td>
                 </tr>
                 <tr>
                   <td scope="row">Card NO</td>
                   <td ><strong>4193 4279 4176 XXXX</strong></td>
                   <td >Exp</td>
                   <td ><strong>11/28</strong></td>
                 </tr>
     
               </table>
     
        
        <!--  -->
            </div>
          </div>
    
        </div>
    
      </div>
      <hr>
      <div class="text-center">
        <input class="btn btn-success" type="submit" value="Payment Successful">
        <!-- Button trigger modal -->
      <button type="button" class="btn btn-danger cancelbooking" data-bs-toggle="modal" data-bs-target="#a${uniqueid}">
        Cancel Booking
      </button>
    
      <!-- Modal -->
      <div class="modal fade" id="a${uniqueid}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel"><strong>Are you sure??..you want to cancel?</strong></h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Only 75% of the amount will be refunded.
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-danger ${currentuser.bookingid} destroy">Continue</button>
            </div>
          </div>
        </div>
      </div>
      </div>
      <hr>
      <hr>
      </div>
  `


          maincontainer.appendChild(div);
          i = i + 1;
        }
        else {
          //single way booking
          let div = document.createElement('div');
          let uniqueid = create_UUID();

          //get user travel details
          for (let k = 0; k < alluserdata.length; k++) {
            if (alluserdata[k].bookingid == trainbookings[i].bookingid) {
              currentuser = alluserdata[k];
              break;
            }

          }
          div.innerHTML = `
      <div class="book1">
   
      <div class="container-fluid">
        <div class="row nogutters">
          <div class="col-4">
            <div class="transport-booking">
            <h4 >Mode of transport: <span><strong> TRAIN</strong></span></h4>
            <span>Details:</span>
            <table class="table table-borderless">
            <tbody>
              <tr>
                <td scope="row">Name</td>
                <td><strong>${trainbookings[i].trainname}</strong></td>
                <td>Flight ID</td>
                <td><strong>${trainbookings[i].class}</strong></td>
              </tr>
              <tr>
                <td scope="row">From Time</td>
                <td><strong>1${trainbookings[i].fromtime}</strong></td>
                <td>To Time</td>
                <td><strong>${trainbookings[i].totime}</strong></td>
              </tr>
              <tr>
              <td scope="row">From</td>
              <td><strong>${currentuser.from}</strong></td>
              <td>To</td>
              <td><strong>${currentuser.to}</strong></td>
              </tr>
              <tr>
              <td scope="row">Adults</td>
              <td><strong>${currentuser.adult}</strong></td>
              <td>Children</td>
              <td><strong>${currentuser.children}</strong></td>
              </tr>
              <tr>
              <td scope="row">Date</td>
              <td><strong>${currentuser.departuredate}</strong></td>
              <td>Price</td>
              <td class="Price" style="padding-left: 0px;
              padding-bottom: 0px;"><strong>${trainbookings[i].price}<i class="fas fa-rupee-sign"></i></strong></td>
            
           
              </tbody>
            </table>
    
            </div>
          </div>
          <!-- ends -->
          <div class="col-4" style="visibility:hidden;">
            <div class="hotel-booking">
              <h4> <span>Name:</span><strong></strong></h4>
              <span>Details:</span>
              <p><strong>Location: </strong></p>
              <table class="table table-borderless">
              <tbody>
                <tr>
                  <td scope="row">From</td>
                  <td><strong></strong></td>
               
                </tr>
                <tr>
                  <td scope="row">Room-type</td>
                  <td><strong></strong></td>
                </tr>
                <tr>
                <td scope="row">Adults</td>
                <td><strong></strong></td>
                <td>Children</td>
                <td><strong></strong></td>
                </tr>
                <tr>
               
                <td>Price</td>
                <td class="Price" style="padding-left: 0px;
                padding-bottom: 0px;"><strong><i class="fas fa-rupee-sign"></i></strong></td>
                </tr>
                </tbody>
              </table>
    
            </div>
          </div>
          <div class="col-4">
            <div class="hoteldiv">
            <div class="hotel-hide">
             <h3 class="p1"> PAYMENT</h3>
            
              <table class="table table-borderless">
                <tbody>
                  <tr>
                    <td style="padding-bottom:0px"scope="row">AMOUNT PAID</td>
                  </tr>
                  <tr>
                    <td scope="row"></td>
                    <td style="padding-bottom:0px"><strong>TRANSPORT</strong></td>
                    <td style="padding-bottom:0px"><strong>${Number(trainbookings[i].price)}</strong></td>
                  </tr>
                </tbody>
              </table>
               <table class="table">
                 <tr>
                   <td  scope="row"></td>
                   <td ><strong> GRAND TOTAL</strong></td>
                   <td class="Price " style="text-align:right"><strong>${Number(trainbookings[i].price)}<i class="fas fa-rupee-sign"></i></strong></td>
                 </tr>
               </table>
               <table class="table">
                 <tr>
                   <td scope="row">Payment Method</td>
                   <td><strong>CARD</strong></td>
                   <td>Type</td>
                   <td><strong>VISA</strong></td>
                 </tr>
                 <tr>
                   <td scope="row">Card NO</td>
                   <td ><strong>4193 4279 4176 XXXX</strong></td>
                   <td >Exp</td>
                   <td ><strong>11/28</strong></td>
                 </tr>
     
               </table>
     
        
        <!--  -->
            </div>
          </div>
    
        </div>
    
      </div>
      <hr>
      <div class="text-center">
        <input class="btn btn-success" type="submit" value="Payment Successful">
        <!-- Button trigger modal -->
      <button type="button" class="btn btn-danger cancelbooking" data-bs-toggle="modal" data-bs-target="#s${uniqueid}">
        Cancel Booking
      </button>
    
      <!-- Modal -->
      <div class="modal fade" id="s${uniqueid}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel"><strong>Are you sure??..you want to cancel?</strong></h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Only 75% of the amount will be refunded.
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-danger ${currentuser.bookingid} destroy">Continue</button>
            </div>
          </div>
        </div>
      </div>
      </div>
      <hr>
      <hr>
      </div>
  `

          maincontainer.appendChild(div);
        }

      }
    }


    const destroy = document.querySelector(".destroy");
    maincontainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("destroy")) {
        console.log(e.target);
        console.log(e.target.classList[2]);
        let id = e.target.classList[2];
        fetch(`${url}/cancelbooking`, {
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
          method: 'POST',

          body: JSON.stringify({
            "id":id
          })
        })
        .then((data)=>{
          notyf.success('Booking cancelled successfully');
          setTimeout(function(){  window.location = `${url}/mybookings`; }, 1500);
        })

      }


    })









  })