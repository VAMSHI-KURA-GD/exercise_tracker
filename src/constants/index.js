// Validation constants
const VALIDATION = {
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 50
  },
  DESCRIPTION: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 200
  },
  DURATION: {
    MIN: 1,
    MAX: 1440 // 24 hours in minutes
  },
  DATE: {
    MAX_PAST_YEARS: 10, // Maximum years in the past
    MAX_FUTURE_DAYS: 0  // No future dates allowed
  }
};

// Error messages
const ERROR_MESSAGES = {
  USERNAME: {
    REQUIRED: 'Username is required',
    TOO_SHORT: `Username must be at least ${VALIDATION.USERNAME.MIN_LENGTH} characters`,
    TOO_LONG: `Username must be less than ${VALIDATION.USERNAME.MAX_LENGTH} characters`,
    ALREADY_EXISTS: 'Username already exists',
    INVALID_FORMAT: 'Username must contain only letters, numbers, and underscores'
  },
  EXERCISE: {
    USER_ID_REQUIRED: 'User ID is required',
    DESCRIPTION_REQUIRED: 'Description is required',
    DESCRIPTION_TOO_SHORT: `Description must be at least ${VALIDATION.DESCRIPTION.MIN_LENGTH} characters`,
    DURATION_REQUIRED: 'Duration is required',
    DURATION_INVALID: 'Duration must be a pure positive number (no letters or special characters)',
    DURATION_TOO_HIGH: `Duration cannot exceed ${VALIDATION.DURATION.MAX} minutes`,
    DATE_INVALID: 'Invalid date format. Use YYYY-MM-DD',
    DATE_INVALID_VALUE: 'Invalid date. Please provide a valid date in YYYY-MM-DD format',
    DATE_FUTURE: 'Date cannot be in the future',
    DATE_TOO_PAST: `Date cannot be more than ${VALIDATION.DATE.MAX_PAST_YEARS} years in the past`,
    USER_NOT_FOUND: 'User not found'
  },
  DATABASE: {
    CONSTRAINT_ERROR: 'Database constraint error',
    CONNECTION_ERROR: 'Database connection error',
    QUERY_ERROR: 'Database query error'
  }
};

// Date format regex
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

// Database queries
const QUERIES = {
  USER: {
    CREATE: 'INSERT INTO User (_id, username) VALUES (?, ?)',
    GET_ALL: 'SELECT _id, username FROM User',
    GET_BY_ID: 'SELECT _id, username FROM User WHERE _id = ?',
    GET_BY_USERNAME: 'SELECT * FROM User WHERE username = ?'
  },
  EXERCISE: {
    CREATE: 'INSERT INTO User_exercise (userID, description, duration, date) VALUES (?, ?, ?, ?)',
    GET_BY_USER_ID: `
      SELECT 
        username,
        userID,
        description,
        duration,
        date
      FROM User
      JOIN User_exercise ON (User._id = User_exercise.UserID)
      WHERE User_exercise.userID = ?
    `,
    GET_BY_USER_ID_WITH_DATE_RANGE: `
      SELECT 
        username,
        userID,
        description,
        duration,
        date
      FROM User
      JOIN User_exercise ON (User._id = User_exercise.UserID)
      WHERE User_exercise.userID = ? AND date BETWEEN ? AND ?
      ORDER BY date ASC
    `
  }
};

// HTTP status codes
const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

module.exports = {
  VALIDATION,
  ERROR_MESSAGES,
  DATE_REGEX,
  QUERIES,
  STATUS_CODES
}; 