"use strict";

const express = require("express");
const router = express.Router();

const { User, Course } = require("./models");

const {authenticateUser}  = require("./middleware/auth-user");

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

router.get("/users",authenticateUser,asyncHandler(async (req, res) => {
    const user = req.currentUser;
    res.status(200)
    .json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress
    });
}));

module.exports = router;
