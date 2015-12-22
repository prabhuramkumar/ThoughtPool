module.exports = {
	development : {
		app : {
			name : 'Thola',
			port : process.env.PORT || 3000,
			mongoUrl: 'mongodb://localhost:27017/Thola'
		},
		passport: {
			strategy : 'saml',
			saml : {
				path : '/login/callback',
				entryPoint : 'https://thoughtworks.oktapreview.com/app/thoughtworks_thola_1/exk5ef234whg4Xo090h7/sso/saml',
				issuer : 'passport-saml'			}
		},
		googleAuth : {
	        clientID      : '652660183776-3flm1st7t9c0bu0epktro3eruv472kte.apps.googleusercontent.com',
	        clientSecret  : '0NaHD3Oyp1Xak9CRihsLBJSo',
	        callbackURL   : 'http://localhost:3000/auth/google/callback'
	    }
	},

	production : {
		app : {
			name : 'Thola',
			port : process.env.PORT || 3000,
			mongoUrl: process.env.MONGOLAB_URI ||'mongodb://localhost:27017/Thola'
		},
		passport: {
			strategy : 'saml',
			saml : {
				path : '/login/callback',
				entryPoint : 'https://thoughtworks.oktapreview.com/app/thoughtworks_thola_1/exk5ef234whg4Xo090h7/sso/saml',
				issuer : 'passport-saml'			}
		},
		googleAuth : {
	        clientID      : '652660183776-3flm1st7t9c0bu0epktro3eruv472kte.apps.googleusercontent.com',
	        clientSecret  : '0NaHD3Oyp1Xak9CRihsLBJSo',
	        callbackURL   : 'https://thola.herokuapp.com/auth/google/callback'
	    }
	}

}

