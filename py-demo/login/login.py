#!/usr/bin/env python
# -*- coding: utf-8 -*-


import os

from tornado.escape import json_encode, json_decode
from tornado.httpclient import HTTPClient
import tornado.ioloop
from tornado.options import define, options
import tornado.web


define("port", default=8888, help="run on the given port", type=int)
define("debug", default=True, help="run in debug mode")


class BaseHandler(tornado.web.RequestHandler):
    def get_current_user(self):
        return self.get_secure_cookie("user")


class LoginHandler(BaseHandler):
    def get(self):
        self.render('login.html', message="")

    def post(self):
        _loginname = self.get_argument("loginname", "")
        print _loginname
        #_password = self.get_argument("password", "")
        #_md5pwd = hashlib.md5(_password).hexdigest()
        _md5pwd = self.get_argument("password", "")
        print _md5pwd
    
        try:
            params = { "osVersion" : "webkit:abcedfg",
                  "gateToken" : "bZJc2sWbQLKos6GkHn/VB9oXwQt8S0R0kRvJ5/xJ89E=",
                  "deviceId" : "bZJc2sWbQLKos6GkHn/VB9oXwQt8S0R0kRvJ5/xJ89E=",
                  "password" : _md5pwd,
                  "email" : _loginname}
            _str = json_encode(params)
            url = "http://182.92.66.109/account/login"
            http_client = HTTPClient()
            response = http_client.fetch(url, method="POST", body=_str)
            print response.body
            _stp_session = json_decode(response.body)
            _sessionTicket = _stp_session["sessionToken"]
            
            self.set_secure_cookie("user", _sessionTicket)
            self.redirect("/")
        except Exception:  
            self.render('login.html', message="Please enter a correct username and password.")


class WelcomeHandler(BaseHandler):
    @tornado.web.authenticated # 如果没有登陆，就自动跳转到登陆页面
    def get(self):
        username = tornado.escape.xhtml_escape(self.current_user)
        self.render('index.html', user=username)


class LogoutHandler(BaseHandler):
    def post(self):
        self.clear_cookie("user")
        self.redirect("/")


if __name__ == "__main__":
    tornado.options.parse_command_line()

    settings = {
        "template_path": os.path.join(os.path.dirname(__file__), "templates"),
        "static_path": os.path.join(os.path.dirname(__file__), "static"),
        # __TODO:_GENERATE_YOUR_OWN_RANDOM_VALUE_HERE__
        "cookie_secret": "bZJc2sWbQLKos6GkHn/VB9oXwQt8S0R0kRvJ5/xJ89E=",
        "xsrf_cookies": True,
        "login_url": "/login"
    }

    application = tornado.web.Application([
        (r'/', WelcomeHandler),
        (r'/login', LoginHandler),
        (r'/logout', LogoutHandler)
        ], **settings)

    application.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()
    