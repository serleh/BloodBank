const session = require("express-session");
const MongoStore = require("connect-mongo");
require("dotenv").config();

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.DB_STRING,
    collectionName: "sessions",
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
  },
});

module.exports = sessionMiddleware;
