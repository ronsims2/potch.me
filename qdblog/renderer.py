import os

from jinja2 import Environment, FileSystemLoader
from pyquery import PyQuery as pq

env = Environment(loader=FileSystemLoader('./templates'))


def render_single(file, force=False):
    post = pq(read_post(file))
    if len(post(('article.draft'))) and not force:
        return False
    post_dict = {
        'title': post('h1').text(),
        'html': unicode(post.outerHtml())
    }
    template = env.get_template('single_post.html')
    output = template.render({ 'post': post_dict })
    write_post(file, unicode(output))
    return True


def read_post(file):
    post_path = './posts/%s' % (file)
    post_file = open(post_path, 'r')
    return post_file.read()


def write_post(file, content):
    post_path = './rendered/%s' % (file)
    post_file = open(post_path, 'w')
    post_file.write(content)


def render_list(files, force=False):
    files_rendered = 0;
    for filename in files:
        print 'rendering %s... ' %  (filename),
        if render_single(filename, force):
            print 'done'
            files_rendered += 1
        else:
            print 'skipped'

    print '%d file%s rendered' % (files_rendered, '' if files_rendered == 1 else 's')
    