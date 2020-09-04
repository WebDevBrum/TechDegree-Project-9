const express = require('express');

const router = express.Router();

const { check, validationResult } = require('express-validator');

const { sequelize, models } = require('./db');
// Get references to our models.
const { User, Course } = models;
router.use(express.json());

function asyncHandler(cb) {
  // ommits the need for multiple try catch blocks in routes
  return async (req, res, next) => {
    try {
      await cb(req, res, next); // so calls the function cb here and then catches in catch,
      // saves writing try catch every time as higlighted below
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}

// Authentication

//  Setup user routes

//  GET /api/users 200 - Returns the currently authenticated user
router.get('/users', asyncHandler(async (req, res) => {
  res.status(200).json({
    message: 'users get route 200',
  });
}));

//  POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content

router.post('/users', [
  check('firstName')
    .exists()
    .withMessage('Please provide a value for "firstName"'),
  check('lastName')
    .exists()
    .withMessage('Please provide a value for "lastName"'),
  check('emailAddress')
    .exists()
    .withMessage('Please provide a value for "emailAddress"'),
  check('password')
    .exists()
    .withMessage('Please provide a value for "password"'),

], asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Use the Array `map()` method to get a list of error messages.
    const errorMessages = errors.array().map((error) => error.msg);

    // Return the validation errors to the client.
    res.status(400).json({ errors: errorMessages });
  } else {
    const user = await User.create(req.body);
    res.location('/');
    res.status(201).end();
  }
}));

//  Setup course routes

//  GET /api/courses 200 - Returns a list of courses (including the user that owns each course)
router.get('/courses', asyncHandler(async (req, res) => {
  const courses = await Course.findAll();
  res.status(200).json(courses);
}));

//  GET /api/courses/:id 200 - Returns the course
//  (including the user that owns the course) for the provided course ID
router.get('/courses/:id', asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id);
  res.status(200).json(course);
}));

// POST /api/courses 201 - Creates a course, sets the Location header to the URI for the course,
// and returns no content
router.post('/courses', [

], asyncHandler(async (req, res) => {
  console.log(req.body);
  const course = await Course.create(req.body);
  res.location(`/courses/${course.id}`);
  res.status(201).end();
}));

// PUT /api/courses/:id 204 - Updates a course and returns no content
router.put('/courses/:id', asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id);
  await course.update(req.body);
  res.status(204).end();
}));

//  DELETE /api/courses/:id 204 - Deletes a course and returns no content

router.delete('/courses/:id', asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id);
  await course.destroy();
  res.status(204).end();
}));

module.exports = router;
