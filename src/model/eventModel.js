const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    eventDate: { type: String, required: true },
    createdBy: { type: ObjectId},
    invitees: [
      { invitee: { type: ObjectId,ref:"userRegister1", required: true }, 
       invitedAt: {type:String ,required:true},
    },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("eventCreated", eventSchema);
