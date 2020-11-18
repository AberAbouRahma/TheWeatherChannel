/*
Project: Weather Journal
server.js by Aber Abou-Rahma(AA)
11/17/2020

Reviewed on 11/18/2018 per project review's comments as following:
1) Declared the server variable using const rather than let
2) Deleted unnecessary console log statement in app.get route function.
3) In app.post function replaced res.sendStatus(200); with res.send({msg:"Post received"}); instead

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

const port = 4000;

const server = app.listen(port,  ()=>    console.log (`server started at port number : ${port}`));


// AA: Get route on the server setup 
app.get('/getWeatherData', (req, res) => {
    res.send(projectData);
});

// AA: Post route on the server setup
app.post('/addWeatherData', add);
function add (req, res){
    
    projectData = req.body;

    console.log("Temperature = " + projectData.temperature);
    console.log("Date = " + projectData.date);
    console.log("User Response = " + projectData["user response"]);
    res.send({msg:"Post received"});
 }




