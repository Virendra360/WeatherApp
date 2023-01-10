const submitBtn = document.getElementById("submitBtn");
const cityName = document.getElementById("cityName"); //to get enter city name
const city_name = document.getElementById("city_name");  //to throw error or show city name
const temp_real_val = document.getElementById("temp_real_val");           
const temp_status = document.getElementById("temp_status");
const datahide = document.querySelector(".middle_layer")
const day = document.getElementById("day");   // to show day in search
const today_date= document.getElementById("today_date");   // to show date in search

//Getting day and date
var d= new Date();

var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var daylocal=d.getDay();  //returns 0-6 value for sun..sat
day.innerHTML= `${weekday[daylocal]}`;

var month = ["JAN","FEB","MARCH","APRIL","MAY","JUNE","JULY","SEPT","OCT","NOV","DEC"];
var monthlocal=d.getMonth();  //returns 0-6 value for sun..sat
today_date.innerHTML= d.getDate()+"  "+month[monthlocal];

 
//function pass as argument of eventlistner
const getInfo= async(event)=>{
    event.preventDefault(); //prevent ? coming to url
    
    let cityVal = cityName.value ;
    if(cityVal==""){
             city_name.innerText= "Please provide city name before search";
             datahide.classList.add("data_hide");        //hide when no input
    }
    else{
       
        //to cartch err
        try{
            //using realtime api from open weather website
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=9b92cfa73be25d8d9f2039dbd3754fc7`;
           
            //we are going to use async/await
            const response= await fetch(url);
            const data=await response.json(); //returning object
            const arrData= [data];            //coverting to array we can avoid and directly access object
           
            //representing data
            city_name.innerText= `${arrData[0].name},${arrData[0].sys.country}`;  //showing city name and country
            temp_real_val.innerText= `${arrData[0].main.temp}` ;   //showing temp value
            const tempMood= arrData[0].weather[0].main ;   //getting cloud status
            
            //condition to check sunny or cloudy
            if(tempMood=="Clear")
            {
               temp_status.innerHTML = '<i class="fa-solid fa-sun" style="color: #eccc68"></i>';
            }
            else if(tempMood=="Clouds")
            {
                temp_status.innerHTML = '<i class="fa-solid fa-cloud" style="color: #f1f2f6"></i>';
            }
            else if(tempMood=="Rain")
            {
                temp_status.innerHTML = '<i class="fa-solid fa-cloud-rain" style="color: #a4b0be"></i>';
            }
            else{
                //we can try for haze also
                temp_status.innerHTML = '<i class="fa-solid fa-sun" style="color: #eccc68"></i>';
            }
            
            datahide.classList.remove("data_hide");  //if all things are fine

        }
        catch{
            city_name.innerText= "Please enter the city name properly";
            datahide.classList.add("data_hide");           //hide when some error
        }
    }
}

submitBtn.addEventListener('click',getInfo);