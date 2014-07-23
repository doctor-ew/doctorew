var jqxhr = $.getJSON("photostream.php", function() {
  alert("success");
})
.success(function() { console.log("second success"); })
		.error(function(xhr, textStatus, errorThrown) {
		console.log('|-o-| error',xhr, textStatus, errorThrown);
.complete(function() { console.log("complete"); });
 
// perform other work here ...
 
// Set another completion function for the request above
jqxhr.complete(function(){ alert("second complete"); });

function xhr_get(url) {

	return $.ajax({
		url: url,
		type: 'get',
		dataType: 'json' //,
//		beforeSend: showLoadingImgFn
	})
		.always(function(data) {
		console.log('|-o-| always',data);
		// remove loading image maybe
	})
		.error(function(xhr, textStatus, errorThrown) {
		console.log('|-o-| error',xhr, textStatus, errorThrown);
		// handle request errors
	})
		.fail(function(data) {
		console.log('|-o-| failure',data.responseCode);
		// handle request failures
	}).done(function(data) {
		console.log('|-o-| success ', data);
		// do stuff with index data
	});

//	xhr_get('photostream.php');

}

// xhr_get('photostream.php').done(function(data) {
// 	console.log('success photo', data);
// 	// do stuff with id data
// });

!(function() {
	'use strict';
	// Get some photos from Flickr for the demo
	$.ajax({
		url: 'photostream.php',
		data: {
			format: 'json',
			method: 'photostream'
		},
		dataType: 'json' //,
		//        jsonp: 'jsoncallback'
	}).fail(function(data) {
		console.log('failure',data,data.responseCode);
	}).done(function(data) {
	console.log('done', data);
	var gallery = $('#gallery'),
		url;
	$.each(data.photos.photo, function(index, photo) {
		// http://www.flickr.com/services/api/misc.urls.html
		url = photo.image;
		var img = $('<img>').prop({
			'src': 't_' + url,
			'title': photo.title
		});

		var link = document.createElement('a'),
			li = document.createElement('li')

			link.href = url + '_b.jpg';
		link.appendChild(img[0]);
		li.appendChild(link);
		gallery[0].appendChild(li);

		// lazy show the photos one by one
		img.on('load', function(e) {
			setTimeout(function() {
				li.className = 'loaded';
			}, 20 * index);
		});
	});

	// finally, initialize photobox on all retrieved images
	$('#gallery').photobox('a', {
		thumbs: true
	}, callback);

	function callback() {
		console.log('loaded!');
	}
});
})();