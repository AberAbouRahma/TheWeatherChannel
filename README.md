# TheWeatherChannel
The Weather Channel Project of the Web Development Professional Nanodegree Program
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
