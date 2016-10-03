'use strict';
var request = require('./request.js');
var fs = require("fs");


var times = 0;
var totalPage = 100;
var pages = [];

function Seek() {

}

/**
 * 创建promise
 */
Seek.prototype.createPromise = function(i) {
    var options = {
        url: 'http://www.jianshu.com/collections/16/notes?order_by=likes_count&page=' + i,
        type: 'get'
    }
    return new Promise(function(resolve, reject) {
        options.callback = function(data, _setCookie) {
            resolve(data);
        }
        request(options, null);
    });
}

/**
 * 同时发起100个请求，会导致部分请求失败
 */
// Seek.prototype.seek = function() {
//     var self = this;
//     var promises = [];
//     for (var i = 1; i <= 100; i++) {
//         var promise = self.createPromise(i);
//         promises.push(promise);
//     }
//     var pro = Promise.all(promises);
//     return pro;
// }

/**
 *  递归的请求，每次并发的请求5个
 */
Seek.prototype.seek = function(callback) {
    var self = this;
    times++;
    var ot = times;
    var promise = Promise.all([
        self.createPromise(times),
        self.createPromise(++times),
        self.createPromise(++times),
        self.createPromise(++times),
        self.createPromise(++times)
    ]);
    promise.then(function(result) {
        console.log("seekList totals:" + times);
        pages = pages.concat(result);
        if (times < totalPage) {
            self.seek(callback);
        } else {
            callback(pages);
        }
    });
}



module.exports = function() {
    var seek = new Seek();
    return new Promise(function(resolve, reject) {
        seek.seek(function(pages) {
            fs.writeFile('./page.html', pages[0]);
            resolve(pages);
        });
    });
}
