const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Load Idea Model
require('../models/Idea');
const Idea = mongoose.model('ideas');


// Login
router.get('/login', (req, res) => {
    res.send('login');
  });
  
// Delete Idea
router.get('/register', (req, res) => {
    res.send('register');
});

module.exports = router;