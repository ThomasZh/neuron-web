import logging
import os.path
import uuid


import tornado.httpserver
import tornado.ioloop
from tornado.options import define
import tornado.web
import tornado.websocket


define("port", default=8888, help="run on the given port", type=int)
define("debug", default=True, help="run in debug mode")


#def send_message(message):
#    for handler in ChatSocketHandler.socket_handlers:
#        try:
#            handler.write_message(message)
#        except:
#            logging.error('Error sending message', exc_info=True)


class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('index.html')


class ChatSocketHandler(tornado.websocket.WebSocketHandler):
    socket_handlers = set()

    def open(self):
        ChatSocketHandler.socket_handlers.add(self)
        send_message('A new user has entered the chat room.')

    def on_close(self):
        ChatSocketHandler.socket_handlers.remove(self)
        send_message('A user has left the chat room.')

    def on_message(self, message):
        send_message(message)


class ChatHandler(tornado.web.RequestHandler):
    callbacks = set()
    users = set()

    @tornado.web.asynchronous
    def get(self):
        ChatHandler.callbacks.add(self.on_new_message)
        self.user = user = self.get_cookie('user')
        if not user:
            self.user = user = str(uuid.uuid4())
            self.set_cookie('user', user)
        if user not in ChatHandler.users:
            ChatHandler.users.add(user)
            send_message('A new user has entered the chat room.')

    def on_new_message(self, message):
        if self.request.connection.stream.closed():
            return
        self.write(message)
        self.finish()

    def on_connection_close(self):
        ChatHandler.callbacks.remove(self.on_new_message)
        ChatHandler.users.discard(self.user)
        send_message('A user has left the chat room.')

    def post(self):
        _text = self.get_argument('text', '')
        print _text
        send_message(_text)


def send_message(message):
    for handler in ChatSocketHandler.socket_handlers:
        try:
            handler.write_message(message)
        except:
            logging.error('Error sending message', exc_info=True)

    for callback in ChatHandler.callbacks:
        try:
            callback(message)
        except:
            logging.error('Error in callback', exc_info=True)
    ChatHandler.callbacks = set()


def main():
    settings = {
        'template_path': os.path.join(os.path.dirname(__file__), 'templates'),
        'static_path': os.path.join(os.path.dirname(__file__), 'static'),
        'debug': True,
    }
    application = tornado.web.Application([
          ('/', MainHandler),
          ('/new-msg', ChatHandler),
          ('/new-msg/socket', ChatSocketHandler)
     ], **settings)
    http_server = tornado.httpserver.HTTPServer(application)
    http_server.listen(8888)
    tornado.ioloop.IOLoop.instance().start()

if __name__ == '__main__':
    main()