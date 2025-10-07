let sqlite3 = require("sqlite3");
let path = require("path");
let util = require("util");
let fs = require("fs");

const DB_PATH = path.join(__dirname, "user.db");
const DB_SQL_PATH = path.join(__dirname, "userdb.sql");
let userDB = new sqlite3.Database(DB_PATH);

let SQL3 = {
  run(...args) {
    return new Promise(function c(resolve, reject) {
      userDB.run(...args, function onResult(err) {
        if (err) reject(err);
        else resolve(this);
      });
    });
  },
  get: util.promisify(userDB.get.bind(userDB)),
  all: util.promisify(userDB.all.bind(userDB)),
  exec: util.promisify(userDB.exec.bind(userDB)),
};

let initiSQL = fs.readFileSync(DB_SQL_PATH, "utf-8");

try {
  SQL3.exec(initiSQL);
} catch (e) {
  console.error("Incoming Error", e);
}

module.exports = { SQL3, initiSQL };
