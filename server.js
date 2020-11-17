/*
Project: Weather Journal
server.js by Aber Abou-Rahma(AA)
11/17/2020

*/ 

/* Empty JS object to act as endpoint for all routes */
projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { request } = require('http');
app.use(cors());

/* Initializing the main project folder */
app.use(express.static('./website'));

const port = 3000;

var server = app.listen(port,  ()=>    console.log (`server started at port number : ${port}`));


// AA: Get route on the server setup 
app.get('/getWeatherData', (req, res) => {
    res.send(projectData);
    console.log(res.body);
});

// AA: Post route on the server setup
app.post('/addWeatherData', add);
function add (req, res){
    
    projectData = req.body;

    console.log("Temperature = " + projectData.temperature);
    console.log("Date = " + projectData.date);
    console.log("User Response = " + projectData["user response"]);
    
   res.sendStatus(200);
 }




