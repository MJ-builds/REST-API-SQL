"use strict";

const auth = require("basic-auth");
//import the User model
const { User } = require('../models');

// Middleware to authenticate the request using Basic Auth.
exports.authenticateUser = async (req, res, next) => {
  const credentials = auth(req);
//if the user's credentials are available:  
    if(credentials) {
        const user = await User.findOne({ where: { emailAddress: credentials.name } });
    }

  next();
};
