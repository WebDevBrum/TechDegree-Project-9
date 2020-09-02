const express = require('express');
const router = express.Router();



const { sequelize, models } = require("./db");
// Get references to our models.
const { User, Course } = models;