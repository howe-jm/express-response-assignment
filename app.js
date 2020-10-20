const express = require('express');
const morgan = require('morgan');
const apps = require('./apps-data.js');

const app = express();
app.use(morgan('dev'));

app.get('/app', (req, res) => {
  let appsData = [...apps];
  let { genre, sort } = req.query;

  if (genre) {
    appsData = appsData.filter((obj) =>
      obj.Genres.toLowerCase().includes(genre.toLowerCase())
    );
    if (appsData.length === 0) {
      return res
        .status(200)
        .json({ messasge: 'No results found!' });
    }
  }

  if (sort && sort !== 'Rating' && sort !== 'App') {
    return res
      .status(400)
      .json({ message: 'Must enter App or Rating!' });
  }

  if (sort) {
    appsData = appsData.sort((a, b) =>
      typeof a[sort] === 'string'
        ? a[sort].toLowerCase() > b[sort].toLowerCase()
          ? 1
          : a[sort].toLowerCase() < b[sort].toLowerCase()
          ? -1
          : 0
        : a[sort] < b[sort]
        ? 1
        : a[sort] > b[sort]
        ? -1
        : 0
    );
  }

  res.status(200).send(appsData);
});

app.listen(8000, () => {
  console.log('Server is listening on port 8000!');
});
