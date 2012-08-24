import os

from jinja2 import Environment, FileSystemLoader
from pyquery import PyQuery as pq


env = Environment(loader=FileSystemLoader('./templates'))
post_cache = {}


def render_single(file, force=False):
    post = pq(read_post(file))
    if len(post(('article.draft'))) and not force:
        return False
    post_dict = {
        'title': post('h1').text(),
        'html': read_post(file)
    }
    print post_dict
    template = env.get_template('single_post.html')
    output = template.render({ 'post': post_dict })
    write_post(file, unicode(output).encode('utf-8'))
    return True


def read_post(file):
    if not post_cache.get(file):
        post_path = './posts/%s' % (file)
        post_file = open(post_path, 'r')
        post_cache[file] = post_file.read()
    return post_cache.get(file)


def write_post(file, content):
    post_path = './rendered/%s' % (file)
    post_file = open(post_path, 'w')
    print post_path
    post_file.write(content)


def render_index(num_posts=5):
    path = './posts'
    posts = []
    posts_dict = []
    for file in os.listdir(path):
        post = pq(read_post(file))
        date = post('.meta .posted').text()
        posts.append((file, date))
    print posts
    posts = sorted(posts, cmp=lambda a, b: cmp(b[1], a[1]))[:10]
    for post, ctime in posts:
        doc = pq(read_post(post))
        if not len(doc(('article.draft'))):
            doc('.meta').append(' <a href="/blog/%s">#</a>' % (post))
            posts_dict.append({ 'html': doc.outerHtml() })
    template = env.get_template('index.html')
    output = template.render({ 'posts': posts_dict })
    write_post('index.html', unicode(output).encode('utf-8'))


def render_list(files, force=False):
    post_cache = {}
    files_rendered = 0;
    for filename in files:
        print 'rendering %s... ' %  (filename),
        if render_single(filename, force):
            print 'done'
            files_rendered += 1
        else:
            print 'skipped'

    print '%d file%s rendered' % (files_rendered, '' if files_rendered == 1 else 's')
