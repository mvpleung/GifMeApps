/////////////////////////////////////////////////////
//
//	GIFME
//	Author: Drew Dahlman ( www.drewdahlman.com )
//	Version: 3.0
//	Date: 08.19.2013
//	File: API.js
//	
//	Copyright 2013 Gifme.io
//
/////////////////////////////////////////////////////

(function() {
	api = function() {
		var self = this;

		var url = "http://166.78.184.106";

		self.init = function() {

		}

		/////////////////////////////////////////
		//
		//	GET
		//	@request:string
		//	@callback:function
		//
		/////////////////////////////////////////
		self.get = function(request, callback) {
			$("#modal").html("<b>loading<b><br/><span class='icon'>$</span>");
			$("#modal").show();
			var callback = callback;

			$.ajax({
				url: url + request,
				type: "GET",
				success: function(data) {
					callback(data);
					$("#modal").fadeOut();
					// gaPlugin.trackEvent(null, null, "API", "Success", "Success", 1);

				},
				error: function() {
					// gaPlugin.trackEvent(null, null, "API", "Fail", "Fail", 1);

					$("#modal").fadeOut();
				}
			});


		}

		/////////////////////////////////////////
		//
		//	SILENT
		//
		/////////////////////////////////////////
		self.silent = function(request, callback) {

			var callback = callback;

			$.ajax({
				url: url + request,
				type: "GET",
				success: function(data) {
					callback(data);
				},
				error: function() {}
			});

		}

		/////////////////////////////////////////
		//
		//	POST
		//	@request:string
		//	@callback:function
		//
		/////////////////////////////////////////
		self.post = function(request, callback) {
			$("#modal").html("<span class='icon'>$</span>");
			$("#modal").show();
			var callback = callback;

			$.ajax({
				url: url,
				data: request,
				type: "POST",
				success: function(data) {
					callback(data);
					$("#modal").fadeOut();
				},
				error: function() {
					$("#modal").fadeOut();
				}
			});
		}

		/////////////////////////////////////////
		//
		//	ERROR
		//	@msg:string
		//	@type:string
		//
		/////////////////////////////////////////
		self.error = function(msg, type) {
			switch (type) {
				case "modal":
					$("#modal").html(msg);
					break;
				default:
					$("#wrapper").html("<div id='oh_no'>" + msg + "</div>");
					break;
			}
		}

		return self;
	}
})();