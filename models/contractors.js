module.exports = function(sequelize, DataTypes) {
  var Contractor = sequelize.define('Contractor', {
    contrname: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        is: ['^[a-z]+$', 'i']
      }
    },
    contraddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contrphone: {
      type: DataTypes.BIGINT(10),
      allowNull: false,
      validation: {
        //will not allow letters
        //  not: ['[a-z]', 'i'],
        len: [10]
      }
    },
    contremail: {
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
    contrpswrd: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contrcategory: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        is: ['^[a-z]+$', 'i']
      }
    },
    contrrate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    contrreview: {
      type: DataTypes.TEXT,
      allowNull: true,
      validation: {
        len: {
          args: [0, 1000],
          msg: 'Keep your review under 1000 characters'
        }
      }
    },
    contrstatus: {
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
