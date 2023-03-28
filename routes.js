"use strict";

const express = require("express");
const router = express.Router();

const { User, Course } = require("./models");

const { authenticateUser } = require("./middleware/auth-user");

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

//GET - return the currently authenticated user
router.get("/users", authenticateUser, asyncHandler(async (req, res) => {
    const user = req.currentUser;
    res.status(200).json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress,
    });
  })
);

//POST - create users
router.post("/users",asyncHandler(async (req, res) => {
    try {
      // Create a new user using the extracted data
      await User.create(req.body);
      res.location("/");
      // Return 201 status/no content
      res.status(201).end();
    } catch (error) {
      if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

//GET courses
router.get("/courses", asyncHandler(async (req, res) => {
    const courses = await Course.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.json(courses);
    }));

module.exports = router;
