<!doctype html>
<html>
	<head>
		<title></title>
	</head>
	<body>
		<div id="tn">
<?php
		$files = glob( '*.jpg' ); // get all file names
		foreach ( $files as $file ) { // iterate files
			echo("<img src='$file' style='margin:5px;width:10%;height:10%;' />"); 	
		}


?>
		</div>
		
		<script src='https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js'></script>
		<script>
			$("#tn img").each(function(){
				$(this).click(function(){
					window.open($(this).attr('src'), 'window name', 'window settings');
					return false;
				});
			});
		</script>
	</body>
</html>

