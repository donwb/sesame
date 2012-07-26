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
	var body = req.body.Body.split(' ');

	var from = req.body.From;
	var to = req.body.To;

	// Process body params
	var mls = body[0];
	var param1 = body[1];

	// determine what action to take
	switch(true){
		case (param1 === undefined):
			console.log('key');
			keyRequest(from, to, mls, res);
			break;
		case (param1 === "help"):
			console.log('help');
			helpRequest(mls, res);
			break;
		case (param1.indexOf('@')>-1):
			console.log('email');
			emailRequest(mls, param1, res);
			break;
		default:
			console.log('no match!');
			noMatch(res);
			break;
	}
	
};

function keyRequest(from, to, mls, res){
	// verify they are a user:
	UserProvider.getUserId(from, function(err, user){
		if(user === null){
			HouseProvider.getHome(mls, function(err, home){
				if(home === null){
					var response = createResponse("I'm sorry, I can't find the MLS number: " + mls);
					res.send(response);
				} else {
				UserProvider.getUser(home.userid, function(err, listingAgent){
					var response = createResponse('Please contact ' + listingAgent.firstname + ' ' + 
						listingAgent.lastname + ' at ' + listingAgent.phone + ' for access instructions');
					res.send(response);
				})}
			})
		} else {
			console.log(mls);
			HouseProvider.getHouse(mls, function(err, house){
				if(house === null){
					var response = createResponse("I'm sorry, I can't find the MLS number: " + mls);
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
}

function helpRequest(mls, res){
	var response = createResponse('valid commads are help, and email');
	res.send(response);
}

function emailRequest(mls, email, res){
	var response = createResponse('Thanks for your interest, an email has been sent to ' + email);
	res.send(response);
}

function noMatch(res){
	var response = createResponse('Sorry, invalid command');
	res.send(response);
}
function createResponse(message){
	return responseHead + message + responseTail;
}