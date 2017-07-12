var async = require("async");
ObjectID = require("mongodb").ObjectID;

module.exports = function(app) {

    var User=app.models.User;



    var Controller = {
        name: User.modelName
    };


    Controller.getAllAgents = function(req, res){

      req.query.limit = parseInt(req.query.limit);
      req.query.skip = parseInt(req.query.skip);
        var  query = {'role': 'Agent',deleted: false};

        User.find(query)
          .limit(req.query.limit)
          .skip(req.query.skip)
            .exec( function(err, agents){
                if(err)
                {
                    app.responder.send(500, res, 'Server Error', err);
                }
                else{

                    if(agents)
                    {

                        app.responder.send(200, res, 'Agents', agents);

                    }

                    else{

                        app.responder.send(200,res,'Agents Not Found',[]);

                    }

                }
            });




    };

  Controller.getAllCleaners = function(req, res){


    req.query.limit = parseInt(req.query.limit);
    req.query.skip = parseInt(req.query.skip);
    var  query = {'role': 'Cleaner',deleted: false};

    User.find(query)
      .limit(req.query.limit)
      .skip(req.query.skip)
      .exec( function(err, cleaners){
        if(err)
        {
          app.responder.send(500, res, 'Server Error', err);
        }
        else{

          if(cleaners)
          {

            app.responder.send(200, res, 'Cleaners', cleaners);

          }

          else{

            app.responder.send(200,res,'Cleaners Not Found',[]);

          }

        }
      });




  };


  Controller.getAllHosts = function(req, res){

    req.query.limit = parseInt(req.query.limit);
    req.query.skip = parseInt(req.query.skip);
    var  query = {'role': 'Host',deleted: false};

    User.find(query)
      .limit(req.query.limit)
      .skip(req.query.skip)
      .exec( function(err, hosts){
        if(err)
        {
          app.responder.send(500, res, 'Server Error', err);
        }
        else{

          if(hosts)
          {

            app.responder.send(200, res, 'Hosts', hosts);

          }

          else{

            app.responder.send(200,res,'Hosts Not Found',[]);

          }

        }
      });




  };


    Controller.getUser = function(req, res) {
        User.findOne({_id: req.params.id , deleted: false}, function(err, user){
            if(err)
            {
                app.responder.send(500, res, 'Server Error', err);
            }
            else{

                if(user)
                {
                    app.responder.send(200, res, 'User', user);

                }

                else{

                    app.responder.send(404, res, 'User not Found', null);

                }

            }
        });
    };


    Controller.addUser = function(req, res){

        console.log("user obj",req.body);
        async.waterfall([

            avoidEmailDuplication,
            addUser

        ],function(err,user){

            if(err){

                if(err.status)
                {

                    app.responder.send(err.status, res, err.errorMessage, err.detail);

                }
                else {

                    app.responder.send(500, res, 'Server Error', err);
                }
            }
            else{

                app.responder.send(200,res,'User Created Successfully', user);

            }



        });

        function avoidEmailDuplication(callback){




            User.findOne({'email': req.body.email} ,function(err, user){

                if(err){

                    callback(err)
                }
                else{

                    if (user) {
                        callback({
                            status: 409,
                            errorMessage: "Conflict",
                            detail: "Creation of Duplicate Email is Forbidden"
                        })
                    }

                    else {

                        callback(null)

                    }


                }



            })

        }


        function addUser(callback){

         User.create(req.body,function(err, user){

             if(err){

                 callback(err)
             }
             else{



                 callback(null,user)
             }


         });

        }



    };


    Controller.updateUser = function(req,res){


        async.waterfall([

            avoidEmailDuplication,
            updateUser

        ], function(err,user){

            if(err){


                if(err.status)
                {

                    app.responder.send(err.status, res, err.errorMessage, err.detail);

                }
                else {

                    app.responder.send(500, res, 'Server Error', err);
                }

            }
            else{




                app.responder.send(200,res,'User Updated Successfully', user);
            }



        });


        function avoidEmailDuplication(callback){



            User.findOne({'_id':{$ne:req.params.id},'email': req.body.email},function(err,user){
                if(err){

                    callback(err)
                }
                else{

                   if(user){

                       callback({


                           status: 409,
                           errorMessage: "Conflict",
                           detail: "Creation of Duplicate Email is Forbidden"

                       })

                   }
                    else{

                       callback(null)
                   }


                }

            })


        }


        function updateUser(callback){

            User.findOneAndUpdate({'_id': req.params.id , deleted: false} , req.body,{ "new" : true}, function(err,user){

                if(err){

                    callback(err)

                }
                else{

                    if(!user){
                        callback({
                            status: 404,
                            errorMessage: "Not Found",
                            detail: "User is invalid or deleted !"
                        })

                    }
                    else{

                        callback(null,user);
                    }

                }

            })


        }




    };

    Controller.deleteUser = function (req, res) {


        async.waterfall([


            deleteUser


        ], function (err, user) {
            if (err) {
                if (err.status) {

                    app.responder.send(err.status, res, err.errorMessage, err.detail);

                }
                else {

                    app.responder.send(500, res, 'Server Error', err);
                }

            }

            else {
                app.responder.send(200, res, 'User deleted', user);
            }

        });



        function deleteUser(callback) {


            User.findOneAndUpdate({_id: req.params.id, deleted: false}, {deleted: true}, function (err, user) {
                if (err) {
                    callback(err)
                }
                else {
                    callback(null,'True')
                }
            });
        }

    };





    Controller.getAllUser = function(req, res){

      req.query.limit = parseInt(req.query.limit);
      req.query.skip = parseInt(req.query.skip);
        var query = {deleted: false};


        User.find(query)
          .limit(req.query.limit)
          .skip(req.query.skip)
            .exec( function(err, user){
                if(err)
                {
                    app.responder.send(500, res, 'Server Error', err);
                }
                else{

                    if(user)
                    {

                        app.responder.send(200, res, 'Users', user);

                    }

                    else{

                        app.responder.send(200,res,'User Not Found',[]);

                    }

                }
            });




    };

    return Controller;
};
