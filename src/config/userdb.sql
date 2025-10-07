PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS User(
    _id VARCHAR(36) PRIMARY KEY CHECK (length(_id) > 0),
    username VARCHAR(255) NOT NULL UNIQUE CHECK (length(username) > 0)
);

CREATE TABLE IF NOT EXISTS User_exercise(
    _id INTEGER PRIMARY KEY AUTOINCREMENT,
    userID VARCHAR(36) NOT NULL CHECK (length(userID) > 0),
    description TEXT NOT NULL CHECK (length(description) > 0),
    duration  INT NOT NULL CHECK (duration > 0),
    date DATE NOT NULL,

    FOREIGN KEY (userID) REFERENCES User(_id) ON DELETE CASCADE
);