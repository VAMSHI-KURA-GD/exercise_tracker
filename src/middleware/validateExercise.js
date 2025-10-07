const { ERROR_MESSAGES, VALIDATION, DATE_REGEX, STATUS_CODES } = require('../constants');

module.exports = (req, res, next) => {
  const { userId, description, duration, date } = req.body;
  
  // Input format validation
  if (!userId || typeof userId !== 'string' || userId.trim().length === 0) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({ 
      error: ERROR_MESSAGES.EXERCISE.USER_ID_REQUIRED 
    });
  }
  
  if (!description || typeof description !== 'string' || description.trim().length < VALIDATION.DESCRIPTION.MIN_LENGTH) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({ 
      error: ERROR_MESSAGES.EXERCISE.DESCRIPTION_TOO_SHORT 
    });
  }
  
  if (description.trim().length > VALIDATION.DESCRIPTION.MAX_LENGTH) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({ 
      error: `Description must be less than ${VALIDATION.DESCRIPTION.MAX_LENGTH} characters` 
    });
  }
  
  // Strict duration validation - only pure positive integers
  if (!duration) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({ 
      error: ERROR_MESSAGES.EXERCISE.DURATION_REQUIRED 
    });
  }
  
  // Check if duration is a pure number (no mixed characters)
  const durationStr = String(duration).trim();
  if (!/^\d+$/.test(durationStr)) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({ 
      error: 'Duration must be a pure positive number (no letters or special characters)' 
    });
  }
  
  const durationNum = parseInt(durationStr, 10);
  if (durationNum <= 0) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({ 
      error: 'Duration must be greater than zero' 
    });
  }
  
  if (durationNum > VALIDATION.DURATION.MAX) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({ 
      error: ERROR_MESSAGES.EXERCISE.DURATION_TOO_HIGH 
    });
  }
  
  // Enhanced date validation and formatting
  let exerciseDate = null;
  if (date) {
    // First check format
    if (!DATE_REGEX.test(date)) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({ 
        error: ERROR_MESSAGES.EXERCISE.DATE_INVALID 
      });
    }
    
    // Then check if it's a valid date
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({ 
        error: ERROR_MESSAGES.EXERCISE.DATE_INVALID_VALUE 
      });
    }
    
    // Check if date is not in the future
    const today = new Date();
    today.setHours(23, 59, 59, 999); // End of today
    if (parsedDate > today) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({ 
        error: ERROR_MESSAGES.EXERCISE.DATE_FUTURE 
      });
    }
    
    // Check if date is not too far in the past
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - VALIDATION.DATE.MAX_PAST_YEARS);
    if (parsedDate < minDate) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({ 
        error: ERROR_MESSAGES.EXERCISE.DATE_TOO_PAST 
      });
    }
    
    exerciseDate = date;
  }
  
  // Sanitize and add validated data to request
  req.validatedExercise = {
    userId: userId.trim(),
    description: description.trim(),
    duration: durationNum, // Use the parsed integer
    date: exerciseDate
  };
  
  next();
}; 