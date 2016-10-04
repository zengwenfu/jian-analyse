'use strict';
var analyse = require('./app/analyse.js');
var bs = require("browser-sync").create()

var before = new Date();
analyse(function() {
    var end = new Date();
    var time = (end.getTime() - before.getTime())/1000;
    console.log('总耗时:' + time + 's');
    bs.init({
        server: "./app/views"
    });
    bs.reload("*.html");
});