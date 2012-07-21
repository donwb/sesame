app = module.parent.exports.app;
var SiteController = require('./controllers/site');

app.get('/', SiteController.index);
app.post('/', SiteController.post);
app.post('/test', SiteController.test);
