import os, time, sys
import SimpleHTTPServer
import SocketServer
import threading


from qdblog.renderer import render_list, render_index

def main():
    if (len(sys.argv) > 1):
        cmd = sys.argv[1]
        if cmd == 'all':
            render_all()
        elif cmd == 'new':
            render_new();
        elif cmd == 'watch':
            watch()
        elif cmd == 'rank':
            render_index();
        else:
            print '...yes? (all,new,watch,rank)'
    else:
        print '...yes? (all,new,watch,rank)'


def render_new():
    posts_in = set(os.listdir('./posts'))
    posts_out = set(os.listdir('./rendered'))
    render_list(posts_in.difference(posts_out))


def render_all():
    render_list(os.listdir('./posts'), force=True)


def start_server():
    PORT = 9091
    Handler = SimpleHTTPServer.SimpleHTTPRequestHandler
    httpd = SocketServer.TCPServer(("", PORT), Handler)
    print "serving at port", PORT
    httpd_thread = threading.Thread(target=httpd.serve_forever)
    httpd_thread.setDaemon(True)
    httpd_thread.start()


def watch():
    start_server()
    path = './posts'
    before = set([(f, os.stat(path + '/' + f).st_mtime) for f in os.listdir(path)])
    while 1:
      after = set([(f, os.stat(path + '/' + f).st_mtime) for f in os.listdir(path)])
      changed = [f for (f, d) in before.difference(after)]
      if len(changed):
          render_list(changed, force=True)
      before = after
      time.sleep(1)


main()