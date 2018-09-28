module.exports = function(sequelize, DataTypes) {
  var Job = sequelize.define('Job', {
    cust_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    cust_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cust_job: {
      type: DataTypes.TEXT,
      allowNull: false,
      validation: {
        len: {
          args: [100, 100000],
          msg: 'Put lots of details about the job.'
        }
      }
    },
    cust_pay: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cust_review: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cont_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    }
  });
  return Job;
};
