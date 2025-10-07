const exerciseModel = require('../models/exerciseModel');
const { STATUS_CODES } = require('../constants');

exports.addExercise = async (req, res, next) => {
  try {
    // Use pre-validated data from middleware
    const exerciseData = req.validatedExercise;
    
    // No validation needed - just business logic
    const userExercise = await exerciseModel.createExercise(exerciseData);
    res.status(STATUS_CODES.CREATED).json(userExercise);
  } catch (error) {
    console.error("Exercise creation error:", error);
    next(error);
  }
};

exports.getUserExercises = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const { from, to, limit } = req.query;
    
    // Get exercises using model
    const userExercises = await exerciseModel.getExercisesByUserId(_id, { 
      from, 
      to, 
      limit 
    });
    
    res.status(STATUS_CODES.OK).json(userExercises);
  } catch (error) {
    console.error("Exercise retrieval error:", error);
    next(error);
  }
};
