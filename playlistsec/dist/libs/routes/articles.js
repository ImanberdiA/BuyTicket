'use strict';

var express = require('express');
var passport = require('passport');
var router = express.Router();

var libs = process.cwd() + '/libs/';
var log = require(libs + 'log')(module);

var db = require(libs + 'db/mongoose');
var Article = require(libs + 'model/article');

var playlistController = require(libs + 'controller/playlistController');

/* BEGIN. "Playlist Service" */

// Get all playlists
router.get('/playlists', passport.authenticate('bearer', { session: false }), playlistController.getAllPlaylists);

// Get a specific playlist
router.get('/playlists/:id', passport.authenticate('bearer', { session: false }), playlistController.getSpecificPlaylist);

// Create new playlist
router.post('/playlists', passport.authenticate('bearer', { session: false }), playlistController.createNewPlaylist);

// Update a specific playlist
router.put('/playlists/:id', passport.authenticate('bearer', { session: false }), playlistController.updatePlaylist);

// Delete a specific playlist
router['delete']('/playlists/:id', passport.authenticate('bearer', { session: false }), playlistController.deletePlaylist);

/* END. "Playlist Service" */

module.exports = router;
//# sourceMappingURL=articles.js.map