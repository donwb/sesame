
/*
 * GET home page.
 */

exports.index = function(req, res){
	console.log('req body: ' + req.body.from);
  res.render('index', { title: 'Express' })
};