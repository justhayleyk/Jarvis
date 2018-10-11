module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define('Customer', {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      validation: {
        is: ['^[a-z]+$', 'i']
      }
    },
    google_Id: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone: {
      type: DataTypes.TEXT,
      allowNull: true
      /*validation: {
        //will not allow letters
        not: ['[a-z]', 'i']
      }*/
    },
    email: {
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
    date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    jobs: {
      type: DataTypes.TEXT,
      allowNull: true,
      validation: {
        len: {
          args: [100, 100000],
          msg: 'Put a lots of details into your job'
        }
      }
    },
    payment: DataTypes.DECIMAL,
    comments: {
      type: DataTypes.STRING,
      allowNull: true
    },
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
