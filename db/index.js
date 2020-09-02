'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require("sequelize");

console.info('Instantiating and configuring the Sequelize object instance...');

/* -- Allows the use of sequelize to make SQL database requests --- */
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "fsjstd-restapi.db",
  // logging: false,
  
});



const models = {};


// Import all of the models.
fs
  .readdirSync(path.join(__dirname, 'models'))
  .forEach((file) => {
    console.info(`Importing database model from file: ${file}`);
    const model = sequelize.import(path.join(__dirname, 'models', file));
    models[model.name] = model;
    console.log(models);
  });


// db.models.User = require("./models/users.js")(sequelize);
// db.models.Course = require("./models/courses.js")(sequelize);


// const db = {
//   sequelize,
//   Sequelize,
//   models,
// };

// module.exports = db;

module.exports = {
  sequelize,
  Sequelize,
  models,
};