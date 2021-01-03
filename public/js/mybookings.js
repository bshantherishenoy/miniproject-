
const maincontainer = document.querySelector(".maincontainer");
let url = `http://localhost:3000`;
let busbookings, trainbookings, flightbookings, hotelbookings, userdata, returnid = [], alluserdata;


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

    if (userdata.length != null) {
      userdata.forEach(element => {
        returnid.push(element.bookingid);
      });
      console.log(returnid);
    }
    if (busbookings.length != null) {
      console.log(`actual value of i ${busbookings.length}`);
      for (let i = 0; i < busbookings.length; i++) {
        console.log(i);
        let div = document.createElement('div');
        let currentbookingid = busbookings[i].bookingid;
        if (busbookings[i + 1] != undefined) {
          if (busbookings[i + 1].bookingid == currentbookingid) {
            //two way booking
            let duplicateid = currentbookingid;
            console.log(duplicateid);
            hotelbookings.forEach((hotel) => {
              if (hotel.bookingid == duplicateid) {
                alluserdata.forEach((alluserdatas) => {
                  if (duplicateid == alluserdatas.bookingid) {
                    console.log(` 1st here and my value of i is${i}`);
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
                          <td><strong>${alluserdatas.from}</strong></td>
                          <td>To</td>
                          <td><strong>${alluserdatas.to}</strong></td>
                          </tr>
                          <tr>
                          <td scope="row">Adults</td>
                          <td><strong>${alluserdatas.adult}</strong></td>
                          <td>Children</td>
                          <td><strong>${alluserdatas.children}</strong></td>
                          </tr>
                          <tr>
                          <td scope="row">Date</td>
                          <td><strong>${alluserdatas.departuredate}</strong></td>
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
                          <h4> <span>Name:</span><strong> ${hotel.hotelname}</strong></h4>
                          <span>Details:</span>
                          <p><strong>Location: </strong>${hotel.hoteladdress}</p>
                          <table class="table table-borderless">
                          <tbody>
                            <tr>
                              <td scope="row">From</td>
                              <td><strong>${alluserdatas.departuredate}</strong></td>
                           
                            </tr>
                            <tr>
                              <td scope="row">Room-type</td>
                              <td><strong>${hotel.hotelclass}</strong></td>
                            </tr>
                            <tr>
                            <td scope="row">Adults</td>
                            <td><strong>${alluserdatas.adult}</strong></td>
                            <td>Children</td>
                            <td><strong>${alluserdatas.children}</strong></td>
                            </tr>
                            <tr>
                           
                            <td>Price</td>
                            <td class="Price" style="padding-left: 0px;
                            padding-bottom: 0px;"><strong>${hotel.hotelprice}<i class="fas fa-rupee-sign"></i></strong></td>
                            </tr>
                            </tbody>
                          </table>
                
                        </div>
                      </div>
                      <div class="col-4">
                        <div class="hoteldiv">
                        <div class="hotel-hide">
                         <h3 class="p1"> HOTEL</h3>
                        
                          <table class="table table-borderless">
                            <tbody>
                              <tr>
                                <td style="padding-bottom:0px"scope="row">Amount to be paid</td>
                                <td style="padding-bottom:0px" class="pay"><strong>HOTEL</strong></td>
                                <td style="padding-bottom:0px"  class="pay"><strong>${hotel.hotelprice}</strong></td>
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
                               <td class="Price " style="text-align:right"><strong>${Number(hotel.hotelprice) + Number(busbookings[i].price) + Number(busbookings[i + 1].price)}<i class="fas fa-rupee-sign"></i></strong></td>
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
                  <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Cancel Booking
                  </button>
                
                  <!-- Modal -->
                  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                          <button type="button" class="btn btn-danger ${duplicateid}">Cancel</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                  <hr>
                  </div>
              `
                    i = i + 1;
                    console.log(i);

                  }

                })



              }

            })




          }
        }
        else {
          console.log(` 3rd here and my value of i is${i}`);
          //single booking
          let datalength = alluserdata.length;

          for (let j = 0; j < datalength; j++) {
            if (alluserdata[j].bookingid == currentbookingid) {

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
                        <td><strong>${alluserdata[i].from}</strong></td>
                        <td>To</td>
                        <td><strong>${alluserdata[i].to}</strong></td>
                        </tr>
                        <tr>
                        <td scope="row">Adults</td>
                        <td><strong>${alluserdata[i].adult}</strong></td>
                        <td>Children</td>
                        <td><strong>${alluserdata[i].children}</strong></td>
                        </tr>
                        <tr>
                        <td scope="row">Date</td>
                        <td><strong>${alluserdata[i].departuredate}</strong></td>
                        <td>Price</td>
                        <td class="Price" style="padding-left: 0px;
                        padding-bottom: 0px;"><strong>${busbookings[i].price}<i class="fas fa-rupee-sign"></i></strong></td>
                      
                     
                        </tbody>
                      </table>
              
                      </div>
                    </div>
                    <!-- ends -->
                    <div class="col-4" style="visibility:hidden">
                      <div class="hotel-booking">
                        <h4> <span>Name:</span><strong> \</strong></h4>
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
                       <h3 class="p1"> HOTEL</h3>
                      
                        <table class="table table-borderless">
                          <tbody>
                  
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
                <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Cancel Booking
                </button>
              
                <!-- Modal -->
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                        <button type="button" class="btn btn-danger ${busbookings[i].bookingid}">Cancel</button>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
                <hr>
                </div>
            `



            }


          }



        }

        //append here
        maincontainer.appendChild(div)

      }



    }






  })
     //first loop through userdata and keep uuid seperate
    //dont use for each
    //get length of array first and use simple for loop
    //while looping check if next div has same uuid then add that in the same div
    // if same uuid is detcted obviously it will have hotel so loop through hotel and display that too
    //also add that uuid (only 1 is there now yay!!) somehere near cancel button and once he clicks send that to server and deleted and page reload