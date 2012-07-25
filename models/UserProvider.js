config = require('./../config/config');
var db = config.DatabaseConfig;

var mongoose = require('mongoose');

var Schema = mongoose.Schema, ObjectID = Schema.ObjectId;

var User = new Schema({
    firstname		: {type: String, required: true},
    lastname		: {type: String, required: true},
    phone 			: {type: String, required: true},
    email			: {type: String, required: false},
    url				: {type: String, required: false}
});

mongoose.connect('mongodb://' + db.user + ':' + db.pass + '@' + db.host + ':' + db.port + '/' + db.name);
mongoose.model('User', User);

var User = mongoose.model('User');

UserProvider = function(){};

UserProvider.prototype.getUser = function(id, callback) {
	User.findOne({_id:id}, function(err, user){
		callback(null, user);
	});
};

UserProvider.prototype.getUserId = function(phonenumber, callback){
	User.findOne({phone: phonenumber}, function(err, user){
		callback(null, user);
	});
};

exports.UserProvider = UserProvider;
