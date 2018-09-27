module.exports = function(sequelize, DataTypes) {
  var Business = sequelize.define('Business', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        is: ['^[a-z]+$', 'i']
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Business;
};
