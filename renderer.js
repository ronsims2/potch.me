var fs = require('fs');
var jsdom = require('jsdom').jsdom;
var nunjucks = require('nunjucks');

var post_cache = {};

var env = new nunjucks.Environment(new nunjucks.FileSystemLoader('templates'));

function read_post(path, force) {
    if (path in post_cache && !force) {
        return post_cache[path];
    }
    var contents = fs.readFileSync('posts/'+path, 'utf-8');
    post_cache[path] = contents;
    return contents;
}

function singlePost(post) {
    var tmpl = env.getTemplate('single_post.html');
    var post_markup = read_post(post)

    doc = jsdom(post_markup);
    window = doc.createWindow();

    var p = {
        title: extractTitle(doc),
        html: post_markup
    };

    return tmpl.render({ post: p });
}

function renderAll() {
    var dir = './posts';
    var posts = fs.readdirSync(dir);
    posts.forEach(function (post) {
        console.log(fs.statSync(dir+'/'+post));
    });
    return 'barf';
}

function rankPosts() {
    return 'rank';
}

module.exports = {
    all: renderAll,
    rank: rankPosts,
    single_post: singlePost
};

function extractTitle(doc) {
    var h1s = window.document.getElementsByTagName('h1');
    if (!h1s.length) return '';
    return text(h1s[0]);
}

function extractDate(doc) {
    var h1s = window.document.getElementsByTagName('h1');
    if (!h1s.length) return '';
    return text(h1s[0]);
}

function text(node) {
    var cn = node.childNodes;
    var t='';

    if (cn.length) {
        for (var i=0; i<cn.length; i++) {
            t += text(cn[i]);
        }
    } else {
        t = node.textContent;
    }

    return t;
}
