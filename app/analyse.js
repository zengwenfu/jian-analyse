'use strict';
var seek = require('./seekList.js');
var seekPage = require('./seekDetail.js');
var cheerio = require('cheerio');
var nunjucks = require('nunjucks');
var fs = require("fs");

function Analyse() {

}

/**
 * 使用cheerio载入列表页面
 */
Analyse.prototype.load = function(data, i) {
    return new Promise(function(resolve, reject) {
        var $ = cheerio.load(data);
        var pages = [];
        var els = $('.article-list li');
        if(els.length === 0) {
            console.warn('load error page:' + i );
            resolve([]);
        }
        els.each(function(index) {
            if ($(this).attr('class') === 'have-img') {
                pages.push($(this).children('a').attr('href'));
            } else {
                pages.push($(this).children('div').children('.title').children('a').attr('href'));
            }
           
            if(index === els.length - 1) {
                resolve(pages);
            }
        });
    });
    
}

/**
 *  获得所有的文章url
 */
Analyse.prototype.getPages = function(data) {
    var promises = [];
    var self = this;
    for(var i=0; i<data.length; i++) {
        promises.push(self.load(data[i], i));
    }
    var pro = Promise.all(promises);
    return pro;
}

Analyse.prototype.analyse = function() {
    var self = this;
    seek().then(function(data) {
        self.getPages(data).then(function(result) {
            var urls = [];
            for(let i = 0; i<result.length; i++) {
                urls = urls.concat(result[i]);
            }
            seekPage(urls).then(function(res) {
                var renderRes = nunjucks.render('./tpl/index.tpl', {
                    items: res
                });
                fs.writeFile('./views/index.html', renderRes, function() {});
                // console.log(res);
            });
        });
    });
}

new Analyse().analyse();
