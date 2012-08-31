<html>
<head>
    <title>Top-Top</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="user-scalable=no, width=device-width">
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="apple-mobile-web-app-status-bar-style" content="black"/>

    <link href='http://fonts.googleapis.com/css?family=Peralta' rel='stylesheet' type='text/css'>
	<style>
		<?php includeFiles('style/*.css') ?>
	</style>
	<script src="//connect.facebook.net/en_US/all.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" type="text/javascript"></script>
	<script>
		<?php includeFiles('script/*.js') ?>
	</script>
</head>
<body>
	<div id="fb-root"></div>
	<?php includeFiles('page/*.php') ?>
</body>
</html>
<?php
	function includeFiles($pattern) {
		$files = glob($pattern);
		sort($files);
		foreach($files as $file) {
			include $file;
		}
	}
?>