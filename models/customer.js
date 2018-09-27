module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define('Customer', {
    //customer name
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        is: ['^[a-z]+$', 'i']
      }
    },
    //the job that the customer will list
    jobListed: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
  return Customer;
};
