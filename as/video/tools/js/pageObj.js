var index = 0;
var pageObj = {};

pageObj.playerID = "adultswimVideoPlayer";

pageObj.configURL = (location.hostname == 'video.adultswim.com') ? "http://video.adultswim.com/tools/swf/player_configs/watch_player.xml" : "/tools/swf/player_configs/watch_player_dev.xml";

pageObj.playerBase = (location.hostname == 'video.adultswim.com') ? "http://i.cdn.turner.com/adultswim/adultswimtv/tools/swf/" : "/tools/swf/";
pageObj.playerSource = (location.hostname == 'video.adultswim.com') ? pageObj.playerBase + "sitevplayer.swf" : pageObj.playerBase + "sitevplayer_dev.swf";
pageObj.JSEventHandler = 'Player.onPlayerEvent';
pageObj.initialized = false;
pageObj.nextEnabled = true;
pageObj.prevEnabled = false;
pageObj.continuousEnabled = true;
pageObj.sectionID = "as.com-comedy-robot-chicken";
pageObj.titleID = "331864";

pageObj.d_collectionCategoryType = "Comedy";
pageObj.d_collectionDescription = "Robot Chicken";
pageObj.d_collectionRating = "TV-MA";
pageObj.d_collectionTitle = "Robot Chicken";
pageObj.d_duration = "00:17";
pageObj.d_epiBviOverideId = "";
pageObj.d_epiSeasonName = "";
pageObj.d_epiSeasonNumber = "";
pageObj.d_episodeNumber = "50205";
pageObj.d_episodeType = "CLI";
pageObj.d_episodeUrl = "http://video.adultswim.com/robot-chicken/hot-dog-sex.html";
pageObj.d_keywords = "Robot Chicken, Seth Green, Matt Senreich, Terms of Endaredevil, hot dog, mustard, sex, juices";
pageObj.d_launchDate = "01/25/2011 12:00 AM";
pageObj.d_mobile = "T";
pageObj.d_scarlettTitleId = "";
pageObj.d_scarlettId = "331864";
pageObj.d_segmentThumbs = "/8a25c3920ef15683010ef20fc9d2015d/thumbnail_2906193600514264875.jpg";
pageObj.d_seoThumbnailUrl = "http://i.cdn.turner.com/asfix/repository/8a25c3920ef15683010ef20fc9d2015d/robot-chicken-hot-dog-sex.jpg";
pageObj.d_shortenedUrl = "http://asw.im/1NpUVG";
pageObj.d_time = "00:17";

pageObj.id = "adultswim-video-details";
pageObj.data_collection_id = "8a25c3920ef15683010ef20fc9d2015d";
pageObj.data_episode_id = "8a250ba12db9aa4a012dbe1f1739007b";
pageObj.data_segment_ids = "8a250ba12db9aa4a012dbe1f6e45007d";
pageObj.data_segment_durations = "00:17";
pageObj.data_category_type = "Comedy";
pageObj.data_title = "Hot Dog Sex";


