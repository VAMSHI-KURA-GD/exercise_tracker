const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');
const validateExercise = require('../middleware/validateExercise');

// Add exercise for a user
router.post('/users/:_id/exercises', validateExercise, exerciseController.addExercise);

// Get exercises for a user (with optional filters)
router.get('/users/:_id/exercises', exerciseController.getUserExercises);

module.exports = router; 