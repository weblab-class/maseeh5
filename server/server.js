/*
|--------------------------------------------------------------------------
| server.js -- The core of your server
|--------------------------------------------------------------------------
|
| This file defines how your server starts up. Think of it as the main() of your server.
| At a high level, this file does the following things:
| - Connect to the database
| - Sets up server middleware (i.e. addons that enable things like json parsing, user login)
| - Hooks up all the backend routes specified in api.js
| - Fowards frontend routes that should be handled by the React router
| - Sets up error handling in case something goes wrong when handling a request
| - Actually starts the webserver
*/

// dotenv module used to hide secrets
require("dotenv").config();

// validator runs some basic checks to make sure you've set everything up correctly
// this is a tool provided by staff, so you don't need to worry about it
const validator = require("./validator");
validator.checkSetup();

//import libraries needed for the webserver to work!
const http = require("http");
const express = require("express"); // backend framework for our node server.
const session = require("express-session"); // library that stores info about each connected user
const mongoose = require("mongoose"); // library to connect to MongoDB
const path = require("path"); // provide utilities for working with file and directory paths
const request = require("request-promise-native"); // provide fetch functionality to the server for web-scraping
const cheerio = require("cheerio"); // provide DOM parsing functionality to the server for web-scraping
const fs = require("fs");

const api = require("./api");
const auth = require("./auth");
const Meal = require("./models/meal");
const Venue = require("./models/venue");
const FoodItem = require("./models/foodItem");

// socket stuff
const socket = require("./server-socket");

// Server configuration below
// TODO change connection URL after setting up your team database
const mongoConnectionURL = process.env.ATLAS_SRV;
// TODO change database name to the name you chose
const databaseName = "foodforthought";

// connect to mongodb
mongoose
  .connect(mongoConnectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: databaseName,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));

// create a new express server
const app = express();
app.use(validator.checkRoutes);

// allow us to process POST requests
app.use(express.json());

// set up a session, which will persist login data across requests
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// this checks if the user is logged in, and populates "req.user"
app.use(auth.populateCurrentUser);

// connect user-defined routes
app.use("/api", api);

// load the compiled react files, which will serve /index.html and /bundle.js
const reactPath = path.resolve(__dirname, "..", "client", "dist");
app.use(express.static(reactPath));

// for all other routes, render index.html and let react router handle it
app.get("*", (req, res) => {
  res.sendFile(path.join(reactPath, "index.html"));
});

// any server errors cause this function to run
app.use((err, req, res, next) => {
  const status = err.status || 500;
  if (status === 500) {
    // 500 means Internal Server Error
    console.log("The server errored when processing a request!");
    console.log(err);
  }

  res.status(status);
  res.send({
    status: status,
    message: err.message,
  });
});

const port = process.env.PORT || 3000;
const server = http.Server(app);
socket.init(server);

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

const BASE_URL = "https://mit.cafebonappetit.com";

const scrapeMeal = async () => {
  // TODO: extract current meal from cafebonappetit website.
  const currentMeal = "dinner";

  let result = false;
  const oldMeal = await Meal.findOne({ active: true });
  if (oldMeal.internal_name !== currentMeal) {
    oldMeal.active = false;
    await oldMeal.save();
    const newMeal = await Meal.findOne({ internal_name: currentMeal });
    newMeal.active = true;
    await newMeal.save();
    result = true;
  }

  const now = new Date();
  console.log(`updated meal at ${now.toLocaleTimeString()}`);
  return result;
};

const scrapeMenu = async () => {
  const meal = (await Meal.findOne({ active: true })).internal_name;
  const venues = await Venue.find({});
  for (venue of venues) {
    const foods = await FoodItem.find({ venue: venue._id });
    for (food of foods) {
      food.active = false;
      await food.save();
    }
    const options = {
      uri: `${BASE_URL}/cafe/${venue.internal_name}/2020-02-03/`,
      transform: (body) => cheerio.load(body),
    };
    const $ = await request(options);
    const section = $(`section#${meal}`);
    const active = $("div.c-tab__content--active", section);
    const items = $("button.site-panel__daypart-item-title", active);
    for (item of Object.values(items).slice(0, -4)) {
      name = $(item)
        .text()
        .trim();
      const existingFood = await FoodItem.findOne({ venue: venue._id, name: name });
      if (existingFood) {
        existingFood.active = true;
        existingFood.save();
      } else {
        const newFood = new FoodItem({ venue: venue._id, name: name });
        newFood.save();
      }
    }
  }
  const now = new Date();
  console.log(`updated menu at ${now.toLocaleTimeString()} (${meal})`);
};

setInterval(async () => {
  const changed = await scrapeMeal();
  if (changed) {
    await scrapeMenu();
  }
}, 1000 * 60); // Scrape the website every minute.
