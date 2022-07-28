//  const express =require('express')
 const router = require('express').Router(); 
 
 const userController=require('../controller/userController')
  const eventController=require('../controller/eventController')
 const middleware=require('../middleware/middleware')
 router.post('/register', userController.registerUser)
router.post('/loginUser', userController.loginUser)
router.get('/logout',middleware.authentication,userController.logout)


router.post('/createEvent',eventController.eventCreated)
router.post("/inviteEvent/:id",eventController.inviteEvent);
router.put("/updateEvent/",middleware.authorization, eventController.updateEvent)
router.get("/getList/:eventId",eventController.listEvent)

module.exports=router