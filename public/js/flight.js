let flightbrandsarray, flightlogosarray, flightidarray;

let url = `http://localhost:3000`;


fetch("../JSON/Planedetails.json")
    .then((data) => data.json())
    .then((data) => {
        let flightbrands = data.plane[0].flightnames;
        flightbrandsarray = Object.values(flightbrands);
        console.log({ flightbrandsarray });
        let flightlogos = data.plane[0].flightlogos;
        flightlogosarray = Object.values(flightlogos);
        console.log({ flightlogosarray });
        let flightid = data.plane[0].flightid;
        flightidarray = Object.values(flightid);
        console.log({ flightidarray });
    })


let dateinput = document.querySelector(".Date");
let frominput = document.querySelector(".from");
let toinput = document.querySelector(".to");
let container = document.querySelector(".container")



console.log("hello");




fetch(`${url}/flightdetails`)
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
        dateinput.textContent = departuredate;
        frominput.textContent = from;
        toinput.textContent = to;
        let totalpeople = children + adult;
        console.log({returndate});

        if(returndate == 'returnbook'){
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; 
            let returnbook = document.querySelector(".returnbook");
            returnbook.textContent = 'RETURN BOOKING'
        }

        let details = [totalpeople,returndate];
        return details;
    })
    .then((details) => {
console.log(details[1]);

        for (let i = 0; i < 6; i++) {
            let randomNumber = Math.floor(Math.random() * 7);
            console.log(randomNumber);
            let div = document.createElement('div');
            let randomNumber1 = Math.floor(Math.random() * 10);
            let randomNumber2 = Math.floor(Math.random() * 10);
            let randomNumber3 = Math.floor(Math.random() * 10);
            let randomprice = Math.floor(Math.random() * (10000 - 3000) + 3000);
            let totalpeopleinput = Math.floor(Math.random() * (21 - details[0]) + details[0]);
            let randomtime = Math.floor(Math.random() * 13 + 1)
            let randomduration = Math.floor(Math.random() * (6 - 4) + 4);
            let randomminute1 = Math.floor(Math.random() * 6);
            let randomminute2 = Math.floor(Math.random() * 9);
            let randomminute3 = Math.floor(Math.random() * 6);
            let randomminute4 = Math.floor(Math.random() * 9);
            div.innerHTML = `<div class="veh1">
    <div class="row">
        <div class="col-md-4">
            <img src="${flightlogosarray[randomNumber]}" alt="air India" class="sa">
        </div>
        <div class="col-md-4">
            <h4 class="flightbrand">${flightbrandsarray[randomNumber]}</h4>
            <h4 class=""flightid>|${flightidarray[randomNumber]}-${randomNumber1}${randomNumber2}${randomNumber3}</h4>
            <h4>Avaliable Seats :${totalpeopleinput}</h4>
        </div>
        <div class="col-md-4">
            <h4>Price: <i class="fas fa-rupee-sign"></i><span class="price">${randomprice}</span></h4>
            <h4>Dur:- <span class="fromtime">${randomtime}:${randomminute1}${randomminute2}</span> - <span class="totime">${randomtime + randomduration}:${randomminute3}${randomminute4} </span></h4>
            <button type="button" class="btn btn-success btn-lg btn-link booknow " style="color:#FFf;">Book Now <i class="fas fa-angle-right"></i></button>
        </div>
    </div>
</div>
<hr>`;








            //append the div
            container.appendChild(div);




        }


        container.addEventListener("click", (e) => {
            if (e.target.classList.contains("booknow")) {
                console.log("hellooooo");
                let pricevalue = e.target.parentElement.children[0].children[1].textContent;
                let fromtimevalue = e.target.parentElement.children[1].children[0].textContent;
                let totimevalue = e.target.parentElement.children[1].children[1].textContent;
                let brandvalue = e.target.parentElement.parentElement.children[1].children[0].textContent;
                let flightidvalue = e.target.parentElement.parentElement.children[1].children[1].textContent;



                fetch(`${url}/flightbooking`, {
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        },
                        method: 'POST',

                        body: JSON.stringify({
                            "price": pricevalue,
                            "fromtime": fromtimevalue,
                            "totime": totimevalue,
                            "brand": brandvalue,
                            "flightid": flightidvalue
                        })
                    })
                    .then((data) => {
                        console.log(details[1]);
let varr = typeof(details[1])
console.log(varr);
                        if(details[1] != 'undefined' && details[1]!='returnbook'){
                            console.log("helloooooo");
                            fetch(`${url}/flightreturnbooking`)
                            .then((data)=>{
                                console.log(data);
                                // window.location = "http://localhost:3000/home";
                                window.location.reload();
                            })

                        }
                        else{
                            //endpoint
                            //from here go to hotel or go to my bookings
                            if(details[1] == 'returnbook'){
                                window.location = `${url}/hotel`;
                            }
                            else{
                                window.location = `${url}/mybookings`;
                            }
                                

                        }
                       


                    })

            }


        })

    })