module.exports = function(app, config, passport, mongoose, fs, path){

    var isAuthenticated = function(req, res, next){
    	if(req.isAuthenticated()){
			return next();
		}
		else {
			res.redirect("/login");
		}
    }

	app.get("/", isAuthenticated, function(req, res){
		res.render("index.html");
	});

	app.get("/form", isAuthenticated, function(req, res){
		res.render("index.html");
	});

	app.get("/list", isAuthenticated, function(req, res){
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
		res.redirect("https://thoughtworks.oktapreview.com");
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
		var user = req.user;
		var request =  mongoose.model('request');
		var newRequest = new request({
			  email: user.email,
			  name: user.firstName + " " + user.lastName,
		      origin: req.body.origin,
		      destination: req.body.destination,
		      via: req.body.via,
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












