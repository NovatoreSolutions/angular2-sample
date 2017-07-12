module.exports = function(app) {
    var _         =       require('underscore');
    var fs        =       require('fs');
    var async     =       require('async');
    var crypto      =      require('crypto');
    var bcrypt     = require('bcrypt-nodejs');

    var path      =       require('path');


    var moment    =    require('moment-timezone');
    // var mkdirp	=	require('mkdirp');
    var underscoreDeepExtend  =       require('underscore-deep-extend');

    var jwt = require('jwt-simple');
    var secret = app.jwtSecret;

    var Admin = app.models.Admin;


    var Token = app.models.Token;
    var Controller = {
        name: Admin.modelName
    };

    _.mixin({deepExtend: underscoreDeepExtend(_)});

    var generateHash = function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
    }
    var validPassword = function(password, storedPassword) {
        return bcrypt.compareSync(password, storedPassword);
    };

    function genToken(admin) {
        //var expires = expiresIn(2); // 2 days
        var token = jwt.encode({
            //exp: expires,
            adminID: admin._id
        }, secret);

        return {
            token: token,
            //expires: expires,
            admin: admin
        };


    }
    function expiresIn(numDays)
    {
        var dateObj = new Date();
        return dateObj.setDate(dateObj.getDate() + numDays);
    }


    Controller.signIn = function(req, res) {

        Admin.findOne({email: req.body.email}, function(err, admin){
            if(err)
            {
                app.responder.send(400, res, 'Bad request', 'failed to verify user');
            }
            else if(admin)
            {
                if(!validPassword(req.body.password, admin.password)){
                    app.responder.send(403, res, 'Incorrect password', null);
                }
                else{
                    var sessionObj = genToken(admin, admin._id);
                    app.responder.send(200, res, 'Admin verified successfully', sessionObj);
                }
            }
            else{
                app.responder.send(404, res, 'Admin Does Not Exist', null);
            }
        });
    }






    return Controller;
};
