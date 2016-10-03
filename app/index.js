'use strict';
var request = require('node-httpclient');
var cheerio = require('cheerio');

request.get('http://www.jianshu.com/collections/16/notes?order_by=likes_count', function(data) {
    console.log(data);
    var $ = cheerio.load(data);
    $('.article-list li').each(function() {
        if($(this).attr('class') === 'have-img') {
            console.log($(this).children('a').attr('href'));
        } else {
            console.log($(this).children('div').children('.title').children('a').attr('href'))
        }
    });
});

