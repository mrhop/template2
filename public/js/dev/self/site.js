/**
 * Created by Donghui Huo on 2015/8/31.
 */
var $ = require("jQuery");
module.exports = (function ($, window, undefined) {
    'use strict';
    $.Site = function () {
        //add window size change

    };
    $.Site.prototype = {
        navShowOrHide: function () {
            var menu = $('#navigation');
            var y = $(window).scrollTop();
            var z = $('#home .flex-control-nav').offset().top - 200;
            if (y >= z) {
                menu.removeClass('not-visible-nav').addClass('visible-nav');
            }
            else {
                menu.removeClass('visible-nav').addClass('not-visible-nav');
            }
            if ($('.mini-nav-button').is(":visible")) {
                $('.nav-menu').slideUp();
            }
        },
        animate: function (obj) {
            $(obj).each(function () {
                $(this).addClass($(this).data("animated")).css('visibility', 'visible').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    $(this).removeClass($(this).data("animated"));
                });
            })
        },
        hide: function (obj) {
            $(obj).each(function () {
                $(this).css('visibility', 'hidden');
            })
        },
        removeAnimate: function (obj) {
            $(obj).each(function () {
                $(this).removeClass($(this).data("animated"));
            })
        },
        animateSpy: function (heightDiff) {
            var _this = this;
            var height = $(window).height() - heightDiff;
            $(".scroll.init").each(function () {
                //console.log(height - ($(this).offset().top-$("body")[0].scrollTop));
                //console.log($(this).height()/2);
                //console.log(height - ( $(this).offset().top-$("body")[0].scrollTop+($(this).height()/2)));
                if (height >= ($(this).offset().top - $("body")[0].scrollTop)) {
                    $(this).removeClass('init');
                    _this.animate(this);
                }
            })
        },
        waitForFinalEvent: (function () {
            var timers = {};
            return function (callback, ms, uniqueId) {
                if (!uniqueId) {
                    uniqueId = "Don't call this twice without a uniqueId";
                }
                if (timers[uniqueId]) {
                    clearTimeout(timers[uniqueId]);
                }
                timers[uniqueId] = setTimeout(callback, ms);
            };
        })(),
        getGridSize:function(){
        return (window.innerWidth < 480) ? 1 :
            (window.innerWidth < 992) ? 2 : 3;
        }
    };

    return new $.Site();
})($, window)