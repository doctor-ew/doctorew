<!doctype html>
<html>
<head>
  <title></title>
  <style type="text/css">
		  input.class {
				display: block;
				margin: 10px;
			}
			#paper {
				border:1px solid #000!important;
				min-height: 100px;
				min-width: 100px;
			}
			#paper .line {
				border:1px solid #000!important;
				height: 100px;
				min-width: 100px;
				margin: 25px auto;
			}
			#paper .clone_write {
				margin-top: 75px;
			}
			#paper .line span.letter{
				border:1px solid #000!important;
				display: inline-block;
				height:80px;
				margin:5px;
				width:80px;
				text-align:  center;
			}
			.letter strong {
				font-size: 24px;
				height: 80px;
				line-height: 80px;
			}
			#paper .line span.space{
				display: inline-block;
				height:40px;
				margin:5px;
				width:40px;
			}
			.wrapit {
				background: rgba(127,127,127,.5);
				display: inline-block;
				height: 100px;
			}
			.hide{
				display:none;
			}
			.showme{

			}

  </style>
</head>

<body>
  <form>
	<input class="text" data-index="0" />
	<span id="controls"><span class="showex"><label for="show_example">Show Example</label><input type="checkbox" name="show_example" id="show_example" /></span></span>
  </form>

  <div id="paper"></div>
  <script src='https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js' type="text/javascript"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js"></script>
	<script src='tools/js/jquery.auto_grow_input.js' type="text/javascript"></script>
	<script type="text/javascript">
	$().ready(function() {
		setInputAG();
	});

	function setInputAG() {
		$("input.text").each(function(i) {
			$(this).attr("id", "input_" + i).attr("data-index", i).autoGrowInput({
				comfortZone: 50,
				minWidth: 200,
				maxWidth: 2000
			});
			$("#paper").append('<div id="line_' + i + '" class="line_holder wrapper" data-index="' + i + '"><div class="line"></div></div>');
		});

		$("input").live("keyup", function(e) {
			var textValue = $(this).val();
			switch (e.keyCode) {
			case 9:
			case 13:
			case 16:
			case 19:
			case 20:
			case 27:
			case 33:
			case 34:
			case 35:
			case 36:
			case 37:
			case 38:
			case 39:
			case 40:
			case 44:
			case 45:
			case 144:
				break;
			case 8:
				//console.log("(-o-)", $("#line_" + $(this).attr("data-index") + " span:eq(" + parseInt($('input:eq(0)').prop("selectionStart")) + ")"));
				$("#line_" + $(this).attr("data-index") + " span:eq(" + parseInt($('input:eq(0)').prop("selectionStart")) + ")").remove();
				break;
			default:
				//console.log("|-o-|", textValue.substr(textValue.length - 1), e.keyCode);
				setText($(this).attr("data-index"), textValue.substr(textValue.length - 1));
				break;
			}
		}).blur(function() {
			encapsultate();
		});
		$("#show_example").change(function() {
			$('.line').each(function(i) {
				$('#line_' + i).clone().attr('id', '#line_' + i + '_clone_example').addClass('showme clone dont_count').prependTo('#paper');
				$('#line_' + i).clone().attr('id', '#line_' + i + '_clone_write').addClass('clone_write clone dont_count').appendTo('#paper');
			});
			$('.showme .hide').removeClass('hide');
		});

	}
	function setText(index, text) {
		if (text !== " ") {
			$("#line_" + index + " .line").append('<span class="letter"><strong class="hide">' + text + '</strong></span>');
		} else {
			$("#line_" + index + " .line").append('<span class="space"></span>');
		}
	}

	function getWidth() {
		$sum = 0;
		$('.line:not(.dont_count) span:not(.dont_count)').each(function() {
			$sum += $(this).width();
		});
		return ($sum);
	};
	function scaleToSize(){
		if(getWidth() >= $(".line").width()){
//			$('.line:not(.dont_count) span:not(.dont_count)').css({'height':'80px','width':'80px'}).effect('scale', {percent:80}, 100);

			var len = $('.line:not(.dont_count) span:not(.dont_count)').length;
			var t_width = getWidth();
			var l_width = $(".line").width();
			var n_percent = Math.floor((l_width/len));
			var n_percentage = (n_percent / 100);
			console.log(len,t_width,l_width,"||",n_percent);

			$('.line:not(.dont_count) span:not(.dont_count)').each(function () {
			    $(this).resizable({
			        alsoResize: $(this),
			        aspectRatio: true //,
			    }).effect('scale', {percent:n_percent}, 100);
			    console.log('%',n_percent,n_percentage);

				$(this).find('strong').css({'height':($(this).height() * n_percentage),'line-height':($(this).height() * n_percentage) + 'px'});
			});

		}

	}

	function encapsultate() {
		$(".line span").each(function() {
			if ($(this).hasClass('letter') && $(this).next().hasClass('letter')) {
				$(this).nextUntil('.space').andSelf().wrapAll('<span class="wrapit dont_count"></span>');
				$('.wrapit > .wrapit .letter').unwrap();
			};
		});
		scaleToSize();

	}

  </script>
</body>
</html>
