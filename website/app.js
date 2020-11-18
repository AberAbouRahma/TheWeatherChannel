
/*
Project: Weather Journal
app.js by Aber Abou-Rahma(AA)
11/17/2020

Reviewed on 11/18/2018 per project review's comments as following:
1) Declared the baseURL, and apiKey variables using const rather than let
2) Added the token &units=imperial to the end of the apiKey to request the unit conversion
to Fahrenheit.
3) Used res.json() rather than res.text()
4) Defined UpdateUI() function to request all data (projectData Object) from the server to append data to DOM and display on the UI dynamically.
5) In updateUI() added the temperature unit "Fahrenheit" to display to user.
6) In updateUI(), modified the code to display only the day part of the date
${allData.date.split(" ")[0]} in the DOM
*/ 

// AA: baseURL to query by zip code
const baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip=';
// AA: API Key for the weather channel API account
const apiKey = '&appid=84284a6461af20a4be33d90f4185528a&units=imperial';
// AA: Missing input flag for robust input. I.e., to force the user enter zip code and weather feelings
// case he/she forgot either input
let inputEntered = false;
//AA: FeelingsData and zipCode
var feelingsData, zipCode;

// AA: Client post data
const postData = async ( url = '', data = {})=>{
    console.log(data);
      const res = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

      try {
        const newData = await res.json();
        console.log(newData);
        return newData;
      }catch(error) {
        console.log("error*", error );
        resetFormData();
      }
  }


// AA: Define the getData action event handler
function performAction(event)
{
  //inputEntered = false;
  while(!inputEntered)// AA: While no input
  {
    // AA: Feelings data
    feelingsData = document.getElementById("feelings").value;
    // AA: Zip Code
    zipCode =  document.getElementById("zip").value;
    // AA: Check that the user data is entered
    if (feelingsData != undefined && feelingsData != "" && zipCode != undefined  && zipCode != "")
    {
      inputEntered = true; // Exit the loop and fetch the data
      break;
    }
    // AA: IF we reached the following LOC, then either the zipCode, feelings, or both input are missing
    // Display alert for the user.
    alert("One or more input are missing!");
    return;
  }
  // AA:// To allow for more generate quires
  inputEntered = false;
  
  getWeatherData(baseURL,zipCode, apiKey)
  .then(function(data){
    console.log(data);
    // AA: Add the data to post request to the server
    postData('/addWeatherData', {temperature:data.list[0].main.temp,date:data.list[0].dt_txt ,'user response':feelingsData})
    // AA: Get All the data from the server to update the DOM and the UI
    .then(updateUI());
  });
};

// AA: Request all data (projectData Object) from the server to display in the UI,
// then append data to DOM dynamically
const updateUI = async () => {
  const request = await fetch('/getWeatherData');
  try{
    const allData = await request.json();
    document.getElementById ('date').innerHTML = `<b style="color:blue;">Date:</b> ${allData.date.split(" ")[0]}`;
    document.getElementById ('temp').innerHTML = `<b style="color:blue;">Temperature:</b> ${allData.temperature} Fahrenheit`;
    document.getElementById ('content').innerHTML = `<b style="color:blue;">Feelings:</b> ${allData["user response"]}`;

  }catch(error){
    console.log("error", error);
  }
}
// AA: Getting the weather data from the UI
const getWeatherData = async (baseURL, zipCode, key)=>{

  const res = await fetch(baseURL+zipCode+key)
  try {

    const data = await res.json();
    console.log(data.list[0].dt_txt);
    console.log(data.list[0].main.temp);
    return data;
  }  catch(error) {
    console.log("error**", error);
    // appropriately handle the error
    alert ("Not found 404: No city exists with the entered zip code");
    resetFormData();
  }
}

// AA: Reset Data button action
function resetFormData(event)
{
    document.getElementById("feelings").value = "";
    document.getElementById("zip").value = "";
    document.getElementById ('date').innerHTML = "";
    document.getElementById ('temp').innerHTML = "";
    document.getElementById ('content').innerHTML ="";
}
// AA: Wait until the document contents laoded event fires
document.addEventListener("DOMContentLoaded", function (event) {
    // Add event Listener to the generate button
    var goButton = document.getElementById("generate");
    goButton.addEventListener("click", performAction);

    // Add reset button Listener 
    var resetButton = document.getElementById("reset");
    resetButton.addEventListener("click", resetFormData);      
});