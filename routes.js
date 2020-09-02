const express = require('express');
const router = express.Router();

const { sequelize, models } = require("./db");
// Get references to our models.
const { User, Course } = models;

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

//Setup user routes

//GET /api/users 200 - Returns the currently authenticated user
router.get("/users", (req, res) => {
  res.status(200).json({
    message: "users get route 200",
  });
});

//POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content

router.post("/users", async (req, res) => {
  let user = await User.create(req.body);
  res.location("/");
  res.status(201).end();
});

//Setup course routes

//GET /api/courses 200 - Returns a list of courses (including the user that owns each course)
router.get("/courses", async (req, res) => {
  let courses = await Course.findAll();
  res.status(200).json(courses);
});

//GET /api/courses/:id 200 - Returns the course (including the user that owns the course) for the provided course ID
router.get("/courses/:id", async (req, res) => {
  let course = await Course.findByPk(req.params.id);
  res.status(200).json(course);
});

//POST /api/courses 201 - Creates a course, sets the Location header to the URI for the course, and returns no content
router.post("/courses", (req, res) => {
  //URI ???
  res.status(201).json({
    message: "courses post route 201",
  });
});

//PUT /api/courses/:id 204 - Updates a course and returns no content
router.put("/courses/:id", (req, res) => {
  res.status(204).json({
    message: "courses put route 204",
  });
});

//DELETE /api/courses/:id 204 - Deletes a course and returns no content
router.delete("/courses/:id", (req, res) => {
  res.status(204).json({
    message: "courses delete route 204",
  });
});






module.exports = router;