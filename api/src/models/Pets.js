const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Pets",
    {
      id: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true
      },

      name: {
        type: DataTypes.STRING,
        defaultValue: ""
      },

      age: {
        type: DataTypes.STRING,
        defaultValue: ""
      },

      breed: {
        type: DataTypes.STRING,
        defaultValue: ""
      },

      notes: {
        type: DataTypes.TEXT,
        defaultValue: ""
      },

      photo: {
        type: DataTypes.TEXT,
        defaultValue: "https://www.educima.com/dibujo-para-colorear-perro-dl19661.jpg",
        validate: {
          isUrl: true,
          notEmpty: true,
        },
      },

      userOwner: {
        type: DataTypes.STRING,
        defaultValue: ""
      }
    },
    { timestamps: false }
  );
};
