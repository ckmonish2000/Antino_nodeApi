const { Sequelize, Model, DataTypes } = require('sequelize');

exports.db = new Sequelize('sqlite::memory:');