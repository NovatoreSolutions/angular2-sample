// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
var controllers = require("./server/controllers");
var models = require("./server/models");

var fs = require("fs");
var mongoose = require("mongoose");
var util = require("util");
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var responder = require("./server/utils/responder");
// Get our API routes
var api = require('./server/routes/api');


const app = express();
var db;
db = app.db = mongoose.connect('mongodb://127.0.0.1:27017/angular2calendar', function(err) {
  if (err) {
    console.log(err);
    return process.exit(0);
  }
});

app.getDB = function(schemaName) {
  return db;
};
// Parsers for POST data

app.jwtSecret = "ljdhaisvubfdlkdndfdvfnifudvbfkdisvnofidsbiyxvasiudboin";


app.use(cookieParser());



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

models(app);
controllers(app);



app.authenticator = require("./server/utils/authenticator")(app);
app.all("/api/*", app.authenticator.authenticate);


api(app);
// Set our api routes
//app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3050';
app.set('port', port);

/**
 * Create HTTP server.
 */

  // cross-site scripting XSS -  accept content-type header of application/json
app.use(function(req, res, next) {
  var content_type ="";
  if(req.headers['content-type'] != undefined){
    content_type = req.headers['content-type'];
  }else if(req.headers['Content-Type'] != undefined){
    content_type = req.headers['Content-Type'];
  }
  app.log.debug("req.path ::" + req.path + " :: content-type:" +content_type+ " :: req.method :" +req.method);

  var skipJson = skipJsonCheck(res, req.path);
  if(skipJson){
    next();
  }else{

    var is_json = /json/i.test(content_type),
      is_multipart = /multipart/i.test(content_type);

    if ('GET' === req.method || 'DELETE' === req.method || is_multipart || is_json) {
      next();
    } else {
      app.responder.send(401, res, 'Only accepts content-type header as application/json');
    }
  }
});

app.responder = responder(app);
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
