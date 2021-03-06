AUTH_N_STATUS = false;
var contentID, contextID;
var Magic = {
    b_cvp_exists: false,
    b_cvpReady: false,
    b_cvp_watch_magic: false,
    b_is_auth: false,
    b_is_cvp: false,
    b_is_marathon: false,
    b_loaded_auth: false,
    b_loaded_player: false,
    contentID: '',
    contextID: '',
    int_index: 0,
    obj_the_player: '',
    obj_the_xml: '',
    embedCVPPlayer: function() {
        Magic.obj_the_player.embed("playerarea");
    },
    getToggle: function(toggle) {
        //        console.log("|-o-| get", toggle, typeof toggle);
        return this.stringToBoolean(this[toggle]);
    },
    setCVPReady: function() {
        Magic.obj_the_player.setDataSrc(Magic.obj_the_xml);
        Magic.b_cvpReady = true;
    },
    setToggle: function(toggle, value) {
        //        console.log("(-o-) set", toggle, value, typeof value);
        this[toggle] = this.stringToBoolean(value);
    },
    stringToBoolean: function(string) {
        //        console.log("{-o-} bool", string, typeof string);
        if (typeof string === "string") {
            switch (string.toLowerCase()) {
                case "true":
                case "yes":
                case "1":
                    return true;
                case "false":
                case "no":
                case "0":
                case null:
                    return false;
                default:
                    return string;
            }
        } else if (typeof string === "boolean") {
            return string;
        }
    }
};

function doAuthMagic() {
    try {
        Magic.obj_the_player.pause();
        if (Magic.b_is_cvp && Magic.b_is_auth) {
            Magic.obj_the_player.stop();
            gearsInMotion();
        }
        Magic.b_loaded_auth = true;
    } catch (e) {
        setTimeout('doAuthMagic()', 1000);
        console.log("[-o-]playerMagic error:", e);
    }
};

function doPlayerMagic() {
    try {
        Magic.embedCVPPlayer();
        console.log("player embeded");
    } catch (e) {
        console.log("[-o-]playerMagic embed error:", e);
    }

    try {
        setTimeout('Magic.obj_the_player.pause();console.log("player paused")', 600);
    } catch (e) {
        console.log("[-o-]playerMagic pause error:", e);
    }

    if (!Magic.b_is_auth) {
        try {
            setTimeout('Magic.obj_the_player.resume();console.log("player resumed Magic.b_is_auth:" + Magic.b_is_auth)', 1000);
        } catch (e) {
            console.log("[-o-]playerMagic resume error:", e);
        }

    } else {

        try {
            Magic.obj_the_player.stop();
        } catch (e) {
            console.log("[-o-]playerMagic stop error:", e);
        }

        try {
            if (Magic.b_is_cvp) {
                if (AUTH_N_STATUS && Video.token.mvpd !== 'no play') {
                    console.log("player resumed AUTH_N_STATUS:" + AUTH_N_STATUS + " && " + Video.token.mvpd);
                    Magic.obj_the_player.resume();
                } else if (!AUTH_N_STATUS || Video.token.mvpd == 'no play') {

                    try {
                        Magic.obj_the_player.stop();
                    } catch (e) {
                        console.log("[-o-]playerMagic error:", e);
                    }
                }
            }
        } catch (e) {
            console.log("[-o-]playerMagic error:", e);
        }
    }
    //} catch (e) {
    //    setTimeout('doPlayerMagic()', 1000);
    //    console.log("[-o-]playerMagic error:", e);
    //}

};

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

function loadAuthScript() {
    if (!Magic.b_loaded_auth) {
        $.getScript("../tools/js/gold-login-cvp_magic.js")
            .done(function(script, textStatus) {
                setTimeout('doAuthMagic()', 1000);
                Magic.b_loaded_player = true;
                console.log("{-o-}{-o-}{-o-}", script, textStatus);
            })
            .fail(function(jqxhr, settings, exception) {
                console.log("Triggered ajaxError handler.", exception, jqxhr, jqxhr.status, settings);
            });
    } else {
        console.log("{-o-}{-o-}{-o-} auth lib loaded");
        //        setTimeout('doAuthMagic()', 1000);
    }
};

function loadCVPPlayerScript() {
    if (!Magic.b_loaded_player) {
        $.getScript("../tools/js/cvp_watch_magic.js")
            .done(function(script, textStatus) {
                setPlayerParam();
                console.log("|-o-||-o-||-o-|", script, textStatus);
                Magic.b_loaded_player = true;
            })
            .fail(function(jqxhr, settings, exception) {
                console.log("Triggered ajaxError handler.", exception, jqxhr, jqxhr.status, settings);
            });
    } else {
        console.log("|-o-||-o-||-o-| player lib loaded");
        setTimeout('setPlayerParam()', 1000);
    }

};

function loadDSPlayerScript() {
    var params = {
        allowscriptaccess: 'always',
        allownetworking: 'all',
        allowfullscreen: true,
        base: '../tools/swf/',
        wmode: 'transparent'
    };
    var attrs = {
        id: Magic.contextID,
        name: Magic.contextID
    };
    swfobject.embedSWF('../tools/swf/sitevplayer_dev.swf', 'playerarea', '100%', '100%', '9', false, {
        configURL: 'player_configs/watch_player_dev.xml',
        JSEventHandler: 'fn_DS_videoEvents'
    }, params, attrs, function(e) {
        console.log(e);
    })
};

function setPlayerParam() {
    if (typeof player === "undefined" && typeof TVEPlayer === "object" && typeof TVEPlayer.TURNERPLAYER === "object") {
        b_gold = true;
        Magic.obj_the_player = TVEPlayer.TURNERPLAYER;
        Magic.obj_the_xml = "/astv/mvpd/services/cvpXML.do?id=" + Magic.obj_the_player.getContext();
    } else if (typeof player === "object" && typeof TVEPlayer === "undefined") {
        b_gold = false;
        Magic.obj_the_player = player;
        Magic.obj_the_xml = (Magic.b_is_cvp && !Magic.b_is_marathon) ? "/astv/mvpd/services/cvpXML.do?id=" + Magic.obj_the_player.getContentId() : "../tools/xml/" + Magic.obj_the_player.getContentId() + ".xml";


    }
    if (Magic.b_is_auth) {
        //        alert("Loading Auth Script: " + Magic.b_is_auth);
        loadAuthScript();
    }
    try {
        setTimeout('doPlayerMagic()', 1000);
    } catch (e) {
        console.log("PlayerMagic error!:", e);
    }
};


function fn_DS_loadMedia() {
    console.log('loadMedia');
    $.getScript("../tools/js/pageObj.js")
        .done(function(script, textStatus) {
            fn_DS_setMedia();
            console.log("|-o-||-o-||-o-|", script, textStatus);
        })
        .fail(function(jqxhr, settings, exception) {
            console.log("Triggered ajaxError handler.", exception, jqxhr, jqxhr.status, settings);
        });

}

function fn_DS_setMedia() {
    console.log('setMedia');
    Magic.media = {
        segmentIndex: index,
        segmentID: pageObj.data_segment_ids.split("#")[index],
        episodeID: 'AS-' + pageObj.data_episode_id,
        customID: 'AS-' + pageObj.data_episode_id,
        title: pageObj.data_title,
        contentType: pageObj.d_episodeType,
        collectionTitle: pageObj.d_collectionTitle,
        collectionID: pageObj.data_collection_id,
        // videoPageURL: 'http://video.adultswim.com/',
        sectionID: pageObj.d_scarlettId,
        duration: pageObj.data_segment_durations.split("#")[index],
        rating: pageObj.d_collectionRating
    };
    Magic.obj_the_player.setMedia(Magic.media);

}

function fn_DS_videoEvents(p_event) {
    console.log('player:', p_event, p_event.type);
    switch (p_event.type) {
        case 'playerInitSucceeded':
            Magic.obj_the_player = swfobject.getObjectById(Magic.contextID);
            fn_DS_loadMedia();
            break;
        case 'playerInitFailed':
            console.log("FAIL:", p_event);
            break;
        case 'contentPlayEnded':
            Magic.int_index = Magic.int_index + 1;
            Magic.setToggle('b_is_auth', 'false');
            Magic.setToggle('b_is_cvp', 'true');
            init();
            //            $("#playerarea_container").after('<h2>This stream will require you to log in in: <span class="timer"></span></h2>');
//            setAuthTimer();
            break;
        case 'adPlayStarted':
            break;
        case 'adPlayEnded':
            break;
        case 'contentPlaylistFailed':
            break;
        default:
            break;
    }
};

function setAuthTimer() {
    $("#player_notes").append('<div id="paca"><h1 id="timer_h1" class=".playerarea_container_after">This stream will require you to log in: </h1><div id="timer_span" class=".playerarea_container_after"></div></div>');
    $("#timer_span,.cntDigit").css({
        'height': '77px',
        'overflow': 'hidden'
    });
    $("#timer_span").countdown({
        image: 'http://jquery-countdown.googlecode.com/svn/trunk/img/digits.png',
        startTime: '00:60',
        timerEnd: function() {
            $(".playerarea_container_after").remove();
            Magic.setToggle('b_is_auth', 'true');
            Magic.setToggle('b_is_cvp', 'true');
            init();
        },
        format: 'mm:ss'
    });
}

function init() {

    /*
    Magic.b_is_auth = Magic.getToggle('b_is_auth') || false;
    if (getParameterByName("Magic.b_is_auth") > 0) {
        Magic.b_is_auth = Magic.stringToBoolean(getParameterByName("Magic.b_is_auth"));
    }

    Magic.b_is_cvp = Magic.getToggle('b_is_cvp') || false;
    if (getParameterByName("Magic.b_is_cvp") > 0) {
        Magic.b_is_cvp = Magic.stringToBoolean(getParameterByName("Magic.b_is_cvp"));
    }

    Magic.contentID = Magic.contentID || (Magic.b_is_cvp) ? 'adultswim_preview_3' : '8a250ba12db9aa4a012dbe1f1739007b'; //331864 # 8a250ba12db9aa4a012dbe1f1739007b # 8a250ba12db9aa4a012dbe1f6e45007d
    Magic.contextID = Magic.contextID || 'live_preview_3';
*/
    Magic.b_is_auth = (/([\d]+([\w])?){4,10}/).test($(".thumb:eq(" + Magic.int_index + ") p").attr("data_id"));
    Magic.b_is_cvp = ($(".thumb:eq(" + Magic.int_index + ") p").attr("data_id").length < 32);

    Magic.b_is_marathon = (Magic.b_is_cvp && (/preview/).test($(".thumb:eq(" + Magic.int_index + ") p").attr("data_id")));

    Magic.contentID = $(".thumb:eq(" + Magic.int_index + ") p").attr("data_id");
    Magic.contextID = Magic.contextID || 'live_preview_3';

    $("#playerarea_container").empty().html('<div id="playerarea"></div>');


    contentID = Magic.contentID;
    contextID = Magic.contextID;

    if (Magic.b_is_cvp) {
        loadCVPPlayerScript();
    } else {
        loadDSPlayerScript();
    }
};

jQuery(function() {
    init();
});
