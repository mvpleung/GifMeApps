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

			});

		}

		return self;
	}
})();