let url = `http://localhost:3000`;
const adultvalue = document.querySelector(".adultvalue");
const childrenvalue = document.querySelector(".childrenvalue");
const fromvalue = document.querySelector(".fromvalue");
const tovalue = document.querySelector(".tovalue");
const datevalue = document.querySelector(".datevalue");
const modevalue = document.querySelector(".modevalue");
const namevalue = document.querySelector(".namevalue");
const classvalue = document.querySelector(".classvalue");
const classinput = document.querySelector(".classinput");
const fromtimevalue = document.querySelector(".fromtimevalue");
const totimevalue = document.querySelector(".totimevalue");
const pricevalue = document.querySelector(".pricevalue");
const returnbook = document.querySelector(".returnbook");
const returnbookpricevalue = document.querySelector(".returnbookpricevalue");
const hotelnamevalue = document.querySelector(".hotelnamevalue");
const hotellocation = document.querySelector(".hotellocation");
const hoteldatevalue = document.querySelector(".hoteldatevalue");
const hotelreturndatevalue = document.querySelector(".hotelreturndatevalue");
const roomtypevalue = document.querySelector(".roomtypevalue");
const adultvaluehotel = document.querySelector(".adultvaluehotel");
const childrenvaluehotel = document.querySelector(".childrenvaluehotel")
const hoteldatevalueto = document.querySelector(".hoteldatevalueto");
const hotelprice = document.querySelector(".hotelprice");
const hotelsdiv = document.querySelector(".hotels");
const totalpricevalue = document.querySelector(".totalpricevalue");
const paymentbutton = document.querySelector(".paymentbutton");
const nameoncard = document.querySelector(".nameoncard");
const creditcardnumber = document.querySelector(".creditcardnumber");
const expirationnumber = document.querySelector(".expirationnumber");
const cvvnumber = document.querySelector(".cvvnumber");
const buttondiv = document.querySelector(".buttondiv");
let globalvaluemode,uuid1,uuid2,hoteluuid;
var notyf = new Notyf();
fetch(`${url}/summarydetails`)
    .then((data) => data.json())
    .then((data) => {
        //first data
        console.log(data);
        globalvaluemode = data.mode;


        adultvalue.textContent = data.adult;
        childrenvalue.textContent = data.children;
        fromvalue.textContent = data.from;
        tovalue.textContent = data.to;
        datevalue.textContent = data.departuredate;
        modevalue.textContent = data.mode;
        let mode = data.mode;
        fetch(`${url}/summarytransportdetails`, {
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            method: 'POST',

            body: JSON.stringify({
                "mode": mode,
                "returndate": data.returndate,
                "from": data.from
            })
        })
            .then((data) => {

                console.log(data);
                return data.json()
            })
            .then((traveldata) => {
                //second data
                console.log(traveldata);
            
                console.log(globalvaluemode);
                if (traveldata.hoteldetails != undefined) {
                        //when applied for round trip
                         uuid1 = traveldata.data1.bookingid;
                         uuid2 = traveldata.returnuuid;
                         hoteluuid = traveldata.hoteldetails.bookingid;
                    if (globalvaluemode == 'PLANE') {
                        console.log(traveldata.data1);
                        namevalue.textContent = traveldata.data1.flightname;
                        classvalue.textContent = traveldata.data1.flightid;
                        classinput.textContent = 'Flight ID';
                        fromtimevalue.textContent = traveldata.data1.fromtime;
                        totimevalue.textContent = traveldata.data1.totime;
                        pricevalue.innerHTML = `${traveldata.data1.price}<i class="fas fa-rupee-sign"></i>`
                    }
                    else if (globalvaluemode == 'TRAIN') {
                        console.log(traveldata.data1);
                        namevalue.textContent = traveldata.data1.trainname;
                        classvalue.textContent = traveldata.data1.class;
                        fromtimevalue.textContent = traveldata.data1.fromtime;
                        totimevalue.textContent = traveldata.data1.totime;
                        pricevalue.innerHTML = `${traveldata.data1.price}<i class="fas fa-rupee-sign"></i>`
                    }
                    else {
                        console.log(traveldata.data1);
                        namevalue.textContent = traveldata.data1.busname;
                        classvalue.textContent = traveldata.data1.class;
                        fromtimevalue.textContent = traveldata.data1.fromtime;
                        totimevalue.textContent = traveldata.data1.totime;
                        pricevalue.innerHTML = `${traveldata.data1.price}<i class="fas fa-rupee-sign"></i>`
                    }
                    //update returnbooking price
                                console.log("--------------here------------");
                    returnbook.style.display = 'block';
                    returnbookpricevalue.textContent = traveldata.priceofreturnbook;
                    //update hotel details
                    hotelnamevalue.textContent = traveldata.hoteldetails.hotelname;
                    hotellocation.textContent = traveldata.hoteldetails.hoteladdress;
                    hoteldatevalue.textContent = data.departuredate;
                    hotelreturndatevalue.textContent = data.returndate;
                    roomtypevalue.textContent = traveldata.hoteldetails.hotelclass;
                    console.log(roomtypevalue);
                    console.log(traveldata.hoteldetails.hotelclass);
                    adultvaluehotel.textContent = data.adult;
                    childrenvaluehotel.textContent = data.children;

                    hotelprice.innerHTML = `${traveldata.hoteldetails.hotelprice}<i class="fas fa-rupee-sign"></i>`;
                    let totalprice = Number(traveldata.data1.price) + Number(traveldata.priceofreturnbook) + Number(traveldata.hoteldetails.hotelprice);
                    console.log(totalprice);
                    totalpricevalue.innerHTML = `${totalprice}<i class="fas fa-rupee-sign"></i>`
                }
                else{
                    //single way booking
                    uuid1 = traveldata.bookingid;
                    if (globalvaluemode == 'PLANE') {
                        console.log(traveldata);
                        namevalue.textContent = traveldata.flightname;
                        classvalue.textContent = traveldata.flightid;
                        classinput.textContent = 'Flight ID';
                        fromtimevalue.textContent = traveldata.fromtime;
                        totimevalue.textContent = traveldata.totime;
                        pricevalue.innerHTML = `${traveldata.price}<i class="fas fa-rupee-sign"></i>`
                    }
                    else if (globalvaluemode == 'TRAIN') {
                        console.log(traveldata);
                        namevalue.textContent = traveldata.trainname;
                        classvalue.textContent = traveldata.class;
                        fromtimevalue.textContent = traveldata.fromtime;
                        totimevalue.textContent = traveldata.totime;
                        pricevalue.innerHTML = `${traveldata.price}<i class="fas fa-rupee-sign"></i>`
                    }
                    else {
                        console.log(traveldata);
                        namevalue.textContent = traveldata.busname;
                        classvalue.textContent = traveldata.class;
                        fromtimevalue.textContent = traveldata.fromtime;
                        totimevalue.textContent = traveldata.totime;
                        pricevalue.innerHTML = `${traveldata.price}<i class="fas fa-rupee-sign"></i>`
                    }
                    //hide hotel div and update total price
                    console.log("----heyyoo---");
                        hotelsdiv.style.visibility = "hidden";
                        let totalprice = Number(traveldata.price);
                        console.log(totalprice);
                        totalpricevalue.innerHTML = `${totalprice}<i class="fas fa-rupee-sign"></i>`

                }
                // console.log(traveldata.priceofreturnbook);
                // if (traveldata.priceofreturnbook != undefined) {
                //     console.log("--------------here------------");
                //     returnbook.style.display = 'block';
                //     returnbookpricevalue.textContent = traveldata.priceofreturnbook;
                // }
                // console.log(traveldata.hoteldetails);
                // if (traveldata.hoteldetails != undefined) {
                //     hotelnamevalue.textContent = traveldata.hoteldetails.hotelname;
                //     hotellocation.textContent = traveldata.hoteldetails.hoteladdress;
                //     hoteldatevalue.textContent = data.departuredate;
                //     hotelreturndatevalue.textContent = data.returndate;
                //     roomtypevalue.textContent = traveldata.hoteldetails.hotelclass;
                //     console.log(roomtypevalue);
                //     console.log(traveldata.hoteldetails.hotelclass);
                //     adultvaluehotel.textContent = data.adult;
                //     childrenvaluehotel.textContent = data.children;

                //     hotelprice.innerHTML = `${traveldata.hoteldetails.hotelprice}<i class="fas fa-rupee-sign"></i>`;
                //     let totalprice = Number(traveldata.data1.price) + Number(traveldata.priceofreturnbook) + Number(traveldata.hoteldetails.hotelprice);
                //     console.log(totalprice);
                //     totalpricevalue.innerHTML = `${totalprice}<i class="fas fa-rupee-sign"></i>`
                // }
                // else {
                //     console.log("----heyyoo---");
                //     hotelsdiv.style.visibility = "hidden";
                //     let totalprice = Number(traveldata.data1.price);
                //     console.log(totalprice);
                //     totalpricevalue.innerHTML = `${totalprice}<i class="fas fa-rupee-sign"></i>`
                // }

            })


    })
paymentbutton.addEventListener("click",(e)=>{
    e.preventDefault();
if(nameoncard.value != '' && creditcardnumber.value != '' && expirationnumber.value!='' && cvvnumber.value!=''){
    console.log("Im here");
    fetch(`${url}/paymentprocessing`, {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        method: 'POST',

        body: JSON.stringify({
            "mode": globalvaluemode,
            "uuid1": uuid1,
            "uuid2":uuid2,
            "hoteluuid": hoteluuid
        })
    })
    .then((data)=>{
        console.log(data);
        notyf.success('Payment successful');
        buttondiv.innerHTML = `<button class="btn btn-danger btn-lg btn-block" type="button" disabled>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Redirecting...
      </button>`
        setTimeout(function(){  window.location = `${url}/mybookings`; }, 2500);
    })
}
else{
    notyf.error('Please enter valid credentials');
}
})

