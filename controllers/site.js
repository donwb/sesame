var HouseProvider = require('./../models/HouseProvider').HouseProvider;
var HouseProvider =  new HouseProvider();

var responseHead = '<?xml version="1.0" encoding="UTF-8"?><Response><Sms>';
var responseTail = '</Sms></Response>';

exports.index = function(req, res){
	res.render('index.jade', {layout: true, locals:{title: 'hello'}});
};

exports.test = function(req, res){
	res.render('test.jade', {layout: true, locals:{title: 'test'}});
};

exports.getkey = function(req, res){
	var body = req.body.Body;
	
	console.log(body);
	HouseProvider.getHouse(body, function(err, house){
		if(house === null){
			var response = createResponse('cant find that mls number');
			res.send(response);			
		}else{
			HouseProvider.stamp(house, function(err){
				console.log(house.key);
				
				var response = createResponse('the key is: ' + house.key);
				res.send(response);
			});
		}
	});
};

function createResponse(message){
	return responseHead + message + responseTail;
}