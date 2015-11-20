module.exports = function(app, config, passport, fs, path){

	var COMMENTS_FILE = path.join(__dirname, 'comments.json');
	var data = [
    	{
    	    "id": 1388534400000,
    	    "origin": "Koramangala",
    	    "destination": "Marathalli",
    	    "via": "ORR",
    	    "seats": "2"
    	}];

    var isAuthenticated = function(req, res, next){
    	if(req.isAuthenticated()){
			console.log("already authenticated");
			return next();
		}
		else {
			res.redirect("/login");
		}
    }

	app.get("/", isAuthenticated, function(req, res){
		res.render("index.html");
	});

	app.get("/login",
		passport.authenticate(config.passport.strategy,
		{
			successRedirect : "/",
			failureRedirect : "/login",
		})
	);

	app.post('/login/callback',
		passport.authenticate(config.passport.strategy,
			{
				failureRedirect: '/',
				failureFlash: true
			}),
		function(req, res) {
			res.redirect('/');
		}
	);

	app.get('/logout', function(req, res) {
		req.logout();
		// TODO: invalidate session on IP
		res.render("logout.html");
	});

	app.get('/api/comments', isAuthenticated, function(req, res) {
	  	var requests =  mongoose.model('request');
	
	  	requests.find(function(err, result){
	   		if (err) {
	        	console.log(err);
	      	} else {
	        	res.setHeader('Cache-Control', 'no-cache');
	        	res.json(result);
	      	}
	  	});
	});
	
	app.post('/api/comments', isAuthenticated, function(req, res) {
	
		var request =  mongoose.model('request');
		var newRequest = new request({
		      origin: req.body.origin,
		      destination: req.body.destination,
		      via: req.body.via,
		      seats: req.body.seats,
		      provider: req.body.provider
		});
		newRequest.save(function (err, result) {
		    if (err) {
		      console.log(err);
		    } else {
		      console.log('documents into the "request" collection are:', result);
		      res.setHeader('Cache-Control', 'no-cache');
		      res.json(result);
		    }
		});	
 	});
}










