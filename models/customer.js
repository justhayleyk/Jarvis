module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define('Customer', {
    //customer name
    cust_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        is: ['^[a-z]+$', 'i']
      }
    },
    //customer address
    cust_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    //customer phone number
    cust_phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validation: {
        //will not allow letters
        not: ['[a-z]', 'i']
      }
    },
    cust_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validation: {
        len: {
          args: [6, 128],
          msg: 'EMAIL address must be between 6 and 128 characters in length'
        },
        isEmail: {
          msg: 'eMAIL address must be valid'
        }
      }
    },
    cust_job: {
      type: DataTypes.TEXT,
      allowNull: false,
      validation: {
        len: {
          args: [100, 100000],
          msg: 'Put a lots of details into your job'
        }
      }
    }
  });
  return Customer;
};
