var production = window.location.href.indexOf('localhost') == -1,
	environment = {
		production  : production,
		facebook_id : production ? '406010089465472' : '259847027468549',
		server_url  : window.location.protocol + (production ? '//fortis4.com/top-top/' : '//localhost/top-top/'),
		namespace   : production ? 'top-top' : 'top-top-local',
		permissions : ['publish_actions', 'email']
	};
	
environment.facebook_url = window.location.protocol + '//apps.facebook.com/' + environment.namespace;
