var HouseProvider = require('./../models/HouseProvider').HouseProvider;
var HouseProvider =  new HouseProvider();
var UserProvider = require('./../models/UserProvider').UserProvider;
var UserProvider =  new UserProvider();

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
	var from = req.body.From;
	var to = req.body.To;

	// verify they are a user:
	UserProvider.getUserId(from, function(err, user){
		if(user === null){
			// This reponse needs to send back the listing agents info, which will
			// come via a query thorough the mls number passed in..
			var response = createResponse('Please contact Don Browning at don.browning@gmail.com ' +  
				'for more information and access instructions');
			res.send(response);
		} else {
			console.log(body);
			HouseProvider.getHouse(body, function(err, house){
				if(house === null){
					var response = createResponse('cant find that mls number');
					res.send(response);			
				}else{
					HouseProvider.stamp(house, user.id, to, function(err){
						console.log(house.key);
						
						var response = createResponse('Hi ' + user.firstname + ' the key is: ' + house.key);
						res.send(response);
					});
				}
			});
		}
	});	
};

function createResponse(message){
	return responseHead + message + responseTail;
}