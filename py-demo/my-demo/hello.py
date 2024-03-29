import tornado.httpserver
import tornado.ioloop
from tornado.options import define, options
import tornado.options
import tornado.web


define("port", default=8888, help="run on the given port", type=int)
class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        self.write('Hello, Tornado!')
if __name__ == "__main__":
    tornado.options.parse_command_line()
    app = tornado.web.Application(handlers=[(r"/", IndexHandler)])
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()
