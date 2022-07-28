const eventModel=require('../model/eventModel')
let userModel=require('../model/userModel')
const validator = require("../validator/validator");

const eventCreated=async(req,res)=>{
    try {
    let event=req.body
    if(!validator.isValid(event)){
        res.status(404).send({status:false,msg:"event is empty"})
    }
    let {title,description,eventDate,createdBy}=event;
    let {invitee,invitedAt}=event.invitees[0];
    // console.log(event)

    if(!validator.isValid(title)){
        return res.status(400).send({status:false,msg:"please enter  title"})
    }
    if(!validator.isValid(description)){
        return res.status(400).send({status:false,msg:"please enter  desciption"})
    }
    if(!validator.isValid(eventDate)){
        return res.status(400).send({status:false,msg:"please enter  eventDate"})
    }
    if(!validator.isValid(createdBy)){
        return res.status(400).send({status:false,msg:"please enter  createdBy"})
    }
    if(!validator.isValid(invitee)){
        return res.status(400).send({status:false,msg:"please enter  invitee"})
    }
    if(!validator.isValidObjectId(invitee)){
        return res.status(400).send({status:false,msg:"please enter  invitee"})
    }
    if(!validator.isValid(invitedAt)){
        return res.status(400).send({status:false,msg:"please enter  invitedAt"})
    }
    


    let eventCr = await eventModel.create(event);
      res.status(201).send({ status: true, data: eventCr,msg:"Event added successfully" });
        
    } catch (error) {
        res.status(500).send({
            status: false,
            message: error.message,
    })
}
}
module.exports.eventCreated=eventCreated
const inviteEvent=async(req,res)=>{
    try {
        let eventId=req.params.id;
        let eventFind=await eventModel.findOne({eventId});
        if(!eventFind){
            return res.status(400).send({status:false,msg:"no event is created"})
        }
    let {invitee,invitedAt}=req.body
    if(!validator.isValid(invitee)){
        return res.status(400).send({status:false,msg:"please enter  invitee"})
    }
    if(!validator.isValidObjectId(invitee)){
        return res.status(400).send({status:false,msg:`please enter ${invitee} objectId`})
    }
    if(!validator.isValid(invitedAt)){
        return res.status(400).send({status:false,msg:"please enter  invitedAt"})
    }
    let inviteEvent=await eventModel.findOneAndUpdate(
        {_id:eventId},
        {$push:{invitees:{invitee:invitee,invitedAt:invitedAt}}},
        {new:true}

    );
    return res.status(200).send({staus:true,data:inviteEvent})


        
    } catch (error) {
        res.status(500).send({
            status: false,
            message: error.message,
 
    });
}
}
module.exports.inviteEvent=inviteEvent

const listEvent=async function(req,res){
    try {
        let { date, sort, name } = req.query;

    if (date) {
      let dateFilter = await eventModel.findOne({ eventDate: date });
 
      if (dateFilter) {
        return res.status(200).send({
          status: true,
          msg: `event found for following  ${date} `,
          data: { dateFilter },
        });
      } else {
        return res
          .status(400)
          .send({ status: false, msg: `No event with ${date} found` });
      }
    }
    if (name) {
      let findName = await eventModel.find({
        title: { $regex: name, $options: "i" },
      });

      if (findName.length != 0) {
        return res.status(200).send({
          status: true,
          msg: "Successfully found",
          data: { findName },
        });
      } else {
        return res
          .status(400)
          .send({ status: false, msg: `No event with ${name} found` });
      }
    }

    if (sort) {
      let findSort = await eventModel.find({}).sort({ title: sort }); //will sort acording to title

      if (findSort) {
        return res.status(200).send({
          status: true,
          msg: "Successfully found",
          data: { findSort },
        });
      } else {
        return res
          .status(400)
          .send({ status: false, msg: `No products of size ${Size} found` });
      }
    }
    } catch (error) {
        res.status(500).send({
            status: false,
            message: error.message,
    });
}
}
module.exports.listEvent=listEvent

let updateEvent=async function(req,res){
    try {
        let event=req.body
        if(!validator.isValid(event)){
            res.status(404).send({status:false,msg:"event is empty"})
        }
        let {title,description,eventDate,createdBy}=event;
        let {invitee,invitedAt}=event.invitees[0];
        // console.log(event)
    
        if(!validator.isValid(title)){
            return res.status(400).send({status:false,msg:"please enter  title"})
        }
        if(!validator.isValid(description)){
            return res.status(400).send({status:false,msg:"please enter  desciption"})
        }
        if(!validator.isValid(eventDate)){
            return res.status(400).send({status:false,msg:"please enter  eventDate"})
        }
        if(!validator.isValid(createdBy)){
            return res.status(400).send({status:false,msg:"please enter  createdBy"})
        }
        if(!validator.isValid(invitee)){
            return res.status(400).send({status:false,msg:"please enter  invitee"})
        }
        if(!validator.isValidObjectId(invitee)){
            return res.status(400).send({status:false,msg:"please enter  invitee"})
        }
        if(!validator.isValid(invitedAt)){
            return res.status(400).send({status:false,msg:"please enter  invitedAt"})
        }
        let data = await eventModel.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
          );
      
          return res.status(200).send({
            status: true,
            message: `successfully updated`,
            data: data,
          });
            
    } catch (error) {
        res.status(500).send({
            status: false,
            message: error.message,
    })
}
}
module.exports.updateEvent=updateEvent

const details = async (req, res) => {
    try {
      let eventId = req.params.id;
      let showEvents = await eventModel.findOne({ _id:eventId });
  
      if (!showEvents)
        return res.status(400).send({ status: false, msg: "no events found" });
  
      return res
        .status(200)
        .send({ status: false, msg: "eventList", data: showEvents });
    } catch (err) {
      return res.status(500).send({ status: false, msg: err.message });
    }
  };
module.exports.details=details
