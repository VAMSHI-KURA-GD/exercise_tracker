const { ERROR_MESSAGES, VALIDATION, STATUS_CODES } = require('../constants');

module.exports = (req, res, next) => {
  const { username } = req.body;
  
  // Input format validation
  if (!username || typeof username !== 'string') {
    return res.status(STATUS_CODES.BAD_REQUEST).json({ 
      error: ERROR_MESSAGES.USERNAME.REQUIRED 
    });
  }
  
  if (username.trim().length < VALIDATION.USERNAME.MIN_LENGTH) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({ 
      error: ERROR_MESSAGES.USERNAME.TOO_SHORT 
    });
  }
  
  if (username.trim().length > VALIDATION.USERNAME.MAX_LENGTH) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({ 
      error: ERROR_MESSAGES.USERNAME.TOO_LONG 
    });
  }
  
  // Sanitize and add validated data to request
  req.validatedUser = {
    username: username.trim()
  };
  
  next();
}; 