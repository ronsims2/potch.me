var fs = require('fs');
var renderer = require('./renderer');

var exports = {};

exports.index = function(req, res) {
    return 'index';
};

exports.single_post = function(req, res, post) {
    return renderer.single_post(post);
};

exports.rank = function(req, res) {
    console.log('ranking posts...');
    return renderer.rank();
}

exports.re_render = function(req, res) {
    console.log('re-rendering all posts...');
    return renderer.all();
}

module.exports = exports;