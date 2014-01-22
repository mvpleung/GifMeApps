/*!
 * jQuery Double Tap Plugin.
 *
 * Copyright (c) 2010 Raul Sanchez (http://www.appcropolis.com)
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */

(function($) {
    // Determine if we on iPhone or iPad
    var isiOS = false;
    var agent = navigator.userAgent.toLowerCase();
    if (agent.indexOf('iphone') >= 0 || agent.indexOf('ipad') >= 0 || agent.indexOf('android') >= 0) {
        isiOS = true;
    }

    $.fn.doubletap = function(onDoubleTapCallback, onTapCallback, delay) {
        var eventName, action;
        delay = delay == null ? 500 : delay;
        eventName = isiOS == true ? 'touchend' : 'click';
        var el, moving = false,
            moveTimeout;

        $(this).bind('touchmove', function() {
            moving = true;
            clearTimeout(moveTimeout);
            clearTimeout(action);

            moteTimeout = setTimeout(function() {
                moving = false;
            }, delay);
        });

        $(this).bind(eventName, function(event) {

            if (!moving) {
                el = $(this);
                var now = new Date().getTime();
                var lastTouch = $(this).data('lastTouch') || now + 1 /** the first time this will make delta a negative number */ ;
                var delta = now - lastTouch;
                clearTimeout(action);
                if (delta < 500 && delta > 0) {
                    if (onDoubleTapCallback != null && typeof onDoubleTapCallback == 'function') {
                        onDoubleTapCallback(el);
                    }
                } else {
                    $(this).data('lastTouch', now);
                    action = setTimeout(function(evt) {
                        if (onTapCallback != null && typeof onTapCallback == 'function') {
                            onTapCallback(el);
                        }
                        clearTimeout(action); // clear the timeout
                    }, delay, [event]);
                }
                $(this).data('lastTouch', now);
            }
        });
    };
})(jQuery);