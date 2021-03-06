const jwt = require('jsonwebtoken');
const config = require('config');
const express = require('express');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied: no token provided.')

  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decoded; // si tout est bon, ajout du payload dans le current user
    req.userId = decoded._id;
    next();
  } catch (ex) {
    res.status(400).send('invalid token');
  }
};
