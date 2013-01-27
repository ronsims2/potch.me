var fs = require('fs');
var jsdom = require('jsdom').jsdom;
var nunjucks = require('nunjucks');

var post_cache = {};

var env = new nunjucks.Environment(new nunjucks.FileSystemLoader('templates'));

var postDir = './posts/';

var NUM_INDEX_POSTS = 3;

function read_post(path, force) {
    if (path in post_cache && !force) {
        return post_cache[path];
    }
    var contents = fs.readFileSync(postDir+path, 'utf-8');
    post_cache[path] = contents;
    return contents;
}

function write_post(path, content) {
    fs.writeFileSync('rendered/'+path, content, 'utf-8');
}

function singlePost(post) {
    var tmpl = env.getTemplate('single_post.html');
    var post_markup = read_post(post)

    var doc = jsdom(post_markup);
    var window = doc.createWindow();

    var article = window.document.getElementsByTagName('article')[0];

    var p = {
        title: extractTitle(window),
        date: article.getAttribute('data-posted'),
        html: article.innerHTML
    };

    return tmpl.render({ post: p });
}

function renderAll() {
    var posts = fs.readdirSync(postDir);
    var out = '';
    posts.forEach(function (post) {
        var rendered = singlePost(post);
        write_post(post, rendered);
        out += 'wrote ' + post + '\n';
        // console.log(fs.statSync(dir+'/'+post));
    });
    out += renderIndex();
    return out;
}

function renderIndex() {
    var posts = fs.readdirSync(postDir);
    var out = 'rendering index...\n';
    var tuples = posts.map(function(post) {
        var doc = jsdom(read_post(post));
        var window = doc.createWindow();
        var article = window.document.getElementsByTagName('article')[0];
        if (article.getAttribute('class').indexOf('draft')+1) return;
        var date = article.getAttribute('data-posted');
        return [date, post, article];
    });
    tuples.sort(function(a, b) {
        return (a[0] < b[0]) ? 1 : -1;
    });
    var p = [];
    for (var i=0; i<NUM_INDEX_POSTS; i++) {
        tuple = tuples[i];
        console.log(tuple[2].innerHTML);
        p.push({
            html: tuple[2].innerHTML,
            date: tuple[0],
            permalink: '/blog/' + tuple[1]
        });
        out += tuple[1] + '\n';
    }
    var tmpl = env.getTemplate('index.html');
    write_post('index.html', tmpl.render({ posts: p }));
    return out;
}

module.exports = {
    all: renderAll,
    rank: renderIndex,
    single_post: singlePost
};

function extractTitle(win) {
    var h1s = win.document.getElementsByTagName('h1');
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
