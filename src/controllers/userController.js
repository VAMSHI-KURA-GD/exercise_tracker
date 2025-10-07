const userModel = require('../models/userModel');
const { STATUS_CODES } = require('../constants');

exports.registerUser = async (req, res, next) => {
  try {
    // Use pre-validated data from middleware
    const { username } = req.validatedUser;
    
    // No validation needed - just business logic
    const user = await userModel.createUser(username);
    res.status(STATUS_CODES.CREATED).json(user);
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(STATUS_CODES.OK).json(users);
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const user = await userModel.getUserById(_id);
    res.status(STATUS_CODES.OK).json(user);
  } catch (err) {
    next(err);
  }
};