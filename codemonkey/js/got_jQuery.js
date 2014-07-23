var jQueryScriptOutputted = false;
function initJQuery() {
    //if the jQuery object isn't available
    if (typeof(jQuery) === 'undefined') {
        try{console.log("|-o-| no jQuery");}catch(e){}
        if (! jQueryScriptOutputted) {
            //only output the script once..
            jQueryScriptOutputted = true;
            
            //output the script (load it from google api)

            var jq = document.createElement('script');
             jq.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js';
             jq.type = 'text/javascript';
             document.getElementsByTagName('head')[0].appendChild(jq);

            try{console.log("|-o-| outputting jquery");}catch(e){}
        }
        setTimeout("initJQuery()", 50);
    } else {
                        
        $(function() {  
            //do anything that needs to be done on document.ready

            try{console.log("|-o-| now with 100% more jQuery!");}catch(e){}
        });
    }
            
}
initJQuery();