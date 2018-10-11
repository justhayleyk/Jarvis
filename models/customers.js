module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define('Customer', {

    google_Id: {
    type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },

    

    google_token_access: {
     type: DataTypes.STRING,
      allowNull: true
    },

    google_refresh_token: {
      type: DataTypes.STRING,
      allowNull: true
    },
    custUserName: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    custName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    custAddress: {
      type: DataTypes.STRING,
      allowNull: true
    },
    custPhone: {
      type: DataTypes.TEXT,
      allowNull: true,
      validation: {
        not: ['[a-z]', 'i'],
        len: [6, 13]
      }
    },
    custEmail: {
      type: DataTypes.STRING,
      allowNull: true,
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
    custPassword: {
      type: DataTypes.STRING,
      allowNull: true

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
