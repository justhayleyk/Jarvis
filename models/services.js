var contractors = require('./contractors');
var customers = require('./customers');

module.exports = function(sequelize, DataTypes) {
  var Job = sequelize.define('Job', {
    typeofjob: DataTypes.STRING,
    datetobedone: DataTypes.DATE,
    // custid: customers.id,
    // custname: customers.name,
    // contrid: contractors.id,
    // contractorname: contractors.name,
    payment: DataTypes.DECIMAL,
    comments: DataTypes.STRING,
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });

  Job.associate = function(models) {
    // Associating Jobs with Jobs
    // When an Jobs is deleted, also delete any associated Jobs
    Job.belongsTo(models.Customer, {
      // foreignKey: 'contractor_id',
      // targetKey: 'contractor_id'
      foreignKey: {
        allowNull: false
      }
    });
  };

  Job.associate = function(models) {
    Job.belongsTo(models.Customer, {
      // foreignKey: 'customer_id',
      // targetKey: 'customer_id'
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Job;
};
