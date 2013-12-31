/////////////////////////////////////////
//
//	Tag Page
//
/////////////////////////////////////////
(function() {
	tag_page = function(data) {
		var self = this;

		self.data = data;

		self.init = function() {
			$("html,body").height(window.innerHeight);
			$("#wrapper").css({
				'opacity': 0,
				'webkit-transform': 'scale(.5)'
			})

			self.direction = new direction(
				'tag_edit', // Element to watch
				150, // Min Movement to get direction
				function(data) {
					var opacity = 1 - (Math.abs(data.X) / window.innerWidth);
					if (data.direction == "right") {
						$("#tag_edit").css({
							'right': data.X,
							'opacity': opacity
						});

						$("#wrapper").css({
							'opacity': (Math.abs(data.X) / window.innerWidth),
						})
						if ((.5 + (Math.abs(data.X) / window.innerWidth)) <= 1) {
							$("#wrapper").css({
								'webkit-transform': 'scale(' + (.5 + (Math.abs(data.X) / window.innerWidth)) + ')'
							})
						}
					}
				}, // Dragging Callback
				function(data) {
					console.log(data.direction, data.X)

					if (data.X <= -194) {
						$("#tag_edit").remove();
						$("#wrapper").css({
							'opacity': 1,
							'webkit-transform': 'scale(1)'
						})

						self.direction = null;
					} else {
						$("#tag_edit").animate({
							'right': 0,
							'opacity': 1
						}, 350);
						$("#wrapper").css({
							'opacity': 0,
							'webkit-transform': 'scale(.5)'
						})

					}

				} // End Callback
			);

			if (window.innerHeight == 480) {
				$(".gif_holder").height(210)
			}
			$(".gif_holder").imgur({
				img: self.data.gif.link
			}, function(el, data) {
				el.css({
					'backgroundImage': 'url(' + data + ')',
					'backgroundSize': 'cover',
					'backgroundPosition': 'center'
				});
			});

			$("#cancel").bind('touchend', function() {
				$("#tag_edit").fadeOut(function() {
					$(this).remove();
					self.direction = null;
					$("#wrapper").css({
						'opacity': 1,
						'webkit-transform': 'scale(1)'
					})
				});
			});

			$(window).bind('keypress', function(event) {
				if (event.which == 13) {
					$("#save").trigger('click');
				}
			});

			$("#save").bind('touchend', function() {
				var tag = $("#gif_tag").val();
				console.log('saving...')


				if (tag != "tag" && tag != "" && tag != "use spaces between tags") {
					_gifme.api.get("/user/" + _gifme.user + "/tag/" + self.data.gif.id + "/" + tag, function(data) {
						$("#tag_edit").fadeOut(function() {
							$(this).remove();
							$("#wrapper").css({
								'opacity': 1,
								'webkit-transform': 'scale(1)'
							})
						});
					});
				} else {
					$("#tag_edit").fadeOut(function() {
						$(this).remove();
						$("#wrapper").css({
							'opacity': 1,
							'webkit-transform': 'scale(1)'
						})


					});
				}
				self.direction = null;

			});

			$("#gif_tag").focus(function() {
				if ($("#gif_tag").val().match(/use spaces between tags/i)) {
					$("#gif_tag").val("");
				}
				// $("#tag_edit").css({'top':'260px'})
			});
			$("#gif_tag").blur(function() {
				// $("#tag_edit").css({'top':'0px'})

			})

			$("#delete").bind('touchend', function() {
				$("#" + self.data.gif.id).remove();
				_gifme.api.get("/gif/" + self.data.gif.id + "/delete", function(data) {
					$("#tag_edit").fadeOut(function() {
						$(this).remove();
						self.direction = null;
						$("#wrapper").css({
							'opacity': 1,
							'webkit-transform': 'scale(1)'
						})
					});
					$("#modal").fadeOut();
				});

			});

			$("#gif_link").on('click', function(event) {
				event.preventDefault();
				var text = $(this).data('link');

				cordova.plugins.clipboard.copy(text);
				$("#modal").html("Copied!");
				$("#modal").show();
				setTimeout(function() {
					$("#modal").fadeOut();
				}, 500);


				// send stats
				_gifme.api.silent("/user/" + _gifme.user + "/copy/" + self.data.gif.id, function(data) {
					console.log(data)
				});
			});
		}

		self.init();
		return self;
	}
})();