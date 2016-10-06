'use strict';
var request = require('./request.js');
var fs = require("fs");
var cheerio = require('cheerio');

var times = 0;
var pages = [];
//代码块为0的文章数量
var zeroCount = 0;
//代码块为1~10的文章数量
var oneToTen = 0;
//代码块为11~20的文章数量
var elToTwo = 0;
//代码块大于20的文章数量
var beyondTwo = 0;

function Seek() {

}
/**
 * 创建promise
 */
Seek.prototype.createPromise = function(url) {
    var options = {
        url: 'http://www.jianshu.com' + url,
        type: 'get'
    }
    return new Promise(function(resolve, reject) {
        options.callback = function(data, _setCookie) {
            var $ = cheerio.load(data);
            var title = $('h1.title').text();
            var codes = $('code').length;
            if(codes === 0) {
                zeroCount++;
            } else if(codes <= 10) {
                oneToTen++;
            } else if(codes <= 20) {
                elToTwo++;
            } else {
                beyondTwo++;
            }
            resolve({
                title: title,
                codes: codes
            });
        }
        request(options, null);
    });
}

/**
 *  递归的请求，每次并发的请求5个
 */
Seek.prototype.seek = function(urls, callback) {
    var self = this;
    var promises = [];
    var flag = 0;
    //最多每次请求5页
    for(let i = 0; i < 5; i++) {
        promises.push(self.createPromise(urls[times]));
        times++;
        if(times === urls.length) {
            break;
        }
    }

    var promise = Promise.all(promises);
    promise.then(function(result) {
        console.log("seekDetail totals:" + times);
        if(typeof result !== 'string') {
            pages = pages.concat(result);
        } else {
            pages.push(result);
        }
        if (times < urls.length) {
            self.seek(urls, callback);
        } else {
            callback(pages);
        }
    });
}



module.exports = function(urls) {
    var seek = new Seek();
    return new Promise(function(resolve, reject) {
        seek.seek(urls, function(pages) {
            var result = {
                items: pages,
                zeroCount: zeroCount,
                oneToTen: oneToTen,
                elToTwo: elToTwo,
                beyondTwo: beyondTwo
            }
            resolve(result);
        });
    });
}
