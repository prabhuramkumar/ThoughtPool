require('date-utils');
var sendgrid  = require('sendgrid')("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");

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

	app.get("/search", isAuthenticated, function(req, res){
		res.render("index.html");
	});

	app.get("/login",
		passport.authenticate('google', { scope : ['profile', 'email'] })
	);

	app.get("/auth/google/callback",
		passport.authenticate('google',
			{
				successRedirect : '/',
				failureRedirect: '/login',
				failureFlash: true
			})
	);

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect("/");
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

	app.delete('/api/comments', function (req, res) {
		var requests =  mongoose.model('request');
		var query = {_id: req.body.id};
		requests.remove(query, function(err, result){
	   		if (err) {
	        	console.log(err);
	      	} else {
	      		console.log("pool deleted");
	      	}
	  	});
	});

	app.post('/api/comments', isAuthenticated, function(req, res) {
		var user = req.user;
		var request =  mongoose.model('request');
		var newRequest = new request({
			  email: user.email,
			  name: user.name,
		      originAddress: req.body.originAddress,
		      destinationAddress: req.body.destinationAddress,
		      provider: req.body.provider,
		      time: req.body.time,
		      encodedRoute: req.body.encodedRoute,
		      createdOn: Date.today(),
		      everyday: req.body.everyday
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

 	app.post('/notify', isAuthenticated, function(req, res) {
 		var notifications = req.body.notifications;
 		console.log("notifications");
 		console.log(notifications);

		notifications.forEach(function(notification){
			var payload   = {
			  to      : notification.email,
			  from    : notification.from,
			  subject : notification.subject,
			  html    : notification.html
			}
			sendgrid.send(payload, function(err, json) {
			  if (err) { 
			  	console.error(err); 
			  }else{
			  	res.json(json);
			  }
			});	
		});
		    	
 	});

 	app.get('/user', function (req, res) {
	  res.json(req.user);
	});
}












