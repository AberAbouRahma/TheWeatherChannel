# TheWeatherChannel
The Weather Channel Project of the Web Development Professional Nanodegree Program.
This projects uses node.js, express, body-barser, and cors.
It demonstrates the asynchronous java script programming concepts and utilizes 
promises, chaining as it fetches the target API for the OpenWeatherMap.org
to obtain the current temperature for user requested city by its zip code

After getting the required data from the api the client code logs the data and posts
it to the node server to populate the target end point projectData object while 
displaying the obtained results in the client HTML page.

The client HTML page uses basic inline css styling (not stand alone css style file)

Addition the requirements:
- Added basic check for user input to make sure that no empty field(s) is/are submitted
and if so I utilized alert message
- Added a reset button for user convenience
- Added basic inline styling as mentioned above
- Added alerts for 404 page not found error's in case the user enetred non-existing zip codes
after catching related OpenWeatherMap.org API errors.


Note that: I did not upload the node_modules to the repository which includes all the project dependencies

Challenges: Minor challenge. That is minor error, when using res.json()
        did not affect the functionality except for alarming-annoying error console log message
        "error SyntaxError: Unexpected token O in JSON at position 0"
        used res.text() instead of res.json() and the error is gone until further research in progress



Reviewed app.js on 11/18/2018 per project review's comments as following:
1) Declared the baseURL, and apiKey variables using const rather than let
2) Added the token &units=imperial to the end of the apiKey to request the unit conversion
to Fahrenheit.
3) Used res.json() rather than res.text()
4) Defined UpdateUI() function to request all data (projectData Object) from the server to append data to DOM and display on the UI dynamically.
5) In updateUI() added the temperature unit "Fahrenheit" to display to user.
6) In updateUI(), modified the code to display only the day part of the date
${allData.date.split(" ")[0]} in the DOM


Reviewed server.js on 11/18/2018 per project review's comments as following:
1) Declared the server variable using const rather than let
2) Deleted unnecessary console log statement in app.get route function.
3) In app.post function replaced res.sendStatus(200); with res.send({msg:"Post received"}); instead
