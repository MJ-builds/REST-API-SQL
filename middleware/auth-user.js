"use strict";

const auth = require("basic-auth");
const bcrypt = require("bcrypt");
//import the User model
const { User } = require("../models");

// Middleware to authenticate the request using Basic Auth.
exports.authenticateUser = async (req, res, next) => {
  const credentials = auth(req);
  //if the user's credentials are available:
  if (credentials) {
    const user = await User.findOne({
      where: { emailAddress: credentials.name },
    });
    //if the user is found in the database:
    if (user) {
      const authenticated = bcrypt.compareSync(credentials.pass, user.password);
      //if the passwords match:
      if (authenticated) {
        console.log(`Authentication successful for username: ${user.username}`);

        // Store the user on the Request object.
        req.currentUser = user;
      }
    }
  }

  next();
};
