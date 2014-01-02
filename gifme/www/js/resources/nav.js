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
	nav = function() {
		var self = this;

		self.logo;
		self.search;
		self.search_box;
		self.menu_box;
		self.menu;

		self.init = function() {

			$("#tools").show();

			// Define Elements
			self.logo = $("#logo");
			self.search = $("#search");
			self.menu = $("#menu");
			self.search_box = $("#search_box");
			self.menu_box = $("#menu_box");
			self.settings = $("#settings");
			self.upload = $("#upload");
			self.about = $("#about");
			self.go_to = $("#go_to");

			/////////////////////////////////////////
			//
			//	Attach Listeners
			//
			/////////////////////////////////////////

			// LOGO
			self.logo.bind('touchend', function() {
				_gifme.api.get("/userbeta/" + _gifme.user + "/gifs/0", function(data) {
					$("#wrapper").scrollTop(0);
					_gifme.page = 0;
					_gifme.content.html('');
					_gifme.new_data(data);
				});
			});

			self.go_to.bind('touchend', function() {
				_gifme.api.get("/user/" + _gifme.user + "/favorites", function(data) {
					$("#wrapper").scrollTop(0);
					_gifme.page = 0;
					_gifme.content.html('');
					_gifme.new_data(data);
				});
			});

			// SEARCH


			if ($("body").hasClass('android')) {
				self.search_box.bind('click', function() {
					self.search_box.width('205px');
					$("#search").val('');

					setTimeout(function() {
						self.search.fadeIn(250);
						self.search.focus();
					}, 250)
				});
			} else {
				self.search_box.bind('touchend', function() {
					self.search_box.width('205px');
					$("#search").val('');

					setTimeout(function() {
						self.search.fadeIn(250);
						self.search.focus();
					}, 250)
				});
			}

			self.search.blur(function() {
				self.search.fadeOut(150);
				setTimeout(function() {
					self.search_box.width('37px');

					if (!$("body").hasClass('android')) {
						$("#wrapper").height(window.innerHeight - ($('header').height() + parseFloat($('header').css('margin-top'))));
					}
				}, 250);

			});

			self.menu_box.bind('touchend', function() {
				$("body").toggleClass('menu_open');
				if ($('body').hasClass('menu_open')) {
					self.menu_box.children('.icon').html('x')
				} else {
					self.menu_box.children('.icon').html('/')
				}
			});

			$('#wrapper,#search_box,#logo,.thumb,.item,#logo').not("#menu_box,#menu_box .icon").bind('touchend', function() {
				$("body").removeClass('menu_open');
				self.menu_box.children('.icon').html('/')
			});

			$("#search_form").submit(function() {
				$("#wrapper").scrollTop(0);
				_gifme.page = 0;
				var term = $("#search").val();
				if (term == "") {
					_gifme.api.get("/userbeta/" + _gifme.user + "/gifs/" + _gifme.page, function(data) {
						_gifme.content.html("");
						_gifme.new_data(data);
					});
				} else {
					_gifme.api.get("/user/" + _gifme.user + "/tags/" + term, function(data) {
						_gifme.content.html("");
						_gifme.new_data(data);
					});
				}
				$("#search").val('');
				// $("#wrapper").height(window.innerHeight - ($('header').height() + parseFloat($('header').css('margin-top'))));
				$("#search").blur();

				return false;
			});

			self.settings.bind('touchend', function() {
				_gifme.settings.init();
			});

			self.about.bind('touchend', function() {
				_gifme.set_view(_gifme.templates.info, null, function() {

				});
			});

			self.upload.bind('touchend', function() {
				_gifme.set_view(_gifme.templates.upload, null, function() {

					$("#upload_url").focus(function(event) {
						event.preventDefault();
						$(this).blur();

						cordova.plugins.clipboard.paste(function(text) {
							$("#upload_url").val(text);
							// alert(text)
						});
					})

					$("#upload_button").bind('touchend', function() {
						var url = $("#upload_url").val();
						url = url.replace("http://", "");
						url = url.replace("https://", "");

						var u = localStorage.getItem('uuid');

						if (url != "") {
							if (url.indexOf('.gif') > 0 || url.indexOf('.jpg') > 0 || url.indexOf('.GIF') > 0) {
								$("#modal").html("<b>uploading...<b><br/><span class='icon'>$</span>");
								$("#modal").show();
								$.ajax({
									url: "http://166.78.184.106/gif/create/" + u + "/" + url,
									type: "GET",
									success: function(msg) {
										$("#modal").html("<b>DONE!<b><br/><span class='icon'>$</span>");
										setTimeout(function() {
											$("#modal").fadeOut();
											window.location.reload();
										}, 1500);
									},
									error: function(w, t, f) {
										console.log(w, t, f);
									}
								});
							}
						}
					});
				});
				_gaq.push(['_trackEvent', 'upload', 'clicked']);
			});
		}

		return self;
	}
})();