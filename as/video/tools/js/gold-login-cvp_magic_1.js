var Utilities = Utilities || {},
    Video = Video || {};

Video._nDebugCount = Video._nDebugCount || 0;
Video.token = {'mvpd':'no play'};
Magic.b_loaded_auth = true;

Utilities.getTime = function (millisSinceEpoch) {
  var secondsSinceEpoch = (millisSinceEpoch / 1000) | ($.now() / 1000);
  var secondsInDay = ((secondsSinceEpoch % 86400) + 86400) % 86400;
  var seconds = secondsInDay % 60;
  var minutes = ((secondsInDay / 60) | 0) % 60;
  var hours = (secondsInDay / 3600) | 0;
  return hours + (minutes < 10 ? ":0" : ":")
      + minutes + (seconds < 10 ? ":0" : ":")
      + seconds;
}

Video.debugCount = function (){
        var nDebugCount = Video._nDebugCount;
        Video._nDebugCount++;
        return nDebugCount;
    }


var clientId = 'AdultSwim';
var AUTH = null;
var AUTH_READY = false;
var AUTH_N_STATUS = false;
var mvpdConfig = false;
var bIsAuthOK = false;


function initAuth() {
	try{console.log(Utilities.getTime() + ' |-o-|^^^debug^^^ ' + Video.debugCount() + ' >>initAuth called<<');}catch(e){};


    AUTH = CVP.AuthManager.init({
        clientId: clientId,
        mvpdConfigUrl: 'http://z.cdn.turner.com/xslo/cvp/config/as/tve/mvpdconfig.js',
        swfStyleOverride: {
            style: "z-index: 500; position: absolute; display: inline-block;left: 0px; top: 0px;"
        },

        onInitReady: function() {
			try{console.log(Utilities.getTime() + ' |-o-|^^^debug^^^ ' + Video.debugCount() + ' >>AUTH.onInitReady called<<');}catch(e){};
            AUTH_READY = true;
            AUTH.isAuthenticated();
//            gearsInMotion();
/*
            $("footer").css({
                "padding-bottom": "10px"
            });
*/
        },

        onAuthenticationPassed: function(mvpdId, mvpdConfig) {
			try{console.log(Utilities.getTime() + ' |-o-|^^^debug^^^ ' + Video.debugCount() + ' >>AUTH.onAuthenticationPassed called<<');}catch(e){};

            $.colorbox({html:"<div style=\"text-align:center;\"><img src=\"/watch/tools/img/colorbox1/loading_background.png\" width=\"288\" height=\"282\" /></div><h1 style=\"color:#c5c5c5;\">YOUR VIDEO CONTENT IS LOADING</h1>"});

			try {	//track authentication through picker page
				if (typeof(Storage) !== "undefined" && sessionStorage.onpickerpage && sessionStorage.onpickerpage == "yes") {
					trackMetrics({
						type: "picker-pageview",
						data: {
							page_name:	"tve: successful login",
							tve_mvpd:	mvpdId
						}
					});
					sessionStorage.removeItem("onpickerpage");
				}
			} catch (e) {};

            AUTH_N_STATUS = true;

            $("#authStatus").text("Authenticated");
            $("#authText").text("Log Out of Watch");

            $("#authText").addClass("logout");
            $("#authText").removeClass("open_picker");

            $("#authText").attr('onclick', 'logout();');

            $("#mvpdName").html(mvpdConfig.displayName);

            $("#cobrandingImage").append("<img src =\"" + mvpdConfig.cobrand[0].url + "\"/>")

            try {
                console.log(Utilities.getTime(),'[-o-] mvpdId\n\n', mvpdId, clientId, mvpdConfig)
            } catch (e) {};

			try{console.log(Utilities.getTime() + ' |-o-|^^^debug^^^ ' + Video.debugCount() + ' >>About to call AUTH.checkAuthorization<<');}catch(e){};
            AUTH.checkAuthorization(clientId);
			try{console.log(Utilities.getTime() + ' |-o-|^^^debug^^^ ' + Video.debugCount() + ' >>AUTH.checkAuthorization call complete<<');}catch(e){};
        },
        onAuthenticationFailed: function() {
			try{console.log(Utilities.getTime() + ' |-o-|^^^debug^^^ ' + Video.debugCount() + ' >>AUTH.onAuthenticationPassed called<<');}catch(e){};

//            $.colorbox.close();

            AUTH_N_STATUS = false;

            $("#authStatus").text("Authentication Failed");
            $("#authText").text("Open Picker");

            $("#authText").removeClass("logout");
            $("#authText").addClass("open_picker");

            $("#authText").attr('onclick', 'AUTH.getAuthentication();');

        },
        onAuthorizationPassed: function(resource) {
			try{console.log(Utilities.getTime() + ' |-o-|^^^debug^^^ ' + Video.debugCount() + ' >>AUTH.onAuthorizationPassed called<<');}catch(e){};

            $.colorbox({html:"<div style=\"text-align:center;\"><img src=\"/watch/tools/img/colorbox1/loading_background.png\" width=\"288\" height=\"282\" /></div><h1 style=\"color:#c5c5c5;\">YOUR VIDEO EXPERIENCE IS LOADING</h1>"}); //YOUR VIDEO EXPERIENCE IS LOADING


            Video.token = AUTH.getAccessToken();
            var token = AUTH.getAccessToken();
            try {
                console.log(Utilities.getTime(),'authorization passed\n\n' + token.accessToken)
            } catch (e) {};

            $("#authStatus").text("Authorized");
            $("#authText").text("Log Out of Watch");

            $("#authText").addClass("logout");
            $("#authText").removeClass("open_picker");

            Video.bContentAuth = true;
//            Video.playItForMe();
                try{
//                    player.resume();
                    player.play(player.getContentId());
                } catch(e){
                    alert('cannot resume player ' + e);
                }

        },
        onAuthorizationFailed: function(resource, errorCode, errorString) {
			try{console.log(Utilities.getTime() + ' |-o-|^^^debug^^^ ' + Video.debugCount() + ' >>AUTH.onAuthorizationFailed called<<');}catch(e){};
            $("#cboxLoadedContent h1:eq(0)").html(errorString.toUpperCase()).css({'height':'320px','line-height':'22px'});
          $("#colorbox,#cboxWrapper,#cboxContent,#cboxLoadedContent").css({'height':'500px','background':'rgba(0,0,0,1)'});

            $("#cvp_1").css({'visibility':'hidden'});

            try {
                setTimeout('AUTH.logout()', 3000);
            } catch (e) {};

            try {
                console.log(Utilities.getTime(),'authorization failed\n\n' + errorCode + '\n\n' + errorString);
            } catch (e) {};

            $("#authStatus").text("Authorization Failed");
        },
        onTrackingData: function(trackingEventType, trackingData) {
			try{console.log(Utilities.getTime() + ' |-o-|^^^debug^^^ ' + Video.debugCount() + ' >>AUTH.onTrackingData called<<');}catch(e){};
			try { //tracking data
				switch (trackingEventType) {
					case "authorizationDetection" :
						try{console.log(Utilities.getTime() + ' |-o-|^^^debug^^^ ' + Video.debugCount() + ' >>AUTH.onTrackingData authorizationDetection<<');}catch(e){};
						/*  [0] Whether the token request was successful [true/false]
						 *       and if true:
						 *  [1] MVPD ID [string]
						 *  [2] User ID (md5 hashed) [string]
						 *  [3] Whether it was cached or not [true/false]
						 */
						// populate Omniture Metrics
						if (trackingData[0] == true) {
							// if cached == true
							if(trackingData[3] == true) {
								trackAlreadyLoggedInPage(trackingData);
							} else {
								// else just redirected back from authorization
								trackAuthenticationComplete(trackingData);
							}
						} else {
							if (!hasSetFirstMetric) {
								// populate Omniture Metrics
								trackNotLoggedInPage();
								hasSetFirstMetric = true;
							}
						}
					break;
					case "authenticationDetection" :
						try{console.log(Utilities.getTime() + ' |-o-|^^^debug^^^ ' + Video.debugCount() + ' >>AUTH.onTrackingData authenticationDetection<<');}catch(e){};
						/*  [0] Whether the token request was successful [true/false]
						 *       and if true:
						 *  [1] MVPD ID [string]
						 *  [2] User ID (md5 hashed) [string]
						 *  [3] Whether it was cached or not [true/false]
						 */
						if (trackingData[0] == true) {
							setState = true;
							// if cached == true
							if (trackingData[3] == true) {
								trackAlreadyLoggedInPage(trackingData);
							} else {
								// else just redirected back from authorization
								trackAuthenticationComplete(trackingData);
							}
							hasSetFirstMetric = true;
						} else {
							if (!hasSetFirstMetric) {
								// populate Omniture Metrics
								trackNotLoggedInPage();
								hasSetFirstMetric = true;
							}
						}
					break;
					case "mvpdSelection" :
						try{console.log(Utilities.getTime() + ' |-o-|^^^debug^^^ ' + Video.debugCount() + ' >>AUTH.onTrackingData mvpdSelection<<');}catch(e){};
						/*  [0] MVPD ID */
						// populate Omniture Metrics
						trackAuthenticationStart(trackingData);
					break;
					default:
					break;
				}
			} catch (e) {
				
			}
		},
        onPickerHelpClicked: function(state) {
            //window.alert("Go to help page for state '" + state + "'");
            window.location.href = "http://stagingtv.adultswim.com/gold/";
            try {
                console.log(Utilities.getTime(),"Go to help page for state '" + state + "'");
            } catch (e) {};
            try {
                console.log(Utilities.getTime(),'picker help clicked');
            } catch (e) {};
        },
        onMetadataStatus: function(key, value) {
            //alert('Metadata: \n\n' + key + ' = ' + value);
            try {
                console.log(Utilities.getTime(),'Metadata: \n\n' + key + ' = ' + value);
            } catch (e) {};
        },
        onPickerOpened: function() {
            $.colorbox.close();
            try {
//                if($("html").hasClass("ltie9")) {
                    $("#mvpdpicker").css({'top':$("#mvpdpicker").position()['top'] * 0.25});
                    $("#AccessEnabler").css({'top':$("#mvpdpicker").position()['top']});
//                }
            	$("#mvpdpicker .title").html("<span>Login</span>");
                console.log(Utilities.getTime(),'picker opened');
            } catch (e) {};
        },
        onPickerClosed: function() {
            try {
                console.log(Utilities.getTime(),'picker closed');
            } catch (e) {};
        },
        onPickerHelpClicked: function(state) {
            //window.alert("Go to help page for state '" + state + "'");
            window.location.href="/watch/faq.html";
            try {
                console.log(Utilities.getTime(),"Go to help page for state '" + state + "'");
            } catch (e) {};
            try {
                console.log(Utilities.getTime(),'picker help clicked');
            } catch (e) {};
        },
		onPickerMvpdSelected: function(mvpdId) {
			try {
				trackMetrics({	//track provider click
					type: "picker-click",
					data: {
						interaction:	"tve: picker list",
						tve_mvpd:		mvpdId
					}
				});
			} catch(e){}
		},
        onPickerStateChange: function(state) {
            try {
                console.log(Utilities.getTime(),'picker state changed to ' + state);
            } catch (e) {};
            try {
				switch(state) {	//track picker page
					case "findbylogo":
						trackMetrics({
							type: "picker-pageview",
							data: {
								page_name:	"tve: picker: icon",
								tve_mvpd:	""
							}
						});
						if (typeof(Storage) !== "undefined") {
							sessionStorage.onpickerpage = "yes";
						}
						break;
					case "findbyname":
						trackMetrics({
							type: "picker-pageview",
							data: {
								page_name:	"tve: picker: list",
								tve_mvpd:	""
							}
						});
						break;
					case "noprovider":
						trackMetrics({
							type: "picker-pageview",
							data: {
								page_name:	"tve: provider not available",
								tve_mvpd:	""
							}
						});
						break;
				}
                switch(true){
                	case state.match('signin'):
                		$(".slates .signin .signinmessage").text("Sign into your TV Service Provider with your account username and password to watch at no extra cost");
                		break;
                	case state.match('error'):
                		$(".slates .signin .errormessage").text("Sign In Error");
                		break;
                	default:
                		break;
                }
            } catch (e) {};
        }
    });
}

function gearsInMotion() {


    var text = $("#authText");
    if (text.text() == "Open Picker") {
        try {console.log(Utilities.getTime(),"get authentication");} catch (e) {};
        AUTH.getAuthentication();
        onAuthTextClick();
    } else if (text.hasClass("logout")) {
        try {console.log(Utilities.getTime(),"already got authentication");} catch (e) {};
    };
}

function onAuthTextClick() {
    $("#mvpdName").html(mvpdConfig.displayName);
    //  var img = document.createElement("IMG");

    try {
        $("#cobrandingImage").append("<img src =\"" + mvpdConfig.cobrand[0].url + "\"/>");
    } catch (e) {};

}

function logout() {
    if (AUTH_READY) {
        AUTH.logout();
    }
}


$().ready(function() {
/*
    if (typeof TVEPlayer.cvpReady === "undefined" || !TVEPlayer.cvpReady) {
        try {
            TVEPlayer.initCVPPlayer();
        } catch (e) {
            try {console.log(Utilities.getTime(),"&&&&& Unable to init CVP Player. cvpReady:", TVEPlayer.cvpReady);} catch (e) {};
        };
    }
*/

    initAuth();
});
