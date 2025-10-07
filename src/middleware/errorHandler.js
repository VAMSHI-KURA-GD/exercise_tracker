const { ERROR_MESSAGES, STATUS_CODES } = require('../constants');

module.exports = (err, req, res, next) => {
  console.error('Error:', err);
  
  // Handle specific database errors
  if (err.message.includes('SQLITE_CONSTRAINT')) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({ 
      error: ERROR_MESSAGES.DATABASE.CONSTRAINT_ERROR 
    });
  }
  
  if (err.message.includes('SQLITE_ERROR')) {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ 
      error: ERROR_MESSAGES.DATABASE.QUERY_ERROR 
    });
  }
  
  // Handle validation errors
  if (err.message.includes(ERROR_MESSAGES.USERNAME.ALREADY_EXISTS) ||
      err.message.includes(ERROR_MESSAGES.USERNAME.REQUIRED) ||
      err.message.includes(ERROR_MESSAGES.USERNAME.TOO_SHORT) ||
      err.message.includes(ERROR_MESSAGES.USERNAME.TOO_LONG) ||
      err.message.includes(ERROR_MESSAGES.EXERCISE.USER_ID_REQUIRED) ||
      err.message.includes(ERROR_MESSAGES.EXERCISE.DESCRIPTION_REQUIRED) ||
      err.message.includes(ERROR_MESSAGES.EXERCISE.DURATION_INVALID) ||
      err.message.includes(ERROR_MESSAGES.EXERCISE.USER_NOT_FOUND)) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({ 
      error: err.message 
    });
  }
  
  // Default error response
  res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ 
    error: ERROR_MESSAGES.DATABASE.QUERY_ERROR 
  });
};
