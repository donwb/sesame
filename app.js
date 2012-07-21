var config = require('./config/config');
var express = require('express');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  config.setDevelopmentConfig();
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  config.setProductionConfig();
  app.use(express.errorHandler());
});


app.listen(process.env.port || config.EnvConfig.port, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});


module.exports.app = app;
module.exports.config = config;
require('./routes');