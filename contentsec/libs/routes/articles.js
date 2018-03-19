var express = require('express');
var passport = require('passport');
var router = express.Router();
var libs = process.cwd() + '/libs/';

const contentController = require(libs + 'controller/contentController');

/* BEGIN. "Content Service" */

// Get all contents
router.get('/contents', contentController.getAllContents);

// Get a specific content
router.get('/contents/:id', contentController.getSpecificContent);

// Create new content
router.post('/contents', passport.authenticate('bearer', { session: false }), contentController.createNewContent);

// Update a specific content
router.put('/contents/:id', passport.authenticate('bearer', { session: false }), contentController.updateContent);

// Delete a specific content
router.delete('/contents/:id', passport.authenticate('bearer', { session: false }), contentController.deleteContent);

/* END. "Content Service" */

module.exports = router;
