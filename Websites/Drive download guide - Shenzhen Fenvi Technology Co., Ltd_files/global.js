$(function(){
    var whdef = 100/1920;
    var wH = window.innerHeight;
    var wW = window.innerWidth;
    var rem = wW * whdef;
    $('html').css('font-size', rem + "px");
    });
    $(window).resize(function (){
    var whdef = 100/1920;
    var wH = window.innerHeight;
    var wW = window.innerWidth;
    var rem = wW * whdef;
    $('html').css('font-size', rem + "px");
    });