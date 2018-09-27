module.exports = function(sequelize, DataTypes) {
  var Business = sequelize.define('Business', {
    //business name
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        is: ['^[a-z]+$', 'i']
      }
    },
    //category for the business
    category: {
      type: DataType.STRING,
      allowNull: false,
      validation: {
        is: ['^[a-z]+$', 'i']
      }
    },
    //business description
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    //business address
    address: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Business;
};
