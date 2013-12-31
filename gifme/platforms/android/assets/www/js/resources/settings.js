/////////////////////////////////////////////////////
//
//	GIFME
//	Author: Drew Dahlman ( www.drewdahlman.com )
//	Version: 3.0
//	Date: 08.19.2013
//	File: nav.js
//	
//	Copyright 2013 Gifme.io
//
/////////////////////////////////////////////////////
(function() {
	settings = function() {
		var self = this;

		self.stats;
		self.shrink = function() {
			var shrink = window.localStorage.getItem('url_shrink')
			return shrink;
		}


		self.init = function() {
			_gifme.api.get("/user/" + _gifme.user + "/stats/", function(data) {
				$("#modal").fadeOut();
				self.stats = {
					user: data.users[1],
					gifs: data.meta.gifs,
					tags: data.meta.tags,
					shares: data.meta.shares,
					url: data.meta.url,
					id: data.users[0]
				}

				_gifme.content.html(_gifme.templates.settings(self.stats));
				_gifme.content.width('95%');

				// logout
				$("#logout").bind('touchend', function() {
					window.localStorage.removeItem('uuid')

					// _gifme.user = null;
					// _gifme.init();
					window.location.reload();

				});

				// Shrink
				// $("#shrink").change(function() {
				// 	if (this.checked) {
				// 		window.localStorage.setItem('url_shrink', "true");
				// 	} else {
				// 		window.localStorage.setItem('url_shrink', "false");
				// 	}
				// });

				// if (self.shrink() == "true") {
				// 	$("#shrink").prop('checked', true);
				// } else {
				// 	$("#shrink").prop('checked', false);
				// }

				// chrome.storage.sync.get('auto_tag', function(data) {
				// 	console.log(data)
				// 	if (data.auto_tag == true) {
				// 		$("#auto_tag").prop('checked', true);
				// 	} else {
				// 		$("#auto_tag").prop('checked', false);
				// 	}
				// });

			});

		}

		return self;
	}
})();