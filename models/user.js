const sequelize = require('sequelize')


const User = sequelize.define('user', {
    username: {
        type: sequelize.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: sequelize.DataTypes.STRING,
        allowNull: false
    }, 
    age: {
        type: sequelize.DataTypes.INTEGER,
        defaultValue: 18
    }

})
module.exports = User