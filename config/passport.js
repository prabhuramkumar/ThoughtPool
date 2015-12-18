var SamlStrategy = require('passport-saml').Strategy;
var config = require('config');

module.exports = function (passport, config) {

	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	passport.deserializeUser(function(user, done) {
		done(null, user);
	});

	passport.use(new SamlStrategy(
	  {
	    path: config.passport.saml.path,
	    entryPoint: config.passport.saml.entryPoint,
	    issuer: config.passport.saml.issuer,
	  },
	  function(profile, done) {
		return done(null,
			{
				id : profile.email,
				email : profile.email,
				firstName : profile.first,
  				lastName : profile.last
			});
	  })
	);

}
