var SamlStrategy = require('passport-saml').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function (passport, config) {

	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	passport.deserializeUser(function(user, done) {
		done(null, user);
	});

	passport.use(new GoogleStrategy(
	  {
	    clientID: config.googleAuth.clientID,
	    clientSecret: config.googleAuth.clientSecret,
	    callbackURL: config.googleAuth.callbackURL,
	  },
	  function(token, refreshToken, profile, done) {

		return done(null,
			{
				id : profile.id,
				token: token,
				name : profile.displayName,
  				email : profile.emails[0].value
			});
	  })
	);

}
