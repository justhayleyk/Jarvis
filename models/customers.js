module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define('Customer', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    email: DataTypes.STRING,
    date: DataTypes.DATE,
    jobs: DataTypes.STRING,
    payment: DataTypes.DECIMAL,
    comments: DataTypes.STRING,
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });

  Customer.associate = function(models) {
    // Associating Customers with Jobs
    // When an Customers is deleted, also delete any associated Jobs
    Customer.hasMany(models.Job, {
      // as: 'job',
      // foreignKey: 'customer_id',
      // sourceKey: 'customer_id'
      // onDelete: 'cascade'
    });
  };
  return Customer;
};
