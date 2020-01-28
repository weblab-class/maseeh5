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
  Venue.find({}).then((venues) =>
    Promise.all(venues.map(appendVenueRating)).then((venues) => res.send(venues))
  );
});

router.post("/venue", auth.ensureLoggedIn, (req, res) => {
  const newVenue = new Venue({
    name: req.body.name,
  });

  newVenue
    .save()
    .then(appendVenueRating)
    .then((venue) => res.send(venue));
});

router.get("/foods", (req, res) => {
  const query = { venue: req.query.venue_id };
  if (req.query.search) {
    query.$text = { $search: req.query.search };
  }
  const sort = req.query.sort_by === "name" ? { name: 1 } : {};
  FoodItem.find(query)
    .sort(sort)
    .populate("venue")
    .then((foods) =>
      Promise.all(foods.map(appendFoodRating)).then((foods) => {
        if (req.query.min_rating > 0) {
          foods = foods.filter((food) => food.rating >= req.query.min_rating);
        }
        if (req.query.sort_by === "rating") {
          foods.sort((food1, food2) => food2.rating - food1.rating);
        }
        res.send(foods);
      })
    );
});

router.post("/food", auth.ensureLoggedIn, (req, res) => {
  const newFood = new FoodItem({
    venue: req.body.venue_id,
    name: req.body.name,
  });

  newFood.save().then((food) =>
    FoodItem.findById(food._id)
      .populate("venue")
      .then((food) => appendFoodRating(food))
      .then((food) => res.send(food))
  );
});

router.get("/food_rating", (req, res) => {
  FoodItem.findById(req.query.id)
    .then((food) => appendFoodRating(food))
    .then((food) => res.send({ rating: food.rating }));
});

router.get("/reviews", (req, res) => {
  const query = {};
  if (req.query.creator_id) {
    query.creator = req.query.creator_id;
  }
  if (req.query.food_id) {
    query.food = req.query.food_id;
  }
  if (req.query.search) {
    query.$text = { $search: req.query.search };
  }
  const sort = !req.query.sort_by || req.query.sort_by === "date" ? { timestamp: -1 } : {};
  Review.find(query)
    .sort(sort)
    .populate("creator")
    .populate({
      path: "food",
      options: req.query.sort_by === "food" ? { sort: { name: 1 } } : {},
      populate: {
        path: "venue",
        options: req.query.sort_by === "venue" ? { sort: { name: 1 } } : {},
      },
    })
    .then((reviews) => {
      if (req.query.min_rating > 0) {
        reviews = reviews.filter((review) => review.rating >= req.query.min_rating);
      }
      if (req.query.sort_by === "rating") {
        reviews.sort((review1, review2) => review2.rating - review1.rating);
      }
      res.send(reviews);
    });
});

router.post("/review", auth.ensureLoggedIn, (req, res) => {
  const newReview = new Review({
    creator: req.user._id,
    food: req.body.food_id,
    rating: req.body.rating,
    content: req.body.content,
  });

  newReview.save().then((review) =>
    Review.findById(review._id)
      .populate("creator")
      .populate({ path: "food", populate: { path: "venue" } })
      .then((review) => {
        socket.getIo().emit("review", review);
        res.send(review);
      })
  );
});

appendVenueRating = async (venue) => {
  try {
    return {
      _id: venue._id,
      name: venue.name,
      rating: Math.round(await calculateAverageVenueRating(venue._id)),
    };
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

appendFoodRating = async (food) => {
  try {
    return {
      _id: food._id,
      venue: food.venue,
      name: food.name,
      rating: Math.round(await calculateAverageFoodRating(food._id)),
    };
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

calculateAverageVenueRating = async (venue) => {
  const items = await FoodItem.find({ venue: venue });
  let sum = 0;
  let count = 0;
  for (item of items) {
    const rating = await calculateAverageFoodRating(item._id);
    if (rating !== undefined) {
      sum += rating;
      count++;
    }
  }
  if (count === 0) {
    return undefined;
  }
  return sum / count;
};

calculateAverageFoodRating = async (food) => {
  const reviews = await Review.find({ food: food });
  if (reviews.length === 0) {
    return undefined;
  }
  sum = 0;
  for (review of reviews) {
    sum += review.rating;
  }
  return sum / reviews.length;
};

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
