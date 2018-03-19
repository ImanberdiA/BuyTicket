'use strict';

var express = require('express');
var passport = require('passport');
var router = express.Router();
var libs = process.cwd() + '/libs/';
var userController = require(libs + 'controller/userController');

/* BEGIN. "Playlist Service" */

// Get all playlists
router.get('/users', userController.getAllUsers);

// Get a specific playlist
router.get('/users/:id', passport.authenticate('bearer', { session: false }), userController.getSpecificUser);

// Create new playlist
router.post('/users', passport.authenticate('bearer', { session: false }), userController.createNewUser);

// Update a specific playlist
router.put('/users/:id', passport.authenticate('bearer', { session: false }), userController.updateUser);

// Delete a specific playlist
router['delete']('/users/:id', passport.authenticate('bearer', { session: false }), userController.deleteUser);

/* END. "Playlist Service" */

module.exports = router;
//# sourceMappingURL=articles.js.map