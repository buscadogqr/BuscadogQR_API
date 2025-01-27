const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Others",
    {
      price: {
        type: DataTypes.STRING,
        defaultValue: "6500"
      },

      statistics: {
        type: DataTypes.JSON,
        defaultValue: []
      }
    },
    { timestamps: false }
  );
};
