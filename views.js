var djanky = require('./djanky');
var fs = require('fs');
var renderer = require('./renderer');

var exports = {};

exports.index = function(req, res) {
    return 'index';
};

exports.single_post = function(req, res, post) {
    return renderer.single_post(post);
};

exports.media = function(req, res, path) {
    try {
        return fs.readFileSync('media/'+path);
    } catch (e) {
        throw new djanky.Error404('No media found for ' + path)
    }
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