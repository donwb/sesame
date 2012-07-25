config = require('./../config/config');
var db = config.DatabaseConfig;

var mongoose = require('mongoose');

var Schema = mongoose.Schema, ObjectID = Schema.ObjectId;

var Requests = new Schema({
	phone	: {type: String, required: true},
	userid	: {type: String, required: true},
	date 	: {type: String, required: true}
});

var House = new Schema({
    userid			: {type: String, required: true},
    MLS	            : {type: String, required: true},
    key			    : {type: String, required: true},
    propertyName	: {type: String, required: true},
    url				: {type: String, required: true},
    requests		: [Requests]
});

mongoose.connect('mongodb://' + db.user + ':' + db.pass + '@' + db.host + ':' + db.port + '/' + db.name);
mongoose.model('House', House);

var House = mongoose.model('House');

HouseProvider = function(){};

HouseProvider.prototype.getAll = function(callback) {
	House.find({}, function(err, houses){
		callback(null, houses);
	});
};

HouseProvider.prototype.getHouse = function(mls, callback){
	var mlstr = mls.toString();
	//console.log(mlstr);
	House.findOne({MLS:mlstr}, function(err, house){
		callback(null, house);
	});
};

HouseProvider.prototype.getHomesForUser = function(user, callback){
	House.find({userid:user}, function(err, homes){
		//console.log(homes);
		callback(null, homes);
	})
};

HouseProvider.prototype.getHome = function(mls, callback){
	House.findOne({MLS:mls}, function(err, home){
		callback(null, home);
	})
}

HouseProvider.prototype.stamp = function(house, from, to, callback){
	var date = new Date();
	//console.log('date: ' + date);

	house.requests.push({phone: to, userid: from, date: date});
	
	house.save();
	callback(null);
}

HouseProvider.prototype.addListing = function(mls, propname, url, userid, key, callback){
	var listing = new House();
	listing.MLS = mls;
	listing.propertyName = propname;
	listing.url = url;
	listing.userid = userid;
	listing.key = key;

	console.log('saving!');

	listing.save();
	callback(null);
}

HouseProvider.prototype.deleteListing = function(mls, callback){
	House.findOne({MLS:mls}, function(err, house){
		house.remove();
		callback(null);
	});
}


exports.HouseProvider = HouseProvider;



