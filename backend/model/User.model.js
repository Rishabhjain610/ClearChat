const express = require('express');
const mongoose = require('mongoose');
const {Schema, model} = mongoose;
const UserSchema=new Schema({
  name: {
    type: String
  },
  username:{
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  image:{
    type: String,
    default:""
  }
  
},{
  timestamps: true
})
module.exports = model('User', UserSchema);