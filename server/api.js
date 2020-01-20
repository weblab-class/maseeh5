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
  Venue.find({}).then((venues) => Promise.all(venues.map(appendVenueRating)).then(venues => res.send(venues)));
});

router.post("/venue", auth.ensureLoggedIn, (req, res) => {
  const newVenue = new Venue({
    name: req.body.name,
  });

  newVenue.save().then(appendVenueRating).then((venue) => res.send(venue));
});

router.get("/foods", (req, res) => {
  FoodItem.find({venue: req.query.venue_id}).populate('venue').then((foods) => Promise.all(foods.map(appendFoodRating)).then((foods) => res.send(foods)));
});

router.post("/food", auth.ensureLoggedIn, (req, res) => {
  const newFood = new FoodItem({
    venue: req.body.venue_id,
    name: req.body.name,
  });

  newFood.save().then((food) => FoodItem.findById(food._id).populate('venue').then((food) => appendFoodRating(food)).then((food) => res.send(food)));
});

router.get("/reviews", (req, res) => {
  const query = {};
  if (req.query.creator_id) {
    query.creator = req.query.creator_id;
  }
  if (req.query.food_id) {
    query.food = req.query.food_id;
  }
  Review.find(query).populate('creator').populate('food').populate('venue').then((reviews) => res.send(reviews));
});

router.post("/review", auth.ensureLoggedIn, (req, res) => {
  const newReview = new Review({
    creator: req.user._id,
    food: req.body.food_id,
    rating: req.body.rating,
    content: req.body.content,
  });

  newReview.save().then((review) => Review.findById(review._id).populate('creator').populate('food').populate('venue').then((review) => res.send(review)));
});

appendVenueRating = async (venue) => {
  try {
    venue.rating = await calculateAverageVenueRating(venue._id);
    console.log(venue.rating);
    console.log(venue); // BUG: this is somehow broken
    return venue;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

appendFoodRating = async (food) => {
  try {
    food.rating = await calculateAverageFoodRating(food._id);
    console.log(food.rating);
    console.log(food); // BUG: this is somehow broken
    return food;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

calculateAverageVenueRating = async (venue) => {
  const items = await FoodItem.find({venue: venue})
  if (items.length === 0) {
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

calculateAverageFoodRating = async (food) => {
  const reviews = await Review.find({food: food});
  if (reviews.length === 0) {
    return undefined;
  }
  console.log(reviews);
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
