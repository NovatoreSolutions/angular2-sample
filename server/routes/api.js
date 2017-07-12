//const express = require('express');
//const router = express.Router();
//
//// declare axios for making http requests
//const axios = require('axios');
//const API = 'https://jsonplaceholder.typicode.com';
//
//
//
///* GET api listing. */
//router.get('/', (req, res) => {
//  res.send('api works');
//});
//
//// Get all posts
//router.get('/posts', (req, res) => {
//  // Get posts from the mock api
//  // This should ideally be replaced with a service that connects to MongoDB
//  axios.get(`${API}/posts`)
//    .then(posts => {
//      res.status(200).json(posts.data);
//    })
//    .catch(error => {
//      res.status(500).send(error)
//    });
//});
//
//module.exports = router;


module.exports = function(app) {


  var adminController = app.controllers.Admin;
  var userController = app.controllers.User;
  var scheduleController = app.controllers.Schedule;


  //User Authetication Collection operations

  app.post('/api/sign-in', adminController.signIn);



  app.post('/api/users', userController.addUser);
  app.put('/api/users/:id', userController.updateUser);
  app.get('/api/users', userController.getAllUser);

  app.get('/api/users/:id', userController.getUser);
  app.delete('/api/users/:id', userController.deleteUser);


  app.get('/api/cleaners', userController.getAllCleaners);
  app.get('/api/hosts', userController.getAllHosts);
  app.get('/api/agents', userController.getAllAgents);




  app.post('/api/schedules', scheduleController.addSchedule);
  app.get('/api/schedules', scheduleController.getAllSchedules);

  app.delete('/api/schedules/:id', scheduleController.deleteUserSchedule);

  app.get('/api/users/:id/schedules', scheduleController.getScheduleforUser);

};
