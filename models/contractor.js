module.exports = function(sequelize, DataTypes) {
  var Contractor = sequelize.define('Contractor', {
    //contractor name
    contractor_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        is: ['^[a-z]+$', 'i']
      }
    },
    //category for the business
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        is: ['^[a-z]+$', 'i']
      }
    },
    //business description
    contractor_phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validation: {
        //will not allow letters
        not: ['[a-z]', 'i']
      }
    },
    //business address
    contractor_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    /*contractor email; string type, not null, is unique, between 6 and 128 characters
    and is in an email format checking for @ symbol*/
    contractor_email: {
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
    reviews: {
      type: DataTypes.TEXT,
      allowNull: true,
      validation: {
        len: {
          args: [0, 1000],
          msg: 'Keep your review under 1000 characters'
        }
      }
    }
  });
  return Contractor;
};
