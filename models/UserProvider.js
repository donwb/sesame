config = require('./../config/config');
var db = config.DatabaseConfig;

var mongoose = require('mongoose');

var Schema = mongoose.Schema, ObjectID = Schema.ObjectId;

var User = new Schema({
    userid	        : {type: Number, required: true},
    firstname		: {type: String, required: true},
    lastname		: {type: String, required: true}
});

mongoose.connect('mongodb://' + db.user + ':' + db.pass + '@' + db.host + ':' + db.port + '/' + db.name);
mongoose.model('User', User);

var User = mongoose.model('User');

UserProvider = function(){};

UserProvider.prototype.getUser = function(id, callback) {
	User.findOne({userid:id}, function(err, user){
		callback(null, user);
	});
};

exports.UserProvider = UserProvider;
