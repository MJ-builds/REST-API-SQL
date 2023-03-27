"use strict";

const express = require("express");
const router = express.Router();

const { User, Course } = require("./models");

// // Get references to our models.
// const { User, Course } = models;

// Handler function to wrap each route. Reused from previous Treehouse project.
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

router.get("/users",asyncHandler(async (req, res) => {
    const users = await User.findAll();
    res.json(users);
}));

module.exports = router;
