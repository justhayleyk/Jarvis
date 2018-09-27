module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define('Customer', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        is: ['^[a-z]+$', 'i']
      }
    },
    jobListed: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
  return Customer;
};
