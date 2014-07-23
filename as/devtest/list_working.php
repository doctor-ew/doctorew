<?php
	require_once('Browser.php');
	$browser = new Browser();
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset=utf-8 /> <title>HTML5 complete</title>
		<!--[if IE]> <script src="http://www.adultswim.com/tools/js/html5.js"></script> <![endif]-->
		<style> article, aside, figure, footer, header, hgroup, menu, nav, section { display: block;} </style>
		<script type="text/javascript" src="https://www.google.com/jsapi"></script>
		
		<script>
			google.load("jquery", "1.7.1");
			google.load("jqueryui", "1.8.16");
 		</script>
		<script src="http://www.adultswim.com/tools/js/jquery/jquery.cookie.js"></script>
		<script src="http://www.adultswim.com/dev/modernizr.custom.91902.js"></script>
		<style>
			li:hover, li:active{
				width:400px!important;
			}
		</style>
	</head>
	<body>
		<div id="pod6">
			<div id="wrongy" class="ew_a_floater"><span>Left</span></div>
		
		<div class="widget-inside" style="display: block;">
			<form method="post" action="">
				<div class="widget-content">
					<ul id="list-left" class="ui-sortable" style="">
						<li class="listItem-li" id="listItem_0" style=""><img width="16" height="16" class="handle" alt="move" src="http://i.cdn.turner.com/adultswim/shows/robot-chicken/img/rcdc/video/move-arrow.png">When Harry Met Sally</li>
						<li class="listItem-li" id="listItem_1" style=""><img width="16" height="16" class="handle" alt="move" src="http://i.cdn.turner.com/adultswim/shows/robot-chicken/img/rcdc/video/move-arrow.png">Rock Biter's Hands</li>
						<li class="listItem-li" id="listItem_2" style=""><img width="16" height="16" class="handle" alt="move" src="http://i.cdn.turner.com/adultswim/shows/robot-chicken/img/rcdc/video/move-arrow.png">Super Heaven</li>
						<li class="listItem-li" id="listItem_3" style=""><img width="16" height="16" class="handle" alt="move" src="http://i.cdn.turner.com/adultswim/shows/robot-chicken/img/rcdc/video/move-arrow.png">Cowboys and Indians</li>
						<li class="listItem-li" id="listItem_4" style=""><img width="16" height="16" class="handle" alt="move" src="http://i.cdn.turner.com/adultswim/shows/robot-chicken/img/rcdc/video/move-arrow.png">Sheep Battle</li>
						<li class="listItem-li" id="listItem_5" style=""><img width="16" height="16" class="handle" alt="move" src="http://i.cdn.turner.com/adultswim/shows/robot-chicken/img/rcdc/video/move-arrow.png">The Grinch's Heart</li>
						<li class="listItem-li" id="listItem_6" style=""><img width="16" height="16" class="handle" alt="move" src="http://i.cdn.turner.com/adultswim/shows/robot-chicken/img/rcdc/video/move-arrow.png">Dengar on the Elevator</li>
						<li class="listItem-li" id="listItem_7" style=""><img width="16" height="16" class="handle" alt="move" src="http://i.cdn.turner.com/adultswim/shows/robot-chicken/img/rcdc/video/move-arrow.png">Humping Robot's Happy Ending</li>
						<li class="listItem-li" id="listItem_8" style=""><img width="16" height="16" class="handle" alt="move" src="http://i.cdn.turner.com/adultswim/shows/robot-chicken/img/rcdc/video/move-arrow.png">The Emmy Award Winning Robot Chicken</li>
						<li class="listItem-li" id="listItem_9" style=""><img width="16" height="16" class="handle" alt="move" src="http://i.cdn.turner.com/adultswim/shows/robot-chicken/img/rcdc/video/move-arrow.png">Michael Jackson's Giant Dancing Robot</li>
						<li class="listItem-li" id="listItem_10" style=""><img width="16" height="16" class="handle" alt="move" src="http://i.cdn.turner.com/adultswim/shows/robot-chicken/img/rcdc/video/move-arrow.png">One Sided Fist Fights</li>
						<li class="listItem-li" id="listItem_11" style=""><img width="16" height="16" class="handle" alt="move" src="http://i.cdn.turner.com/adultswim/shows/robot-chicken/img/rcdc/video/move-arrow.png">Cool Cats</li>
					</ul>
				</div>
			</form>
		</div>


			<div id="righty" class="ew_a_floater"><p>Right</p><p>Right</p><p>Right</p><p>Right</p><p>Right</p><p>Right</p><p>Right</p><p>Right</p><p>Right</p><p>Right</p><p>Right</p><p>Right</p><p>Right</p><p>Right</p></div>

</div>
	<script>
			var strBrowser = "<?php echo $browser->getBrowser();?>";
			var strBrowser_ver = "<?php echo $browser->getVersion();?>";

<?php require_once("list_working_js.php"); ?>
	</script>
	</body>
</html>
