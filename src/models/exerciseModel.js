const { SQL3 } = require("../config/database");
const { ERROR_MESSAGES, QUERIES } = require("../constants");

exports.createExercise = async (exerciseData) => {
  const { userId, description, duration, date } = exerciseData;
  
  // Business rule validation only - input format already validated in middleware
  
  // Handle date formatting (business logic)
  let exerciseDate;
  if (!date) {
    exerciseDate = new Date().toISOString().split('T')[0]; // Default to current date
  } else {
    exerciseDate = date;
  }
  
  try {
    const result = await SQL3.run(
      QUERIES.EXERCISE.CREATE,
      userId,
      description,
      duration,
      exerciseDate
    );
    
    return {
      ...exerciseData,
      id: result.lastID,
      date: exerciseDate
    };
  } catch (error) {
    if (error.message.includes('FOREIGN KEY constraint failed')) {
      throw new Error(ERROR_MESSAGES.EXERCISE.USER_NOT_FOUND);
    }
    throw new Error(ERROR_MESSAGES.DATABASE.QUERY_ERROR);
  }
};

exports.getExercisesByUserId = async (userId, { from, to, limit } = {}) => {
  try {
    let result = [];
    let sql = "";
    let params = [userId];

    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);

      sql = QUERIES.EXERCISE.GET_BY_USER_ID_WITH_DATE_RANGE;
      params.push(
        ...[
          fromDate.toISOString().split("T")[0],
          toDate.toISOString().split("T")[0],
        ]
      );
    } else {
      sql = QUERIES.EXERCISE.GET_BY_USER_ID;
    }

    // Get total count (without limit)
    const countResult = await SQL3.get(QUERIES.EXERCISE.COUNT_BY_USER_ID, userId);
    const totalCount = countResult.count;

    // Apply limit if provided
    if (limit !== undefined && !isNaN(parseInt(limit))) {
      sql += " LIMIT ?";
      params.push(parseInt(limit));
    }
    result = await SQL3.all(sql, ...params);

    return result.length === 0
      ? []
      : _transformExerciseObject(result, totalCount);
  } catch (error) {
    throw new Error(ERROR_MESSAGES.DATABASE.QUERY_ERROR);
  }
};

function _transformExerciseObject(exerciseArray, totalCount) {
  return {
    username: exerciseArray[0].username,
    count: totalCount,
    _id: exerciseArray[0].userID,
    logs: exerciseArray.map((exercise) => {
      const date = new Date(exercise.date).toDateString();
      return {
        description: exercise.description,
        duration: exercise.duration,
        date: date,
      };
    }),
  };
}
