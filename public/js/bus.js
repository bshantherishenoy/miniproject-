let classarray;
const dateinput = document.querySelector(".dateinput");
const frominput = document.querySelector(".frominput")
const toinput = document.querySelector(".toinput")
const container = document.querySelector(".container")

let url = `http://localhost:3000`;


fetch("../JSON/busdetails.json")
    .then((data) => data.json())
    .then((data) => {
        let data1 = data.bus[0].class;
        classarray = Object.values(data1)
        console.log(classarray);
    })


fetch("http://localhost:3000/busdetails")
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
        let bookingid = res.bookingid;
        let returndate = res.returndate;
        dateinput.textContent = departuredate;
        frominput.textContent = from;
        toinput.textContent = to;
        let totalpeople = children + adult;
        return { totalpeople, returndate,bookingid };

    })
    .then((totalpeoples) => {
        let bookingid = totalpeoples.bookingid;
        if(totalpeoples.returndate == 'returnbook'){
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; 
            let returnbook = document.querySelector(".returnbook");
            returnbook.textContent = 'RETURN BOOKING'
        }
        let totalpeople = totalpeoples.totalpeople;
        for (let i = 0; i < 6; i++) {
            console.log(totalpeople);
            let busarray = ['Volvo Travels', 'SRS Travels', 'VRL Travels', 'KSK Travels']
            let randomNumber = Math.floor(Math.random() * 4);
            let div = document.createElement('div');
            let randomNumberday = Math.floor(Math.random() * (2 - 1) + 1);
            let randomNumberhours = Math.floor(Math.random() * 24);
            let randomcapacity = Math.floor(Math.random() * (60 - 50) + 50);
            let randomprice = Math.floor(Math.random() * (6000 - 3000) + 3000);
            let totalpeopleinput = Math.floor(Math.random() * (21 - totalpeople) + totalpeople);
            let randomtime = Math.floor(Math.random() * 13 + 1)
            let randomduration = Math.floor(Math.random() * (6 - 4) + 4);
            let randomminute1 = Math.floor(Math.random() * 6);
            let randomminute2 = Math.floor(Math.random() * 9);
            let randomminute3 = Math.floor(Math.random() * 6);
            let randomminute4 = Math.floor(Math.random() * 9);
            div.innerHTML = `
        
        <div class="jumbotron 1b" style="padding:10px 20px;margin-bottom:40px;">
        <div class="row">
            <div class="col-lg-3">
                <h3>${busarray[randomNumber]}</h3>
            </div>
            <div class="col-lg-3">
                <h4>Dur: ${randomNumberday} day ${randomNumberhours}hrs</h4>
            </div>
            <div class="col-lg-3">
                <h4>Class: <span>${classarray[randomNumber]}</span></h4>
            </div>
            <div class="col-lg-3">
                <h4>Price:<strong>${randomprice} </strong><i class="fas fa-rupee-sign"></i></h4>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-6">
                <h4><i class="fas fa-users"></i>Capacity: <span>${randomcapacity}</span></h4>
            </div>
            <div class="col-lg-6 ca2">
                <h4>Avaliable Seats: <span>${totalpeopleinput}</span></h4>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-6">
                <h4>Departure Time: <span>${randomtime}:${randomminute1}${randomminute2}</span></h4>
            </div>
            <div class="col-lg-6  ca3">
                <h4>Return Time: <span>${randomtime + randomduration}:${randomminute3}${randomminute4}</span></h4>
            </div>
        </div>

        <div class="row">
            <div class="col-4">
                <h5><i class="fas fa-map-marked-alt"></i><i class="fas fa-head-side-mask"></i><i class="fas fa-pump-soap"></i><i class="fas fa-utensils"></i></h5>
            </div>
            <div class="col-4 offset-4">
                <a class="btn btn-danger btn-lg btn-block booknow" href="#" role="button"><strong>BOOK NOW<i
                            class="fas fa-angle-right"></i></strong></a>
            </div>
        </div>
    </div>
        
        `
     

            //append the div
            container.appendChild(div);
        }
        container.addEventListener("click", (e) => {
            console.log(e.target);
            if (e.target.classList.contains("booknow")) {
                console.log("hellooooo");
                let price = e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.children[3].children[0].children[0].textContent;
                console.log(price);
                let class1 = e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.children[2].children[0].children[0].textContent;
                console.log(class1);
                let brand = e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.children[0].children[0].textContent;
                console.log(brand);
                let departuretime = e.target.parentElement.parentElement.previousElementSibling.children[0].children[0].children[0].textContent;
                console.log(departuretime);
                let returntime = e.target.parentElement.parentElement.previousElementSibling.children[1].children[0].children[0].textContent;
                console.log(returntime);
                fetch("http://localhost:3000/busbooking", {
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    },
                    method: 'POST',

                    body: JSON.stringify({
                        "price": price,
                        "fromtime": departuretime,
                        "totime": returntime,
                        "brand": brand,
                        "class1": class1,
                        "bookingid" : bookingid 
                    })
                })
                    .then((data) => {
                        // window.location = "http://localhost:3000/home";
                        console.log(totalpeoples.returndate);
                        if (totalpeoples.returndate != 'undefined' && totalpeoples.returndate != 'returnbook') {
                            console.log("helloooooo");
                            fetch(`${url}/busreturnbooking`)
                                .then((data) => {
                                    console.log(data);
                                    // window.location = "http://localhost:3000/home";
                                    window.location.reload();
                                })

                        }
                        else {
                            //endpoint
                               //endpoint
                               if(totalpeoples.returndate == 'returnbook'){
                                window.location = `${url}/hotel`;
                            }
                            else{
                                window.location = `${url}/summary`;
                            }
                        }
                        })

            }
        })

    })