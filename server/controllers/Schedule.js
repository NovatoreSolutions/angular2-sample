var async = require("async");
ObjectID = require("mongodb").ObjectID;

module.exports = function(app) {

  var Schedule=app.models.Schedule;



  var Controller = {
    name: Schedule.modelName
  };



  Controller.addSchedule = function(req, res){

    console.log("user obj",req.body);


    Schedule.create(req.body,function(err, schedule){

      if(err){

        app.responder.send(500, res, 'Server Error', err);
      }
      else{

        var opts = [
          { path: 'user'}
        ];

        Schedule.populate(schedule, opts, function (err, schedule) {
          if(err)
          {
            app.responder.send(500, res, 'Server Error', err);
          }
          else
          {

            app.responder.send(200, res, 'Schedule add successfully', schedule);

          }

        });

      }


    });

  };






  Controller.getAllSchedules = function(req, res){

    req.query.limit = parseInt(req.query.limit);
    req.query.skip = parseInt(req.query.skip);
    var query = {deleted: false};


    Schedule.find(query)
      .limit(req.query.limit)
      .skip(req.query.skip)
      .populate({path:'user'})
      .exec( function(err, schedules){
        if(err)
        {
          app.responder.send(500, res, 'Server Error', err);
        }
        else{

          if(schedules)
          {

            app.responder.send(200, res, 'Schedules', schedules);

          }

          else{

            app.responder.send(200,res,'Schedules Not Found',[]);

          }

        }
      });




  };


  Controller.getScheduleforUser = function(req, res) {


    Schedule.find({'user': req.params.id , deleted: false})
      .populate({path:'user'})
      .exec( function(err, schedules){
      if(err)
      {
        app.responder.send(500, res, 'Server Error', err);
      }
      else{

        if(schedules)
        {
          app.responder.send(200, res, 'Schedules', schedules);

        }

        else{

          app.responder.send(404, res, 'Schedule not Found', []);

        }

      }
    });


  };



  Controller.deleteUserSchedule = function (req, res) {


    console.log(req.params.id);
      Schedule.findOneAndRemove({_id: req.params.id}, function (err, schedule) {
        if (err) {
          app.responder.send(500, res, 'Server Error', err);
        }
        else {
          app.responder.send(200, res, 'Schedule successfully deleted', 'True');

        }

      })


  };

  return Controller;
};
