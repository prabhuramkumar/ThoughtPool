var config =  {
	app : {
		name : 'Thola',
		port : process.env.PORT || 3000
	},
	passport: {
		strategy : 'saml',
		saml : {
			path : '/login/callback',
			entryPoint : 'https://thoughtworks.oktapreview.com/app/thoughtworks_thola_1/exk5ef234whg4Xo090h7/sso/saml',
			issuer : 'passport-saml'			}
	}
}

module.exports = config;