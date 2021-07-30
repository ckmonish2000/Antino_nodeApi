const { Sequelize, Model, DataTypes } = require('sequelize');
let {db} = require('./db')



exports.users = db.define('usersModel',{
    userName:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    isAdmin:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
    }
},
{
    freezeTableName: true
})



 
