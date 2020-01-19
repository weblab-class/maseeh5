/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Venue = require("./models/venue");
const FoodItem = require("./models/foodItem");
const Review = require("./models/review");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socket = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socket.addUser(req.user, socket.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

router.get("/user", (req, res) => {
  User.findById(req.query.user_id).then((user) => {
    res.send(user);
  });
});

router.get("/venues", (req, res) => {
  Venue.find({}).then((venues) => {
    Promise.all(venues.map(async (venue) => {
      try {
        venue.rating = await calculateAverageVenueRating(venue._id);
        return venue;
      } catch (err) {
        console.err(err);
      }
    })).then(venues => res.send(venues));
  });
});

router.post("/venue", auth.ensureLoggedIn, (req, res) => {
  const newVenue = new Venue({
    name: req.body.name,
  });

  newVenue.save().then(async (venue) => {
    try {
      venue.rating = await calculateAverageVenueRating(venue._id);
    } catch (err) {
      console.err(err);
    }
    res.send(venue);
  });
});

router.get("/foods", (req, res) => {
  FoodItem.find({venue_id: req.query.venue_id}).then((foods) => {
    Promise.all(foods.map(async (food) => {
      try {
        food.rating = await calculateAverageFoodRating(food._id);
        return food;
      } catch (err) {
        console.err(err);
      }
    })).then(foods => res.send(foods));
  });
});

router.post("/food", auth.ensureLoggedIn, (req, res) => {
  const newFood = new FoodItem({
    venue_id: req.body.venue_id,
    name: req.body.name,
  });

  newFood.save().then(async (food) => {
    try {
      food.rating = await calculateAverageFoodRating(food._id);
    } catch (err) {
      console.err(err);
    }
    res.send(food);
  });
});

router.get("/reviews", (req, res) => {
  Review.find({food_id: req.query.food_id}).then((reviews) => res.send(reviews));
});

router.post("/review", auth.ensureLoggedIn, (req, res) => {
  const newReview = new Review({
    user_id: req.body.user_id,
    food_id: req.body.food_id,
    rating: req.body.rating,
    content: req.body.content,
  });

  newReview.save().then((review) => res.send(review));
});

calculateAverageVenueRating = async (venue_id) => {
  const items = await FoodItem.find({venue_id: venue_id})
  if (tems.length === 0) {
    return undefined;
  }
  let sum = 0;
  let count = 0;
  for (item of items) {
    const rating = await calculateAverageFoodRating(item._id);
    if (rating !== undefined) {
      sum += await calculateAverageFoodRating(item._id);
      count++;
    }
  }
  return sum / items.length;
}

calculateAverageFoodRating = async (food_id) => {
  const reveiews = await Review.find({venue_id: venue_id});
  if (reviews.length === 0) {
    return undefined;
  }
  sum = 0;
  for (review of reviews) {
    sum += review.rating;
  }
  return sum / reviews.length;
}

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
