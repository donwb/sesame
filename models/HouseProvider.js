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
    MLS	            : {type: String, required: true},
    key			    : {type: String, required: true},
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
	console.log(mlstr);
	House.findOne({MLS:mlstr}, function(err, house){
		callback(null, house);
	});
};

HouseProvider.prototype.stamp = function(house, callback){
	house.requests.push({phone: '4444', userid: '111', date: 'a date'});
	
	house.save();
	callback(null);
}

exports.HouseProvider = HouseProvider;