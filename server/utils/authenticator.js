/**
 * Created by macbookpro on 2/17/16.
 */

var jwt = require('jwt-simple');




module.exports  = function(app){

    var exceptions = [
            {
                url: '/api/sign-in'
            },
            {
                url: '/api/contact',
                method: 'GET'
            }
        ],
        exceptionFound,
        url,
        method,
        secret;

    secret = app.jwtSecret;

    return {
        authenticate : function(req, res, next) {

            console.log("Authentication");

            console.log(req.originalMethod);
            url = req.url, method = req.originalMethod,
                exceptionFound = false;

            for (var i = 0; i < exceptions.length; i++) {
                //if (url.match(exceptions[i]) && method == 'GET') {
                //    exceptionFound = true;
                //    break;
                //}

                if  ( url.match(exceptions[i].url) && (!exceptions[i].method || exceptions[i].method == method)) {
                    exceptionFound = true;
                    break;
                }
            }


            if (exceptionFound)
            {
                //app.log.info("User is Authorized!!!");
                console.log("User is Authorized");
                next();
            }
            else {
                try
                {
                    if(!req.headers.token)
                    {
                        app.responder.send(401, res, 'Unauthorized', 'Token is empty');
                    }
                    else
                    {

                      console.log("token in authenticator", req.headers.token)
                        var decodedObj = jwt.decode(req.headers.token, secret);
                        if (decodedObj.exp <= Date.now()) {

                            app.responder.send(401, res, 'Unauthorized', 'Error token Validation');

                        }
                        else {
                            req.userID = decodedObj.userID;
                            req.adminID = decodedObj.adminID;


                            next();
                        }
                    }
                }

                catch (err) {

                    app.responder.send(401, res, 'error validating token', 'failed to verify user');
                }
            }
        }
    };
};
