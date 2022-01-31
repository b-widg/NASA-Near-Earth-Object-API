const axios = require('axios').default;
const { MongoClient } = require('mongodb');
require('dotenv').config();

const wait = async (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const fetchNeos = async (page) => {
  let totalPages;
  let pageNumber;
  let nearEarthObjects = {};

  const url = 'http://www.neowsapp.com/rest/v1/neo/browse';
  const size = 20; // 20 is max allowed
  const api_key = process.env.API_KEY;

  const params = {
    page,
    size,
    api_key,
  };

  await axios
    .get(url, { params })
    .then((response) => {
      console.log(response.data.page);
      totalPages = response.data.page.total_pages;
      pageNumber = response.data.page.number;
      nearEarthObjects = response.data.near_earth_objects;
    })
    .catch((error) => console.log(error))
    .then(() => {});
  return { totalPages, pageNumber, nearEarthObjects };
};

const submitPageData = async (nearEarthObjects) => {
  const mongoCollection = process.env.MONGO_COLLECTION;
  const database = process.env.MONGO_DATABASE;
  const uri = process.env.MONGO_URI;

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const result = await client
      .db(database)
      .collection(mongoCollection)
      .insertMany(nearEarthObjects);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
};

(async () => {
  page = 0;
  const main = async () => {
    const { totalPages, pageNumber, nearEarthObjects } = await fetchNeos(page);
    if (pageNumber < totalPages) {
      submitPageData(nearEarthObjects);
      page = pageNumber + 1;
      // NASA rate limit is 1000/hr.  A 4 sec delay will send 900/hr, 4.5 sec = 800/hr
      // https://api.nasa.gov/#:~:text=Hourly%20Limit%3A%2030%20requests%20per,per%20IP%20address%20per%20day
      await wait(4500);
      main();
    }
  };
  main();
})();
