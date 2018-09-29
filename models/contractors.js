module.exports = function(sequelize, DataTypes) {
  var Contractor = sequelize.define('Contractor', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    email: DataTypes.STRING,
    jobdescription: DataTypes.STRING,
    rate: DataTypes.DECIMAL(10, 2),
    review: DataTypes.STRING,
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });

  Contractor.associate = function(models) {
    //   Associating Contractors with Jobs
    //   When an Contractors is deleted, also delete any associated Jobs
    Contractor.hasMany(models.Job, {
      // as: 'job',
      // foreignKey: 'contractor_id',
      // sourceKey: 'contractor_id'
      // onDelete: 'cascade'
    });
  };
  return Contractor;
};
