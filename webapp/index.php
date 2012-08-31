<html>
<head>
    <title>Top-Top</title>
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