const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Load Idea Model
require('../models/Idea');
const Idea = mongoose.model('ideas');


// Login
router.get('/login', (req, res) => {
    res.render('users/login');
  });
  
// Delete Idea
router.get('/register', (req, res) => {
    res.render('users/register');
});

// Register Form
router.post('/register', (req, res) => {
    let errors = [];

    if (req.body.password != req.body.passwordConfirm) {
        errors.push({text: 'Passwords do not match'});
    }

    if (req.body.password.length < 4) {
        errors.push({text: 'Password must be at least 4 characters'});
    }

    if (errors.length > 0) {
        res.render('users/register', {
            errors: errors,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm
        });
    } else {
        res.send('passed');
    }
});

module.exports = router;