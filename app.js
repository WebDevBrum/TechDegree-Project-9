"use strict";

// load modules
const express = require("express");
const morgan = require("morgan");
// const routes = require("./routes");

const { sequelize, models } = require("./db");
// Get references to our models.
const { User, Course } = models;

// variable to enable global error logging
const enableGlobalErrorLogging =
  process.env.ENABLE_GLOBAL_ERROR_LOGGING === "true";

// create the Express app
const app = express();

// setup morgan which gives us http request logging
app.use(morgan("dev"));

app.use(express.json());
// app.use("/api", routes);

// TODO setup your api routes here

function asyncHandler(cb) {
  //ommits the need for multiple try catch blocks in routes
  return async (req, res, next) => {
    try {
      await cb(req, res, next); // so calls the function cb here and then catches in catch, saves writing try catch every time as higlighted below
    } catch (err) {
      next(err);
    }
  };
}

// setup a friendly greeting for the root route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the REST API project!",
  });
});

//Setup user routes
//GET /api/users 200 - Returns the currently authenticated user
app.get("/api/users", (req, res) => {
  res.status(200).json({
    message: "users get route 200",
  });
});

//POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content

app.post("/api/users", async (req, res) => {
  let user = await User.create(req.body);
  //NEED TO SET LOCATIOJ ERROR
  res.status(201).end();
});

//Setup course routes
//GET /api/courses 200 - Returns a list of courses (including the user that owns each course)
app.get("/api/courses", (req, res) => {
  res.status(200).json({
    message: "courses get route 200",
  });
});
//GET /api/courses/:id 200 - Returns the course (including the user that owns the course) for the provided course ID
app.get("/api/courses/:id", (req, res) => {
  res.status(200).json({
    message: "courses get id route 200",
  });
});
//POST /api/courses 201 - Creates a course, sets the Location header to the URI for the course, and returns no content
app.post("/api/courses", (req, res) => {
  res.status(201).json({
    message: "courses post route 201",
  });
});
//PUT /api/courses/:id 204 - Updates a course and returns no content
app.put("/api/courses/:id", (req, res) => {
  res.status(204).json({
    message: "courses put route 204",
  });
});
//DELETE /api/courses/:id 204 - Deletes a course and returns no content
app.delete("/api/courses/:id", (req, res) => {
  res.status(204).json({
    message: "courses delete route 204",
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found",
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set("port", process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get("port"), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});

// Checks that a database connection has been established successfully
async function authenticate() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

authenticate();
