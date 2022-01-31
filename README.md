# NASA Near Earth Object API

This is a script to get all of NSA's NEO data and save it in a [mongoDb](https://www.npmjs.com/package/mongodb) <img src="https://dbpyje2nswhci.cloudfront.net/images/new_favicon.ico" alt="mongodb logo" width=20> database.  There is no front end UI for this.  It's just a script to get and save the data to a database that I can connect to with other apps for research and visualization.

NASA limits the requests to 1000 per hour and as of this writing it takes 1425 requests to capture 28,486 objects.  The script uses a 4.5 second delay to keep the requests to no more than 800 per hour.  It's a little slower than it needs to be, but allows you to run some additional requests before or after you run the whole thing if you need to test out the API.

[axios](https://www.npmjs.com/package/axios) <img src="https://axios-http.com//assets/favicon.ico" alt="axios logo" width=15> was used to make to requests to the API.

The rest-client.rest file was used to try out the API and get feel of the data retutned.  I requites the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) <img src="https://humao.gallerycdn.vsassets.io/extensions/humao/rest-client/0.24.6/1638197435436/Microsoft.VisualStudio.Services.Icons.Default" alt="rest-client logo" width=15> VC Code estension to use.