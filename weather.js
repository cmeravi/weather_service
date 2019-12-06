function checkVisible(){
  //only show when data is available
  const dataTable = document.getElementById("data_table");
  let cityName = document.getElementById("city_name").innerHTML;

  // check if city value returned
  if (cityName != ""){
    //display when city value is there
    dataTable.setAttribute("style", "display: inline-block");
  } else {
    //hide when city value is absenst
    dataTable.setAttribute("style", "display: none");
  }
}

function resetZip(){
  document.getElementById("zip").value = "";
  resetDataValues();
  checkVisible()
}

function resetDataValues(){
  document.getElementById("city_name").innerHTML = "";
  document.getElementById("date_time").innerHTML = "";
  document.getElementById("temp").innerHTML = "";
  document.getElementById("pressure").innerHTML = "";
}

function getCurrentTime(){
  // Initialize date/time variables
  let currentTime = new Date();
  let month = currentTime.getMonth();
  let day = currentTime.getDate();
  let year = currentTime.getFullYear();
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  let timeSuffex = "AM";
  let timeDisplayed = "";

  // Set hours for AM/PM
  if (hours === 0){
    hours = 12;
  } else if (hours > 12){
    hours -= 12;
    timeSuffex = "PM";
  } else if (hours === 12){
    timeSuffex = "PM";
  }

  // format date/time string
  timeDisplayed = `${month}/${day}/${year} ${hours}:${minutes} ${timeSuffex}`;

  // set date/time string to html element
 document.getElementById("date_time").innerHTML = timeDisplayed;

 // re-run method to update current date/time
 setTimeout(getCurrentTime, 1000);
}


function getWeather(){
  const regEx = /^\d{5}$|^\d{5}-\d{4}$/;
  let zip = document.getElementById("zip").value;

  if (!regEx.test(zip)){
    alert("Please enter a valid US Zip Code.");
    return false;
  }

  zip = zip.split("-")[0]

  if ("" == zip){
    resetDataValues();
    return false;
  }

  const appID = '350432d86e0c04a64168f454063498c6';
  const url = `https://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&APPID=${appID}`;

  $.getJSON(url, function(data){
    return data;
  }).then(function (data){
    let weatherData = data['list'][0];
    let city = data['city']['name'];
    // Convert temp to fahrenheit
    let temp = ((weatherData['main']['temp']-273.15)*1.8)+32;
    document.getElementById("temp").innerHTML = `${temp}&deg;`;
    document.getElementById("pressure").innerHTML = `${weatherData['main']['pressure']} hPa`;
    document.getElementById("city_name").innerHTML = city;
    return data;
  }).then(function(data){
    getCurrentTime();
    checkVisible();
  }).catch(err => {
      alert("Please enter a valid US Zip Code.")
  });

}
