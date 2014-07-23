var cvpReady;
var b_gold = false;



function handleError() {
    $("#playerarea_container").empty();
    $("#playerarea_container").html("<div id=\"error\">Web Cam Unavailable</div>");
};

var player = new CVP({
    id: 'cvp_generic',
    width: '100%',
    height: '100%',
    flashVars: {
        context: contextID,
        autostart: 'false', //false
        site: 'as',
        profile: '1',
        contentId: contentID,
        baseSwfUrl: '//z.cdn.turner.com/xslo/cvp/core/base/0/2.4.2.1/CVPBase.swf'
    },
    embed: {
        containerSwf: '//z.cdn.turner.com/xslo/cvp/assets/container/2.0.5.1/cvp_qa_container.swf',
        expressInstallSwf: '//z.cdn.turner.com/xslo/cvp/assets/flash/expressInstall.swf',
        options: {
            quality: 'high',
            bgcolor: '#000000',
            allowFullScreen: 'true',
            allowScriptAccess: 'always'
        }
    },
    onPlayerReady: function(playerId) {
        Magic.setCVPReady();
        Magic.b_cvp_exists = true;

    },
    onContentEntryLoadError: function(playerId, contentId, errorMessage, errorCode, queue) {
        console.log("|-o-|", playerId, contentId, errorMessage, errorCode, queue);
        handleError();
    },
    onContentError: function(playerId, contentId, errorMessage) {
        console.log("|-o-|", playerId, contentId, errorMessage);
        handleError();
    }

});

