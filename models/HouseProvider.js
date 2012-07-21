config = require('./../config/config');
var db = config.DatabaseConfig;

var mongoose = require('mongoose');

var Schema = mongoose.Schema, ObjectID = Schema.ObjectId;

var House = new Schema({
    MLS	            : {type: String, required: true},
    key			    : {type: String, required: true}
});

mongoose.connect('mongodb://' + db.user + ':' + db.pass + '@' + db.host + ':' + db.port + '/' + db.name);
mongoose.model('House', House);

var House = mongoose.model('House');

HouseProvider = function(){};

HouseProvider.prototype.getImages = function(callback) {
	House.find({}, function(err, houses){
		callback(null, houses);
	})
};