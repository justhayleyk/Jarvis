module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define('Customer', {
    custname: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        is: ['^[a-z]+$', 'i']
      }
    },
    custusername: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        is: ['^[a-z]+$', 'i']
      }
    },
    custaddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    custphone: {
      type: DataTypes.BIGINT(10),
      allowNull: false,
      validation: {
        //not: ['[a-z]', 'i'],
        len: [10]
      }
    },
    custemail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validation: {
        len: {
          args: [6, 128],
          msg: 'Email address must be between 6 and 128 characters in length'
        },
        isEmail: {
          msg: 'Email address must be valid'
        }
      }
    },
    custpswrd: {
      type: DataTypes.STRING,
      allowNull: false
    },
    custpayment: DataTypes.DECIMAL,
    custnotes: {
      type: DataTypes.STRING,
      allowNull: true
    },
    custstatus: {
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
