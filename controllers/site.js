var HouseProvider = require('./../models/HouseProvider').HouseProvider;
var HouseProvider =  new HouseProvider();

exports.index = function(req, res){
	res.render('index.jade', {layout: true, locals:{title: 'hello'}});
};

exports.post = function(req, res){
	var from = ('req body: ' + req.body.From);
	var message = 'echoing From: ' + from + ' to: ' + req.body.To + ' body: ' + req.body.Body;
	var response = '<?xml version="1.0" encoding="UTF-8"?><Response><Sms>' + message + '</Sms></Response>'

  res.send(response);
};

exports.test = function(req, res){
	var from = ('req body: ' + req.body.From);
	var message = 'echoing From: ' + from + ' to: ' + req.body.To + ' body: ' + req.body.Body;
	var response = '<?xml version="1.0" encoding="UTF-8"?><Response><Sms>' + message + '</Sms></Response>'

	HouseProvider.getAll(function(err, homes){
		console.log(homes);
	});
  res.send(response);
}