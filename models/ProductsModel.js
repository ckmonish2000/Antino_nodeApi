let {Sequelize,DataTypes} = require('sequelize')
let {users} = require('./UserModel')
let {db} = require('./db')


exports.product = db.define("Products",{
    ProductName: {
        allowNull:false,
        type:DataTypes.STRING
    },
    price: {
        allowNull:false,
        type:DataTypes.FLOAT
    },
    user: {
        type:DataTypes.INTEGER,
        references:{
            model:"usersModel",
            key:"id"
        },
        allowNull:false,
    }
},{
    freezeTableName: true
})