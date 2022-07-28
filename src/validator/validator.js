
const mongoose = require("mongoose");
//validation checking function
const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.length === 0) return false;
  return true;
};

const isValidRequestBody = function (requestBody) {
  return Object.keys(requestBody).length > 0;
};

const isValidObjectId = function (objectId) {
  return mongoose.Types.ObjectId.isValid(objectId);
};
const isValidEmail = function (value) {
    if (!(/^[a-z0-9]+@[a-z.]+$/.test(value))) {
        return false
    }
    return true
}

const isValidPassword = function(value) {
    if(!(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/.test(value.trim()))) {
        return false
    }
    return true
}
module.exports = {
  isValid,
  isValidRequestBody,
  isValidObjectId,
  isValidEmail,
  isValidPassword
};