var HouseProvider = require('./../models/HouseProvider').HouseProvider;
var HouseProvider =  new HouseProvider();
var UserProvider = require('./../models/UserProvider').UserProvider;
var UserProvider =  new UserProvider();

exports.index = function(req, res){
	var id = req.params.id;

	UserProvider.getUser(id, function(err, user){
		var id = user.id;

		HouseProvider.getHomesForUser(id, function(err, homes){
			res.render('user.jade', {layout: true, 
			locals:{title: 'Admin', user: user, homes: homes}});
		})
	})
};

exports.showings = function(req, res){

	var userid = req.params.id;

	HouseProvider.getHome(userid, function(err, home){
		console.log(home.requests);
		res.send(home.requests);
	});
};

exports.addListing = function(req, res){
	var userid = req.params.id;

	res.render('add.jade', {layout: false});
	
};