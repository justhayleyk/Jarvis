module.exports = function(sequelize, DataTypes) {
  var Contractor = sequelize.define('Contractor', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        is: ['^[a-z]+$', 'i']
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.BIGINT(10),
      allowNull: false,
      validation: {
        //will not allow letters
        not: ['[a-z]', 'i'],
        len: [10]
      }
    },
    email: {
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
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        is: ['^[a-z]+$', 'i']
      }
    },
    rate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: true,
      validation: {
        len: {
          args: [0, 1000],
          msg: 'Keep your review under 1000 characters'
        }
      }
    },
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
