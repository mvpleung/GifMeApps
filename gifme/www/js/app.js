/////////////////////////////////////////////////////
//
//	GIFME
//	Author: Drew Dahlman ( www.drewdahlman.com )
//	Version: 3.0
//	Date: 08.19.2013
//	
//	Copyright 2013 Gifme.io
//
/////////////////////////////////////////////////////

(function() {
	Application = function() {
		var self = this;

		// Extend Object
		self.nav;
		self.api;
		self.signup_signin;
		self.user = null;
		self.templates = [];
		self.page = 0;
		self.content;

		var pages = 0;

		self.init = function() {

			// Extend Object
			self.nav = new nav();
			self.api = new api();
			self.settings = new settings();
			self.content = $("#content");


			/////////////////////////////////////////
			//
			//	Start Things Off
			//
			/////////////////////////////////////////
			if (self.user) {
				self.content.css({
					'width': '100%'
				});
				self.nav.init();
				self.api.get("/userbeta/" + self.user + "/gifs/" + self.page, function(data) {
					$("#wrapper").scrollTop(0);
					self.new_data(data);
					$("html,body").height(window.innerHeight);
					$("#wrapper").height(window.innerHeight - ($('header').height() + parseFloat($('header').css('margin-top'))));
				});

				if (localStorage.getItem('v') != "2.6.1") {
					$("#overlay_update").show();
					$("#close_button").click(function() {
						$("#overlay_update").remove();
					});
					localStorage.setItem('v', '2.6.1');
				} else {
					$("#overlay_update").remove();
				}
			} else {
				self.set_view(self.templates.signup_signin, null, function() {
					self.signup_signin = new signup_signin();
					self.signup_signin.init();
				});
			}
		}

		self.set_view = function(view, data, callback) {
			self.content.html(view(data));
			$("a").click(function(event) {
				event.preventDefault();
				var url = $(this).attr('href');
				window.open(url, '_system');
			});
			callback();
		}

		self.new_data = function(data) {
			var pageID = $(".clear").length + 1;
			if (data.user.total != data.users.length) {
				pages = Math.floor(data.user.total / 30);
			} else {
				pages = self.page;
			}

			if (data.users.length > 0) {

				self.content.width('100%');

				var d = data.users;
				var i = 0;
				_.each(d, function(gif) {
					var _gif = self.templates.thumb(gif);
					self.content.append(_gif);

					var _thumb = new thumb(_gif, i);
					_thumb.init();

					i = i + 50;
				});

				$(".box").bind('click', function() {
					_gaq.push(['_trackEvent', 'edit_page', 'clicked']);
					var gif = $(this).attr('id');
					var tag = "";
					var link = $(this).data('url');

					self.api.get("/gif/" + gif + "/details", function(data) {
						var detail = self.templates.tag_page(data);
						$("body").prepend(detail);

						var tagPage = new tag_page(data);
					});
				});

				$("#content").append("<div class='clear' id='page_" + pageID + "' data-active='false' data-page='" + self.page + "'></div>");

				$("#wrapper").scroll(function(event) {
					if ($("#tag_edit").length > 0) {
						event.preventDefault()
					} else {
						if ($("#wrapper").scrollTop() + $("#wrapper").height() == $("#content").height()) {

							if ($("#page_" + pageID).data('active') == false && self.page < pages) {
								var page = $("#page_" + pageID).data('page');
								$("#page_" + pageID).data('active', true);
								self.add_page(page);
							}

						}
					}

				});
			} else {
				_gifme.content.html("<div id='oh_no'>There's nothing here.<br/>Go collect more gifs!</div>")
			}



		}

		self.add_page = function(page) {
			self.page = (self.page + 1);
			self.api.get("/userbeta/" + self.user + "/gifs/" + self.page, function(data) {
				self.new_data(data);
			});
		}
		return self;
	}
})();