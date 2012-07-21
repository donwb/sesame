var HouseProvider = require('./../models/HouseProvider').HouseProvider;
var HouseProvider =  new HouseProvider();

exports.index = function(req, res){
	res.render('index.jade', {layout: true, locals:{title: 'hello'}});
};

exports.post = function(req, res){
	var body = req.body.Body;
	//var message = 'echoing From: ' + from + ' to: ' + req.body.To + ' body: ' + req.body.Body;
	//var response = '<?xml version="1.0" encoding="UTF-8"?><Response><Sms>' + message + '</Sms></Response>'

	console.log(body);
	HouseProvider.getHouse(body, function(err, house){
		if(house === null){
			var message = 'cant find that mls number';
			var response = '<?xml version="1.0" encoding="UTF-8"?><Response><Sms>' + message + '</Sms></Response>'
			res.send(response);			
		}else{
			HouseProvider.stamp(house, function(err){
				console.log(house.key);
				var message = 'They key is: ' + house.key;
				var response = '<?xml version="1.0" encoding="UTF-8"?><Response><Sms>' + message + '</Sms></Response>'
				res.send(response);
			});
		}
	});
};