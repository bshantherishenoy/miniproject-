const frominput = document.querySelector(".from");
const toinput = document.querySelector(".to");
const dateinput = document.querySelector(".date");
let bengalurutochennai, bengalurutodelhi, bengalurutomumbai, bengalurutohyderabad, chennaitobengaluru, chennaitodelhi, chennaitomumbai, chennaitohyderabad;
let delhitobengaluru, delhitochennai, delhitomumbai, delhitohyderabad, mumbaitobengaluru, mumbaitochennai, mumbaitodelhi, mumbaitohyderabad;
let hyderabadtobengaluru, hyderabadtochennai, hyderabadtodelhi, hyderabadtomumbai;
let selectedarray;
const tickets = document.querySelector(".tickets");
let url = `http://localhost:3000`;


fetch("../JSON/traincities.json")
    .then((data) => data.json())
    .then((data) => {
        bengalurutochennai = Object.values(data.train[0].bengaluru[0].chennai[0]);
        bengalurutodelhi = Object.values(data.train[0].bengaluru[1].delhi)
        bengalurutomumbai = Object.values(data.train[0].bengaluru[2].mumbai);
        bengalurutohyderabad = Object.values(data.train[0].bengaluru[3].hyderabad)

        chennaitobengaluru = Object.values(data.train[1].chennai[0].bengaluru);
        chennaitodelhi = Object.values(data.train[1].chennai[1].delhi);
        chennaitomumbai = Object.values(data.train[1].chennai[2].mumbai);
        chennaitohyderabad = Object.values(data.train[1].chennai[3].hyderabad);

        delhitobengaluru = Object.values(data.train[2].delhi[0].bengaluru);
        delhitochennai = Object.values(data.train[2].delhi[1].chennai);
        delhitomumbai = Object.values(data.train[2].delhi[2].mumbai);
        delhitohyderabad = Object.values(data.train[2].delhi[3].hyderabad);


        mumbaitobengaluru = Object.values(data.train[3].mumbai[0].bengaluru);
        mumbaitochennai = Object.values(data.train[3].mumbai[1].chennai);
        mumbaitodelhi = Object.values(data.train[3].mumbai[2].delhi);
        mumbaitohyderabad = Object.values(data.train[3].mumbai[3].hyderabad);


        hyderabadtobengaluru = Object.values(data.train[4].hyderabad[0].bengaluru);
        hyderabadtochennai = Object.values(data.train[4].hyderabad[1].chennai);
        hyderabadtodelhi = Object.values(data.train[4].hyderabad[2].delhi);
        hyderabadtomumbai = Object.values(data.train[4].hyderabad[3].mumbai);


        console.log({ hyderabadtochennai });
        console.log(hyderabadtochennai.length);
    })


fetch("http://localhost:3000/traindetails")
    .then((res) => {

        return res.json();
    })
    .then((res) => {
        //data from server
        console.log(res);
        let departuredate = res.departuredate;
        let from = res.from;
        let to = res.to;
        let children = res.children;
        let adult = res.adult;
        let returndate = res.returndate;
        let bookingid = res.bookingid;
        dateinput.textContent = departuredate;
        frominput.textContent = from;
        toinput.textContent = to;
        let totalpeople = children + adult;
        return {
            totalpeople,
            from,
            to,
            returndate,
            bookingid
        }
    })
    .then((details) => {
        let totalpeople = details.totalpeople;
        let returndate = details.returndate;
        let todetails = details.to;
        let fromdetails = details.from;
        let bookingid = details.bookingid;
        console.log(todetails);
        console.log(fromdetails);
//add the text
        if(returndate == 'returnbook'){
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; 
            let returnbook = document.querySelector(".returnbook");
            returnbook.textContent = 'RETURN BOOKING'
        }
        if (fromdetails == 'MUMBAI') {
            if (todetails == 'BANGLORE') {
                // let randomNumber = Math.floor(Math.random() * mumbaitobengaluru.length)
                // console.log(mumbaitobengaluru[randomNumber]);
                // console.log({ mumbaitobengaluru });
                selectedarray = mumbaitobengaluru
            }
            if (todetails == 'CHENNAI') {
                console.log({ mumbaitochennai });
                selectedarray = mumbaitochennai
            }
            if (todetails == 'DELHI') {
                console.log({ mumbaitodelhi });
                selectedarray = mumbaitodelhi
            }
            if (todetails == 'HYDERABAD') {
                console.log({ mumbaitohyderabad });
                selectedarray = mumbaitohyderabad;
            }
        } else if (fromdetails == 'BANGLORE') {

            if (todetails == 'MUMBAI') {
                console.log({ bengalurutomumbai });
                selectedarray = bengalurutomumbai
            }
            if (todetails == 'CHENNAI') {
                console.log({ bengalurutochennai });
                selectedarray = bengalurutochennai;
            }
            if (todetails == 'DELHI') {
                console.log({ bengalurutodelhi });
                selectedarray = bengalurutodelhi;
            }
            if (todetails == 'HYDERABAD') {
                console.log({ bengalurutohyderabad });
                selectedarray = bengalurutohyderabad;
            }
        } else if (fromdetails == 'CHENNAI') {

            if (todetails == 'MUMBAI') {
                console.log({ chennaitomumbai });
                selectedarray = chennaitomumbai;
            }
            if (todetails == 'DELHI') {
                console.log({ chennaitodelhi });
                selectedarray = chennaitodelhi;
            }
            if (todetails == 'BANGLORE') {
                console.log({ chennaitobengaluru });
                selectedarray = chennaitobengaluru;
            }
            if (todetails == 'HYDERABAD') {
                console.log({ chennaitohyderabad });
                selectedarray = chennaitohyderabad;
            }
        } else if (fromdetails == 'DELHI') {

            if (todetails == 'MUMBAI') {
                console.log({ delhitomumbai });
                selectedarray = delhitomumbai;
            }
            if (todetails == 'CHENNAI') {
                console.log({ delhitochennai });
                selectedarray = delhitochennai;
            }
            if (todetails == 'BANGLORE') {
                console.log({ delhitobengaluru });
                selectedarray = delhitobengaluru;
            }
            if (todetails == 'HYDERABAD') {
                console.log({ delhitohyderabad });
                selectedarray = delhitohyderabad;
            }
        } else {

            if (todetails == 'MUMBAI') {
                console.log({ hyderabadtomumbai });
                selectedarray = hyderabadtomumbai;
            }
            if (todetails == 'CHENNAI') {
                console.log({ hyderabadtochennai });
                selectedarray = hyderabadtochennai;
            }
            if (todetails == 'BANGLORE') {
                console.log({ hyderabadtobengaluru });
                selectedarray = hyderabadtobengaluru;
            }
            if (todetails == 'DELHI') {
                console.log({ hyderabadtodelhi });
                selectedarray = hyderabadtodelhi;
            }

        }
        return {selectedarray,returndate,bookingid};
    })
    .then((selected) => {
        let returndate = selected.returndate;
let bookingid = selected.bookingid;
let selectedarray = selected.selectedarray;
        console.log(selectedarray);
        console.log(selectedarray.length);
        for (let i = 0; i < selectedarray.length; i++) {
            console.log("wohoooo");
            let randomNumberday = Math.floor(Math.random() * (2 - 1) + 1);
            let randomprice = Math.floor(Math.random() * (4000 - 2000) + 2000);
            let randomNumberhours = Math.floor(Math.random() * 24);
            let randomtime = Math.floor(Math.random() * 13 + 1)
            let randomduration = Math.floor(Math.random() * (6 - 4) + 4);
            let randomminute1 = Math.floor(Math.random() * 6);
            let randomminute2 = Math.floor(Math.random() * 9);
            let randomminute3 = Math.floor(Math.random() * 6);
            let randomminute4 = Math.floor(Math.random() * 9);
            let div = document.createElement('div');
            div.innerHTML = `
    <div class="row 1t">
        <div class="col-3">
            <h4><strong>${selectedarray[i]}</strong></h4>
            <p>Departs on-<span class="latoBold weeklySchedule">
        <span title="Sunday"class="sp" >S</span>
                <span title="Monday" class="sp">M</span>
                <span title="Tuesday" class="sp">T</span>
                <span title="Wednesday" class="sp">W</span>
                <span title="Thursday" class="sp">T</span>
                <span title="Friday" class="sp">F</span>
                <span title="Saturday">S</span>
                </span>
            </p>
        </div>
        <div class="col-1">
            <h4><strong>${randomtime}:${randomminute1}${randomminute2}</strong></h4>
        </div>
        <div class="col-3">
            <ul class="items1">
                <li><strong>${randomNumberday}d ${randomNumberhours}h</strong></li>
                <li>---------------------------</li>
                <li><strong >Price : <span>${randomprice}</span></strong></li>

             
            </ul>
        </div>
        <div class="col-1">
            <h4><strong>${randomtime + randomduration}:${randomminute3}${randomminute4}</strong></h4>
        </div>
        <div class="col-4">
            <button type="button" class="btn btn-primary btn-lg offset-6 booknow" data-toggle="modal" data-target="#exampleModal">BOOK NOW</button>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">SELECT A CLASS</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
                    </div>
                    <div class="modal-body">
                        <input type="radio" id="1A" name="AC" value="1A">
                        <label for="1A">1A</label>
                        <input type="radio" id="EC" name="AC" value="EC">
                        <label for="EC">EC</label>
                        <input type="radio" id="2A" name="AC" value="2A">
                        <label for="2A">2A</label>
                        <input type="radio" id="FC" name="AC" value="FC">
                        <label for="FC">FC</label>
                        <input type="radio" id="3A" name="AC" value="3A">
                        <label for="2A">3A</label>
                        <input type="radio" id="SL" name="AC" value="SL">
                        <label for="SL">SL</label>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <input class="btn btn-primary submitbutton" type="submit" value="Submit">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <hr>
    
    `
            console.log(tickets);
            tickets.appendChild(div)
        }
return {returndate,bookingid};
    })
    .then((returndate1) => {

let returndate = returndate1.returndate;
let bookingid = returndate1.bookingid;
        let selectedclass, price, brand, departuretime, returntime;

        tickets.addEventListener("click", (e) => {
            if (e.target.classList.contains("booknow")) {
                console.log("hellooooo");
                price = e.target.parentElement.previousElementSibling.previousElementSibling.children[0].children[2].children[0].children[0].textContent;

                // let class1 = e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.children[2].children[0].children[0].textContent;
                // console.log(class1);
                brand = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.children[0].children[0].textContent;

                departuretime = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.children[0].children[0].textContent;

                returntime = e.target.parentElement.previousElementSibling.children[0].children[0].textContent;


            }

        })
        const modalbody = document.querySelector(".modal-footer");
        modalbody.addEventListener("click", (e) => {
            console.log("here");
            console.log(e.target);
            if (e.target.classList.contains("submitbutton")) {
                console.log(departuretime);
                console.log(returntime);
                console.log(brand);
                console.log(selectedclass);
                console.log(price);

                fetch("http://localhost:3000/trainbooking", {
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        },
                        method: 'POST',

                        body: JSON.stringify({
                            "price": price,
                            "fromtime": departuretime,
                            "totime": returntime,
                            "brand": brand,
                            "class1": selectedclass,
                            "bookingid": bookingid
                        })
                    })
                    .then((data) => {
                        // window.location = "http://localhost:3000/home";
                        console.log(returndate);
                        if(returndate != 'undefined' && returndate!='returnbook'){
                            console.log("helloooooo");
                            fetch(`${url}/trainreturnbooking`)
                            .then((data)=>{
                                console.log(data);
                                // window.location = "http://localhost:3000/home";
                                window.location.reload();
                            })

                        }
                        else{
                            //endpoint
                            if(returndate == 'returnbook'){
                                window.location = `${url}/hotel`;
                            }
                            else{
                                window.location = `${url}/summary`;
                            }
                        }
                    })
            }

        })
        let rad = document.querySelectorAll("input[name='AC']");
        for (var i = 0; i < rad.length; i++) {
            rad[i].addEventListener('change', function() {
                selectedclass = this.value;

            });
        }

    })