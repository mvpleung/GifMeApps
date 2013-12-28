/////////////////////////////////////////////////////
//
//	GIFME
//	Author: Drew Dahlman ( www.drewdahlman.com )
//	Version: 3.0
//	Date: 08.19.2013
//	File: signup_signin.js
//	
//	Copyright 2013 Gifme.io
//
/////////////////////////////////////////////////////
(function() {
	signup_signin = function() {
		var self = this;

		self.init = function() {
			$("#signin").show();

			$("#account").click(function(event) {
				event.preventDefault();

				$("#signup").hide();
				$("#signin").show();

			});
			$("#signup_button").click(function(event) {
				event.preventDefault();

				$("#signup").show();
				$("#signin").hide();

			});

			// sign up
			$(".submit").click(function(event) {
				event.preventDefault();
				var email = $("#signup .email").val();
				var pass = $("#signup .pass").val();

				_gifme.api.get("/user/create/" + email + "/" + pass, function(data) {
					if (data == "501") {
						$("#modal").html("Sorry that username is being used, try another one.");
						$("#modal").show();
						setTimeout(function() {
							$("#modal").fadeOut();
						}, 1000);
					} else {
						_gifme.user = data;
						console.log(data)
						localStorage.setItem('uuid', data.user.id);
						_gifme.content.html("");
						_gifme.content.width('100%');
						_gifme.api.get("/user/" + data.user.id + "/gifs/" + self.page, function(data) {
							_gifme.new_data(data);
						});
					}

				});
			});

			// sign in
			$(".submit_b").click(function(event) {
				event.preventDefault();

				var email = $("#signin .email").val();
				var pass = $("#signin .pass").val();

				_gifme.api.get("/user/login/" + email + "/" + pass, function(data) {
					if (data == "401" || data == "404") {
						$("#modal").html("Oops! Try Again.");
						$("#modal").show();
						setTimeout(function() {
							$("#modal").fadeOut();
						}, 1500);
					} else {
						_gifme.user = data;

						console.log(data)

						localStorage.setItem('uuid', data);
						_gifme.content.html("");
						_gifme.content.width('100%');
						_gifme.api.get("/userbeta/" + data + "/gifs/" + _gifme.page, function(data) {
							_gifme.nav.init();
							_gifme.content.width('100%');
							_gifme.new_data(data);
						});

					}

				});
			});

		}
		return self;
	}
})();