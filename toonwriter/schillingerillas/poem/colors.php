<!doctype html>
<?php
//	include_once "hexy.php";

?>

<html>
	<head>
		<title></title>
	</head>
	<body>
		<textarea id="text" cols="50" rows="5" style="overflow: scroll"></textarea>
		<div id="painting"></div>
		
		<script src='https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js'></script>
		<script>
			$(function() {
				$('#text').blur(function(){
					paintIt();
				});
			});

			function paintIt(){
				$.ajax({
					url: 'hexy.php',
					data: {
//						action: $('#text').val(),
						arg: $('#text').val()
					},
					type: 'post',
					success: function(output) {
						console.log('|-o-|',output);
					},
					error: function(e0, e1, e2) {
						console.log('errors:', e0, e1, e2);
					},
					complete: function() {}
				});
			}
		</script>
	</body>
</html>