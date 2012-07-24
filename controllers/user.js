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

	res.render('add.jade', {layout: false, userid: userid});
	
};

exports.createListing = function(req, res){
	var mls = req.body.mls;
	var propName = req.body.propName;
	var url = req.body.url;
	var key = req.body.key;
	var userid = req.body.userid;

	HouseProvider.addListing(mls, propName, url, userid, key, function(err){
		res.redirect('/user/' + userid)
	})

}