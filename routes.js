app = module.parent.exports.app;
var SiteController = require('./controllers/site');
var UserController = require('./controllers/user');

app.get('/', SiteController.index);
app.get('/test', SiteController.test);
app.post('/getkey', SiteController.getkey);

app.get('/user/:id', UserController.index);
app.get('/user/showings/:id', UserController.showings);
app.get('/user/listing/:id', UserController.addListing);
app.post('/user/listing/add', UserController.createListing);
