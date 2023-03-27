"use strict";

const auth = require("basic-auth");
const bcrypt = require("bcrypt");
//import the User model
const { User } = require("../models");

// Middleware to authenticate the request using Basic Auth.
exports.authenticateUser = async (req, res, next) => {
  let message; // store the message to display

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
        console.log(`Authentication successful for username: ${user.emailAddress}`);
        /* req.currentUser = adding a property named currentUser to the 
        request object and setting it to the authenticated user, ie: 
        store the user on the Request object. */
        req.currentUser = user;
      } else {
        message = `Authentication failure for username: ${user.username}`;
      }
    } else {
      message = `User not found for username: ${credentials.name}`;
    }
  } else {
    message = "Auth header not found";
  }

  //if message is truthy, return a response with a 401 HTTP status code, else call next()
  if (message) {
    console.warn(message);
    res.status(401).json({ message: 'Access Denied' });
  } else {
    next();
  }

};
