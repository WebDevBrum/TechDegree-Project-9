const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Course extends Sequelize.Model {}
  Course.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      estimatedTime: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      materialsNeeded: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    { sequelize },
  );

  Course.associate = (models) => {
    // TODO Add associations.
    Course.belongsTo(models.User, {
      as: 'creator', // alias
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      },
    });
  };

  return Course;
};
