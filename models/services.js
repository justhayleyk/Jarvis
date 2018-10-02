var contractors = require('./contractors');
var customers = require('./customers');

module.exports = function(sequelize, DataTypes) {
  var Job = sequelize.define('Job', {
    typeofjob: {
      type: DataTypes.STRING,
      allowNull: false
    },
    datetobedone: {
      type: DataTypes.DATE,
      allowNull: false
    },

    payment: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    comments: {
      type: DataTypes.STRING,
      allowNull: false
    },
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
