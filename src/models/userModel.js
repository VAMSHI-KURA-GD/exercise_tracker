const { SQL3 } = require("../config/database");
const { nanoid } = require("nanoid");
const { ERROR_MESSAGES, QUERIES } = require("../constants");

exports.createUser = async (username) => {
  console.log("username", username);
  // Business rule validation only - input format already validated in middleware
  // Check for uniqueness (business rule)
  const existing = await SQL3.get(QUERIES.USER.GET_BY_USERNAME, username);
  if (existing) {
    throw new Error(ERROR_MESSAGES.USERNAME.ALREADY_EXISTS);
  }
  
  // Create user
  const id = nanoid(15);
  const result = await SQL3.run(QUERIES.USER.CREATE, id, username);
  
  if (result && result.changes > 0) {
    return {
      _id: id,
      username: username,
    };
  } else {
    throw new Error(ERROR_MESSAGES.DATABASE.QUERY_ERROR);
  }
};

exports.getAllUsers = async () => {
  try {
    return await SQL3.all(QUERIES.USER.GET_ALL);
  } catch (error) {
    throw new Error(ERROR_MESSAGES.DATABASE.QUERY_ERROR);
  }
};

exports.getUserById = async (id) => {
  try {
    const user = await SQL3.get(QUERIES.USER.GET_BY_ID, id);
    if (!user) {
      throw new Error(ERROR_MESSAGES.EXERCISE.USER_NOT_FOUND);
    }
    return user;
  } catch (error) {
    if (error.message === ERROR_MESSAGES.EXERCISE.USER_NOT_FOUND) {
      throw error;
    }
    throw new Error(ERROR_MESSAGES.DATABASE.QUERY_ERROR);
  }
}; 