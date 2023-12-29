// 1
let btn = document.querySelector("#btn");
let city = document.querySelector("#city");
btn.addEventListener("click", ()=>{
    let inpupCity = document.querySelector("#input").value;
    console.log(inpupCity);
    showCity(inpupCity);
})

// 4
 async function showCity(inputCity){
    let tempFromFunc = await getTemp(inputCity);  // from weather api
    city.innerHTML = inputCity;
    temp(tempFromFunc);  //go to 5 no
}

// 5
function temp(temperature){
    let h1Temp = document.querySelector("#temp");
    console.log(temperature)
    h1Temp.innerHTML = temperature;
}
// 2
let todayBtn = document.querySelector("#today");
let tomorrowBtn = document.querySelector("#tomorrow");

todayBtn.addEventListener("click",()=>{
    tomorrowBtn.style.opacity = "0.5"
    todayBtn.style.opacity = "1"
})
tomorrowBtn.addEventListener("click",()=>{
    todayBtn.style.opacity = "0.5"
    tomorrowBtn.style.opacity = "1"
})

// 3 live location api for use city acess
let cityUrl = "https://ipgeolocation.abstractapi.com/v1/?api_key=b8bc37d75304459281dde093c9ec34b0&ip_address=106.78.52.84"

async function getCity(){
   try{
        let res = await axios.get(cityUrl);
        return res.data.city
   } catch(e){
        console.log("Fetch geolocation api Error: ",e);
   }
}

async function onScreenCity(){
    try {
        let cityLive = await getCity()
        city.innerHTML = cityLive;
        showCity(cityLive) //go to 4 no
    }catch(e){
        console.log("onScreenCity Error: ",e);
    }
}
onScreenCity();

// weather api for acess temp 
let api_key = "3a3224bf228ce28031f0007d1833e786"

async function getTemp(city){
    try{
        let res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`);
        let data = res.data.main;
        let unixSunrise = res.data.sys.sunrise
        // moment('2023-12-29 07:20 AM', 'YYYY-MM-DD hh:mm a').format('YYYY/MM/DD hh:mm a')
        // var renderTime = moment.unix(unixSunrise).format("YYYY-MM-DD hh:mm a");
        console.log(unixSunrise)

        let clouds = res.data.weather;
        clouDs(clouds); //go to 11
        console.log(res.data)

        let wind = Math.round(res.data.wind.speed * 3.6) ;
        winD(wind); // go to 10

        let pressure = data.pressure;
        presSure(pressure); // go to 9

        let humidity = data.humidity;
        humiDity(humidity); // go to 8
        console.log("HUMI:" , humidity)

        let temp = Math.round((data.temp) - 273.15)  ;
        console.log(temp)
        let feel_like = Math.round(data.feels_like - 273.15);

        feelLike(feel_like)   // go to 7
        console.log("feel like",data.feels_like);
        return temp;
    } catch(e){
        console.log("Get Tempreature Error:  " ,e)
    }
    
}
// 11
async function clouDs(clouds){
    let cloouds = document.querySelector("#clooud")
    for(cloud of clouds){
        console.log(cloud.description);
        cloouds.innerHTML = cloud.description
    }
}
// 10
async function winD(wind){
    try{
        console.log("wind : ",wind);
        let windd = document.querySelector("#wind");
        windd.innerHTML = wind + " ";
    }catch(e){

    }
}
// 9
async function presSure(pre){
    try{
        let presTag = document.querySelector("#presure")
        presTag.innerHTML = pre + " "  
    }catch(e){
        console.log("Pressure Error:", e);
    }
}
// 8
async function humiDity(humi){
    try{    
        let humidity = humi;
        console.log(humi)
        let humii = document.querySelector("#humi");
        humii.innerHTML = humidity;

    }catch(e){
        console.log("Humidity Error: " ,e)
    }
}

// 7
async function feelLike(temp){
    try{
        let tempreature = temp;
        console.log(tempreature)
        let realFeel = document.querySelector("#realFeel")
        realFeel.innerHTML = tempreature;
    }catch(e){
        console.log("feel like temp Error: ", e);
    }
}


let timeUrl = "http://worldtimeapi.org/api/timezone/Asia/Kolkata"

async function getTime(){
    let res = await axios.get(timeUrl);
    let dateTime = `${res.data.datetime}`;
    console.log(dateTime)
}

setTimeout(getTime(),60000)