<!DOCTYPE HTML>
<!--
/*
 * Photobox
 *
 * Copyright 2012, Yair Even Or
 * https://dropthebit.com
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
-->
<html lang="en">
<head>
	<!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><![endif]-->
	<meta charset="utf-8">
	<title>Photobox - CSS3 image gallery modal viewer</title>
	<meta name="description" content="A lightweight CSS3 image gallery that is pretty to look and and easy to use">
	<meta name="viewport" content="width=device-width">
	<link rel="shortcut icon" href="favicon.ico"/>
	<link rel="stylesheet" href="styles.css">
	<link rel="stylesheet" href="photobox/photobox.css">
	<!--[if lt IE 9]><link rel="stylesheet" href="photobox/photobox.ie.css"><![endif]-->
	<!--[if lt IE 9]><script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
	<script src='photobox/photobox.js'></script>
</head>
<body>
	<div id='wrap'>
		<div class='main'>
			<h1>The Big Event</h1>
			<h2>Photos of a real knock out and her friends</h2>
		</div>
		<ul id='gallery'></ul>
	</div>
	<script src='main.js'></script>
	<script type="text/rocketscript">
		var _gaq = _gaq || [];
		_gaq.push(['_setAccount', 'UA-26520680-1']);
		_gaq.push(['_trackPageview']);

		(function() {
			var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		})();
	</script>
</body> 
</html>
