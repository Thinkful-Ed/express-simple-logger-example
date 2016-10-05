'use strict';

const redirectsMap = require('./redirects.json');

const express = require('express');
const app = express();


// this function is a closure -- a function that returns a 
// function with variables set inside of it. in this case,
// our closure returns a function for handling redirect logic,
// with `redirectMaps` pointing to the value sent in to `makeRedirectMiddleware`
const makeRedirectMiddleware = (redirectsMap) => (req, res, next) => {
  if (Object.keys(redirectsMap).find((entry) => entry === req.path)) {
    console.log(`Redirecting ${req.path} to ${redirectsMap[req.path]}`);
    res.redirect(301, redirectsMap[req.path]);
  }
  next();
};

app.use(makeRedirectMiddleware(redirectsMap));

app.get("/", (req, res) => res.sendFile(`${__dirname}/views/index.html` ));
app.get("/new-url-1", (req, res) => res.send("new-url-1"));
app.get("/new-url-2", (req, res) => res.send("new-url-1"));



const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});