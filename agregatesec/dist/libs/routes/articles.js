'use strict';

var express = require('express');
var passport = require('passport');
var router = express.Router();
var libs = process.cwd() + '/libs/';
var agregateController = require(libs + 'controller/agregateController');

router.get('/auth', agregateController.authMethod);

router.post('/login', agregateController.loginGetCode);

router.get('/', passport.authenticate('bearer', { session: false }), agregateController.index);

/* BEGIN. "Users Service" */

// Get all users
router.get('/users', passport.authenticate('bearer', { session: false }), agregateController.getAllUsers);

// Get a specific user
router.get('/users/:id', agregateController.getSpecificUser);

// Create new user
router.post('/users', passport.authenticate('bearer', { session: false }), agregateController.createNewUser);

// Update a specific user
router.put('/users/:id', passport.authenticate('bearer', { session: false }), agregateController.updateUser);

// Delete a specific user
router['delete']('/users/:id', passport.authenticate('bearer', { session: false }), agregateController.deleteUser);

/* END. "Users Service" */

/* BEGIN. "Content Service" */

// Get all contents
router.get('/contents', agregateController.getAllContents);

// Get a specific content
router.get('/contents/:id', agregateController.getSpecificContent);

// Create new content
router.post('/contents', passport.authenticate('bearer', { session: false }), agregateController.createNewContent);

// Update a specific content
router.put('/contents/:id', passport.authenticate('bearer', { session: false }), agregateController.updateContent);

// Delete a specific content
router['delete']('/contents/:id', passport.authenticate('bearer', { session: false }), agregateController.deleteContent);

/* END. "Content Service" */

/* BEGIN. "Playlist Service" */

// Get all playlists
router.get('/playlists', agregateController.getAllPlaylists);

// Get a specific playlist
router.get('/playlists/:id', agregateController.getSpecificPlaylist);

// Create new playlist
router.post('/playlists', passport.authenticate('bearer', { session: false }), agregateController.createNewPlaylist);

// Update a specific playlist
router.put('/playlists/:id', passport.authenticate('bearer', { session: false }), agregateController.updatePlaylist);

// Delete a specific playlist
router['delete']('/playlists/:id', passport.authenticate('bearer', { session: false }), agregateController.deletePlaylist);

/* END. "Playlist Service" */

module.exports = router;
//# sourceMappingURL=articles.js.map