const mongoose = require("mongoose");
const bcrypt=require('bcrypt')

const userSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,

      trim: true,
      enum: ["Mr", "Mrs", "Miss"],
    },
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      
      unique: true,
    },
    password: {
      type: String,
      required: true,
    }
  },
  { timeStamp: true }
);
module.exports = mongoose.model("userRegister1", userSchema);
userSchema.pre('save', async function(next){ 
    try {
      const salt = await bcrypt.genSalt(10) 
      const hashPassword = bcrypt.hash(this.password, salt)
      this.password = hashPassword
      next()
    } catch (error) {
      next(error)
    }
  })