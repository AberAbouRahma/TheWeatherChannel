
/*
Project: Weather Journal
app.js by Aber Abou-Rahma(AA)
11/17/2020

*/ 

// AA: baseURL to query by zip code
let baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip=';
// AA: API Key for the weather channel API account
let apiKey = '&appid=4cf6e168caa8211224931c70f411defa';
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
        // Encountered minor error, when using res.json()
        // did not affect the functionality but annoying error consol log message
        // "error SyntaxError: Unexpected token O in JSON at position 0"
        // used res.text instead untill further research
        const newData = await res.text();
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
    postData('/addWeatherData', {temperature:data.list[0].main.temp,date:data.list[0].dt_txt ,'user response':feelingsData});

    // AA: Append data to DOM dynamically
    document.getElementById ('date').innerHTML = `<b style="color:blue;">Date:</b> ${data.list[0].dt_txt}`;
    document.getElementById ('temp').innerHTML = `<b style="color:blue;">Temperature:</b> ${data.list[0].main.temp}`;
    document.getElementById ('content').innerHTML = `<b style="color:blue;">Feelings:</b> ${feelingsData}`;
  });
};

//
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