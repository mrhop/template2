/**
 * Created by Donghui Huo on 2015/8/28.
 */
var $ = global.$ = global.jQuery = require('jquery');
require("flexslider");
require("easing");
require("scrollspy");
require("smoothscroll");
var $site = require("./site");
//response-nav
$(document).ready(function () {
    $('#status').fadeOut();
    $('#preloader').delay(350).fadeOut('slow');
    $('body').delay(350).css({'overflow-y': 'visible'});
    //nav effect
    var menuButton = $('.mini-nav-button');
    menuButton.click(function () {
        $('.nav-menu').slideToggle();
    });
    $('#home .flexslider').flexslider({
        prevText: "",
        nextText: "",
        fadeFirstSlide: false,
        animationSpeed: 200,
        start: function (slider) {
            $site.animate("#home .flex-active-slide .animated");
        },
        before: function () {
            $site.hide("#home .flex-active-slide .animated");
        },
        after: function (slider) {
            $site.animate("#home .flex-active-slide .animated");
        }
    });
    $site.animateSpy(50);
    //special scroll
    $(window).scroll(function () {
        $site.navShowOrHide();
        $site.animateSpy(50);
    });
    /* $('li.nav-about').on('activate.bs.scrollspy', function () {
     // do something…
     if($("#about").hasClass('init')){
     $("#about").removeClass('init');
     $site.animate("#about .animated");
     }
     })*/
    //scrollspy
    $('body').scrollspy({target: '.nav-menu', offset: 105});
    //smoothscroll
    $('.smooth-scroll').smoothScroll({easing: 'easeInOutExpo', speed: 800, offset: -55});
    //not scroll to hide
    $('.nav-menu a').bind('click', function (event) {
        var $anchor = $(this);
        var headerH = $('#navigation').outerHeight();
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - headerH + "px"
        }, 800, 'easeInOutExpo');
        event.preventDefault();
    });

    //case1 case2
    var $window = $(window),
        flexslider1,flexslider2;
    $('#case1 .flexslider').flexslider({
        animation: "slide",
        animationSpeed: 400,
        itemWidth: 1,
        itemMargin: 0,
        minItems: $site.getGridSize(), // use function to pull in initial value
        maxItems: $site.getGridSize(), // use function to pull in initial value
        directionNav: false,
        start: function (slider) {
            flexslider1 = slider;
        }
    });

    $('#case2 .flexslider').flexslider({
        animation: "slide",
        animationSpeed: 400,
        itemWidth: 1,
        itemMargin: 0,
        minItems: 1,
        slideshow: false,
        maxItems: 1,
        directionNav: false,
        start: function (slider) {
            flexslider2 = slider;
        }
    });

    // check grid size on resize event
    $window.resize(function () {
        $site.waitForFinalEvent(function () {
            var gridSize = $site.getGridSize();
            flexslider1.vars.minItems = gridSize;
            flexslider1.vars.maxItems = gridSize;
            flexslider1.resize();
        }, 50, "case-flex-slider");
    });

    //video
    $("#case2 iframe").each(function(){
        wistiaEmbed = $(this)[0].wistiaApi;
        wistiaEmbed.bind( 'play', function() {
            flexslider2.pause();
        });

        wistiaEmbed.bind( 'end', function() {
            flexslider2.play();
        });
    })
});
