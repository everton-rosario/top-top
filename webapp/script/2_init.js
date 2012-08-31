var production = window.location.href.indexOf('localhost') == -1,
	environment = {
		production  : production,
		page_id     : 370818262966838,
		facebook_id : production ? '366598686721264' : '424890690869239',
		server_url  : window.location.protocol + (production ? '//fortis4.com/futebolsa/' : '//localhost/futebolsa/'),
		namespace   : production ? 'futebolsa' : 'futebolsa-local',
		bucket_url  : window.location.protocol + '//s3.amazonaws.com/futebolsa/',
		permissions : ['publish_actions', 'email']
	};
	
environment.facebook_url = window.location.protocol + '//apps.facebook.com/' + environment.namespace;

$(document).ready(function() {
	FB.Canvas.setAutoGrow(true, 250);	
});