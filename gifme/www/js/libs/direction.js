/////////////////////////////////////////
//
//	DirectionJS
//	Author: Drew Dahlman ( www.drewdahlman.com )
//	Version: 1.5
//	Date: 3.16.2013
//	
//	Inspired by padilicious.com
//
//	@el - Element to watch
//	@min - Min drag to trigger
//	@drag - Callback for dragging
//	@end - Callback for end of drag	
//
/////////////////////////////////////////

(function() {
	direction = function(el, min, drag, end) {
		var self = this;
		self.options = {
			triggerElementID: el,
			fingerCount: 0,
			startX: 0,
			startY: 0,
			curX: 0,
			curY: 0,
			deltaX: 0,
			deltaY: 0,
			horzDiff: 0,
			vertDiff: 0,
			minLength: min,
			swipeLength: 0,
			swipeAngle: null,
			swipeDirection: null,
			drag: drag,
			end: end
		}

		/////////////////////////////////////////
		//
		//	Init
		//
		/////////////////////////////////////////
		self.init = function() {

			document.getElementById(self.options.triggerElementID).addEventListener('touchstart', function(event) {
				self.touch_start(event);
			});
			document.getElementById(self.options.triggerElementID).addEventListener('touchmove', function(event) {
				self.touch_move(event);
			});
			document.getElementById(self.options.triggerElementID).addEventListener('touchend', function(event) {
				self.touch_end(event);
			});
		}

		/////////////////////////////////////////
		//
		//	Touch Start
		//
		/////////////////////////////////////////
		self.touch_start = function(event) {
			// event.preventDefault();

			self.options.fingerCount = event.touches.length;

			if (self.options.fingerCount == 1) {
				self.options.startX = event.touches[0].pageX;
				self.options.startY = event.touches[0].pageY;
			} else {
				self.touchCancel(event);
			}
		}

		/////////////////////////////////////////
		//
		//	Touch Move
		//	Returns:
		//	@y: Y position of current drag
		//	@x: X position of current drag
		//	@direction: direction of movement
		//
		/////////////////////////////////////////

		self.touch_move = function(event) {
			// event.preventDefault();
			if (event.touches.length == 1) {
				self.options.curX = event.touches[0].pageX;
				self.options.curY = event.touches[0].pageY;

				if (self.options.fingerCount == 1 && self.options.curX != 0) {
					self.options.swipeLength = Math.round(Math.sqrt(Math.pow(self.options.curX - self.options.startX, 2) + Math.pow(self.options.curY - self.options.startY, 2)));
				}
			} else {
				self.touchCancel(event);
			}

			self.options.drag({
				Y: self.options.startY - self.options.curY,
				X: self.options.startX - self.options.curX,
				direction: self.calculateAngle()
			});
		}

		/////////////////////////////////////////
		//
		//	Touch End
		//	Returns:
		//	@y: Y position of drag
		//	@x: X position of drag
		//	@direction: direction of movement
		//
		/////////////////////////////////////////

		self.touch_end = function(event) {
			// event.preventDefault();

			if (self.options.fingerCount == 1 && self.options.curX != 0) {
				self.options.swipeLength = Math.round(Math.sqrt(Math.pow(self.options.curX - self.options.startX, 2) + Math.pow(self.options.curY - self.options.startY, 2)));
			}
			if (self.options.swipeLength >= self.options.minLength) {
				self.options.end({
					Y: self.options.startY - self.options.curY,
					X: self.options.startX - self.options.curX,
					direction: self.calculateAngle()
				});
			} else {
				self.options.end({
					X: 0,
					Y: 0,
					direction: 'none'
				});
			}
			self.touchCancel(event);
		}

		/////////////////////////////////////////
		//
		//	Reset
		//
		/////////////////////////////////////////
		self.touchCancel = function(event) {
			self.options.fingerCount = 0;
			self.options.startX = 0;
			self.options.startY = 0;
			self.options.curX = 0;
			self.options.curY = 0;
			self.options.deltaX = 0;
			self.options.deltaY = 0;
			self.options.horzDiff = 0;
			self.options.vertDiff = 0;
			self.options.swipeLength = 0;
			self.options.swipeAngle = null;
			self.options.swipeDirection = null;
		}

		/////////////////////////////////////////
		//
		//	Calculate Angle
		//
		/////////////////////////////////////////
		self.calculateAngle = function() {
			var X = self.options.startX - self.options.curX;
			var Y = self.options.startY - self.options.curY;
			var z = Math.round(Math.sqrt(Math.pow(X, 2) + Math.pow(Y, 2)));
			var r = Math.atan2(Y, X);
			self.options.swipeAngle = Math.round(r * 180 / Math.PI);
			if (self.options.swipeAngle < 0) {
				self.options.swipeAngle = 360 - Math.abs(self.options.swipeAngle);
			}
			return self.determineSwipeDirection();
		}

		/////////////////////////////////////////
		//
		//	Determine Direction
		//
		/////////////////////////////////////////
		self.determineSwipeDirection = function() {
			if ((self.options.swipeAngle <= 45) && (self.options.swipeAngle >= 0)) {
				self.options.swipeDirection = "left";
			} else if ((self.options.swipeAngle <= 360) && (self.options.swipeAngle >= 315)) {
				self.options.swipeDirection = "left";
			} else if ((self.options.swipeAngle >= 135) && (self.options.swipeAngle <= 225)) {
				self.options.swipeDirection = "right";
			} else if ((self.options.swipeAngle > 45) && (self.options.swipeAngle < 135)) {
				self.options.swipeDirection = "down";
			} else {
				self.options.swipeDirection = "up";
			}

			return self.options.swipeDirection;
		}

		self.init();
		return self;
	}
})();