const { Model, DataTypes } = require ('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Blogger extends Model {
    checkPassword (loginPassword){
        return bcrypt.compareSync(loginPassword, this.password);
    }
}

Blogger.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [2, 25],
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      }
    }
  },
  {
    hooks: {
        // Set a hook to hash all new passwords. This hook is an async function that accesses the password property from the newly created newBloggerData instance and hashes it using the bcrypt library before saving the new data in the db.
        beforeCreate: async (newBloggerData) => { 
            newBloggerData.password = await bcrypt.hash(newBloggerData.password, 10);
            return newBloggerData;
        },
    },
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "Bloggers",
  }
);

module.exports = Blogger;
