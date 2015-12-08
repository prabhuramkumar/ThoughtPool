require('date-utils');

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

	app.get("/myaccount", isAuthenticated, function(req, res){
		res.render("index.html");
	});

	app.get("/create", isAuthenticated, function(req, res){
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

	var getPools = function(query, res){
	  	var requests =  mongoose.model('request');
	
		requests.find(query, function(err, result){
	   		if (err) {
	        	console.log(err);
	      	} else {
	        	res.setHeader('Cache-Control', 'no-cache');
	        	res.json(result);
	      	}
	  	});
	};

	app.get('/api/comments', isAuthenticated, function(req, res) {
		var query = {$or:[{createdOn: {$eq: Date.today()}}, {everyday: {$eq: true}}]};

		getPools(query, res);
	});
	
	app.get('/api/mycomments', isAuthenticated, function(req, res) {
		var myEmailId = req.user.email;
		var query = {email: myEmailId};

		getPools(query, res);
	});

	app.post('/api/comments', isAuthenticated, function(req, res) {
		var user = req.user;
		var request =  mongoose.model('request');
		var newRequest = new request({
			  email: user.email,
			  name: user.firstName + " " + user.lastName,
		      origin: req.body.origin,
		      destination: req.body.destination,
		      originAddress: req.body.originAddress,
		      destinationAddress: req.body.destinationAddress,
		      provider: req.body.provider,
		      time: req.body.time,
		      routeEncoded: req.body.routeEncoded,
		      createdOn: Date.yesterday(),
		      everyday:req.body.everyday
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












