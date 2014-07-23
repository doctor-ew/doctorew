
if (typeof(initJQuery) === 'undefined') {
	var script = document.createElement('script');
	script.src = 'http://www.toonwriter.com/codemonkey/got_jQuery.js';
	script.type = 'text/javascript';
	document.getElementsByTagName('head')[0].appendChild(script);
}


try{if ($("#canvass1").length > 0) $("#canvass1").remove();}catch(e){};
$("body").prepend('<canvas id="canvass1" width="100" height="50" style="border: 5px blue solid" />');
var mycontext=$("#canvass1").get(0).getContext('2d');

 //draw left eye
  mycontext.beginPath();
  mycontext.arc(20, 20, 20, 0, Math.PI * 2, true);
  mycontext.closePath();
  mycontext.fillStyle='rgb(100,100,225)';
  mycontext.fill();

  //draw left iris
  mycontext.beginPath();
  mycontext.arc(20, 20, 5, 0, Math.PI * 2, true);
  mycontext.closePath();
  mycontext.fillStyle='rgb(0,0,0)';
  mycontext.fill();

 //draw right eye
  mycontext.beginPath();
  mycontext.arc(80, 20, 20, 0, Math.PI * 2, true);
  mycontext.closePath();
  mycontext.fillStyle='rgb(100,100,225)';
  mycontext.fill();

  //draw right iris
  mycontext.beginPath();
  mycontext.arc(80, 20, 5, 0, Math.PI * 2, true);
  mycontext.closePath();
  mycontext.fillStyle='rgb(0,0,0)';
  mycontext.fill();
