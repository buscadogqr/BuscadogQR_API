const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Users",
    {
      id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },

      mail: {
        type: DataTypes.STRING,
        allowNull: false
      },

      cellphone: {
        type: DataTypes.STRING,
        allowNull: false
      },

      direction: {
        type: DataTypes.STRING,
        allowNull: false
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },

      surname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },

      profilePic: {
        type: DataTypes.TEXT,
        defaultValue: "https://img.freepik.com/vector-premium/icono-avatar-masculino-persona-desconocida-o-anonima-icono-perfil-avatar-predeterminado-usuario-redes-sociales-hombre-negocios-silueta-perfil-hombre-aislado-sobre-fondo-blanco-ilustracion-vectorial_735449-120.jpg",
        validate: {
          isUrl: true,
          notEmpty: true,
        },
      },

      type: {
        type: DataTypes.ENUM(["Admin", "Usuario con membresías", "Usuario sin membresías"]),
        defaultValue: "Usuario sin membresías",
        validate: {
          notEmpty: true,
          isIn: [["Admin", "Usuario con membresías", "Usuario sin membresías"]],
        },
      },

      memberships: {
        type: DataTypes.JSON,
        defaultValue: [],
      }
    },
    { timestamps: false }
  );
};
