'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var utils = require('../utils');

var UserSchema = new Schema({
  _id : {
    type: String,
    'default': utils.uuid
  },
  auth : {
    email: String,
    salt: String,
    hashed_password: String,
    admin: Boolean,
    timestamps: {
      created: {
        type: Date,
        'default': Date.now
      },
      loggedIn: {
        type: Date,
        'default': Date.now
      }
    }
  }
});

UserSchema.methods.toJSON = function () {
  var doc = this.toObject();
  doc.id = doc._id;
  return doc;
};

module.exports.schema = UserSchema;
module.exports.model = mongoose.model("User", UserSchema);