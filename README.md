# NASA Near Earth Object API

This script uses [NASA's API](https://api.nasa.gov/) <img src="https://api.nasa.gov/assets/img/favicons/favicon-192.png" alt="mongodb logo" width=20>to retrieve all of their data on NOEs (Near Earth Objects) and save it to a [mongoDb Atlas](https://www.npmjs.com/package/mongodb) <img src="https://dbpyje2nswhci.cloudfront.net/images/new_favicon.ico" alt="mongodb logo" width=20> database.  There is no front end UI for this.  It is simply a script to fetch and save the data to a database that can later be connected to by other applications for research and visualization.

NASA limits the requests to 1000 per hour and as of this writing it takes 1425 requests to capture the 28,486 objects currently tracked.  The script uses a 4.5 second delay to keep the requests to no more than 800 per hour.  It's a little slower than it needs to be, but allows you to run some additional requests before or after you run the whole thing if you need to test out the API.

[axios](https://www.npmjs.com/package/axios) <img src="https://axios-http.com//assets/favicon.ico" alt="axios logo" width=15> was used to make to requests to the API.

The rest-client.rest file was used to try out the API and get feel of the data retutned.  It requites the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) <img src="https://humao.gallerycdn.vsassets.io/extensions/humao/rest-client/0.24.6/1638197435436/Microsoft.VisualStudio.Services.Icons.Default" alt="rest-client logo" width=15> VC Code estension to use.