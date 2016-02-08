#!/usr/bin/env python
#
# Copyright 2009 Facebook
#
# Licensed under the Apache License, Version 2.0 (the "License"); you may
# not use this file except in compliance with the License. You may obtain
# a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
# License for the specific language governing permissions and limitations
# under the License.

import base64
import logging
import os.path
import time
import uuid

from tornado.escape import json_decode, json_encode
from tornado.httpclient import HTTPClient
from tornado.httputil import url_concat
import tornado.ioloop
from tornado.options import define, options, parse_command_line
import tornado.web


define("port", default=8888, help="run on the given port", type=int)
define("debug", default=True, help="run in debug mode")


class BaseHandler(tornado.web.RequestHandler):
    def get_current_user(self):
        return self.get_secure_cookie("ticket")


class LoginHandler(BaseHandler):
    def get(self):
        _login_name = self.get_secure_cookie("login_name")
        if _login_name == None:
            _login_name = ""
        _remember_me = self.get_secure_cookie("remember_me")
        if _remember_me == None:
            _remember_me = "off"
        print "login_name: "+_login_name
        print "remember_me: " + _remember_me
        self.render('login.html', err_msg="", login_name=_login_name, remember_me=_remember_me)

    def post(self):
        _email = self.get_argument("input-email")
        _md5pwd = self.get_argument("input-password")
        _remember_me = self.get_argument("remember-me", "off")
        _user_agent = self.request.headers["User-Agent"]
        _device_id = base64.b64encode(uuid.uuid4().bytes + uuid.uuid4().bytes)
        print "login_name: "+_email
        print "remember_me: " + _remember_me
        
        try:
            params = { "osVersion" : "webkit:"+_user_agent,
                  "gateToken" : "bZJc2sWbQLKos6GkHn/VB9oXwQt8S0R0kRvJ5/xJ89E=",
                  "deviceId" : _device_id,
                  "password" : _md5pwd,
                  "email" : _email}
            _json = json_encode(params)
            url = "http://182.92.66.109/account/login"
            http_client = HTTPClient()
            response = http_client.fetch(url, method="POST", body=_json)
            print response.body
            _stp_session = json_decode(response.body)
            _session_ticket = _stp_session["sessionToken"]
            
            self.set_secure_cookie("ticket", _session_ticket)
            self.set_secure_cookie("login_name", _email)
            self.set_secure_cookie("remember_me", _remember_me)
            self.redirect("/")
        except Exception:  
            self.render('login.html', err_msg="Please enter a correct username and password.", 
                        login_name=_email, remember_me=_remember_me)


class LogoutHandler(BaseHandler):
    def post(self):
        _remember_me = self.get_secure_cookie("remember_me")
        if _remember_me == None:
            _remember_me = "off"
        print  _remember_me
        
        if _remember_me == "off":
            self.clear_cookie("ticket")
            self.clear_cookie("login_name")
            self.clear_cookie("remember_me")
        else:
            self.clear_cookie("ticket")
        self.redirect("/")


class RegisterHandler(BaseHandler):
    def get(self):
        self.render('register.html', err_msg="")

    def post(self):
        _email = self.get_argument("input-email")
        _md5pwd = self.get_argument("input-password")
        _user_agent = self.request.headers["User-Agent"]
        _lang = self.request.headers["Accept-Language"]
        _device_id = base64.b64encode(uuid.uuid4().bytes + uuid.uuid4().bytes)
        print _email
        print _md5pwd
        print _user_agent
        print _lang
    
        try:
            params = { "osVersion" : "webkit:"+_user_agent,
                  "gateToken" : "bZJc2sWbQLKos6GkHn/VB9oXwQt8S0R0kRvJ5/xJ89E=",
                  "deviceId" : _device_id,
                  "md5pwd" : _md5pwd,
                  "email" : _email,
                  "lang": _lang,}
            _json = json_encode(params)
            url = "http://182.92.66.109/account/email-register"
            http_client = HTTPClient()
            response = http_client.fetch(url, method="POST", body=_json)
            print response.body
            _stp_session = json_decode(response.body)
            _sessionTicket = _stp_session["sessionToken"]
            
            self.set_secure_cookie("ticket", _sessionTicket)
            self.set_secure_cookie("login_name", _email)
            self.redirect("/")
        except Exception:  
            self.render('register.html', err_msg="Email already exist, please try another.")


class ForgotPwdHandler(BaseHandler):
    def get(self):
        self.render('forgot-pwd.html', err_msg="")

    def post(self):
        _email = self.get_argument("input-email", "")
        print _email
        
        params = {"email" : _email}
        _json = json_encode(params)
        url = "http://182.92.66.109/account/apply-for-email-verification"
        http_client = HTTPClient()
        response = http_client.fetch(url, method="POST", body=_json)
        print response.body

        self.render('login.html', err_msg="Email has been send to your mail, please check it.", 
                    login_name=_email, remember_me="on")        


class MainHandler(BaseHandler):
    @tornado.web.authenticated # if no session, redirect to login page
    def get(self):
        _timestamp = long(time.time() * 1000)
        params = {"before": _timestamp, "limit": 20}
        url = url_concat("http://182.92.66.109/greenboards", params)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got response %r", response.body)
        print response.body
        boards = json_decode(response.body)
        self.render("index.html", boards=boards)


class AddBoardHandler(BaseHandler):
    @tornado.web.authenticated # if no session, redirect to login page
    def get(self):
        self.render("add-board.html")

    def post(self):
        _title = (self.request.arguments['title'])[0]
        logging.info("got title %r", _title)
        print _title
        
        params = {"title": _title}
        _str = json_encode(params)
        url = "http://182.92.66.109/greenboards"
        http_client = HTTPClient()
        response = http_client.fetch(url, method="POST", body=_str)
        print response.body
        
        _timestamp = long(time.time() * 1000)
        params = {"before": _timestamp, "limit": 20}
        url = url_concat("http://182.92.66.109/greenboards", params)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got response %r", response.body)
        print response.body
        boards = json_decode(response.body)
        self.render("index.html", boards=boards)


class EditBoardHandler(BaseHandler):
    @tornado.web.authenticated # if no session, redirect to login page
    def get(self):
        _boardId = (self.request.arguments['boardId'])[0]
        logging.info("got _boardId %r", _boardId)
        print _boardId
        
        url = "http://182.92.66.109/greenboards/"+_boardId
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        print response.body
        _board = json_decode(response.body)
        self.render("edit-board.html", board=_board)

    def post(self):
        _boardId = (self.request.arguments['boardId'])[0]
        logging.info("got _boardId %r", _boardId)
        print _boardId
        _title = (self.request.arguments['title'])[0]
        logging.info("got title %r", _title)
        print _title
        
        params = {"title": _title}
        _str = json_encode(params)
        url = "http://182.92.66.109/greenboards/"+_boardId
        http_client = HTTPClient()
        response = http_client.fetch(url, method="PUT", body=_str)
        print response.body
        
        _timestamp = long(time.time() * 1000)
        params = {"completed":False, "before": _timestamp, "limit": 20}
        url = url_concat("http://182.92.66.109/greenboards/"+_boardId+"/stickynotes", params)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got response %r", response.body)
        print response.body
        uncompleted_notes = json_decode(response.body)
        
        params = {"completed":True, "before": _timestamp, "limit": 20}
        url = url_concat("http://182.92.66.109/greenboards/"+_boardId+"/stickynotes", params)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got response %r", response.body)
        print response.body
        completed_notes = json_decode(response.body)
        
        self.render("stickynotes.html", boardId=_boardId, unotes=uncompleted_notes, cnotes=completed_notes)
        

class RemoveBoardHandler(BaseHandler):
    @tornado.web.authenticated # if no session, redirect to login page
    def post(self):
        _boardId = (self.request.arguments['boardId'])[0]
        logging.info("got _boardId %r", _boardId)
        print _boardId
        
        url = "http://182.92.66.109/greenboards/"+_boardId
        http_client = HTTPClient()
        response = http_client.fetch(url, method="DELETE")
        print response.body
        
        _timestamp = long(time.time() * 1000)
        params = {"before": _timestamp, "limit": 20}
        url = url_concat("http://182.92.66.109/greenboards", params)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got response %r", response.body)
        print response.body
        boards = json_decode(response.body)
        self.render("index.html", boards=boards)
        
                        
class NotesHandler(BaseHandler):
    @tornado.web.authenticated # if no session, redirect to login page
    def get(self):
        _boardId = (self.request.arguments['boardId'])[0]
        logging.info("got _boardId %r", _boardId)
        print _boardId
        
        _timestamp = long(time.time() * 1000)
        params = {"completed":False, "before": _timestamp, "limit": 20}
        url = url_concat("http://182.92.66.109/greenboards/"+_boardId+"/stickynotes", params)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got response %r", response.body)
        print response.body
        uncompleted_notes = json_decode(response.body)
        
        params = {"completed":True, "before": _timestamp, "limit": 20}
        url = url_concat("http://182.92.66.109/greenboards/"+_boardId+"/stickynotes", params)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got response %r", response.body)
        print response.body
        completed_notes = json_decode(response.body)
        
        self.render("stickynotes.html", boardId=_boardId, unotes=uncompleted_notes, cnotes=completed_notes)
        
        
class AddNoteHandler(BaseHandler):
    @tornado.web.authenticated # if no session, redirect to login page
    def get(self):
        _boardId = (self.request.arguments['boardId'])[0]
        logging.info("got _boardId %r", _boardId)
        print _boardId
        
        self.render("add-note.html", boardId=_boardId)

    def post(self):
        _boardId = (self.request.arguments['boardId'])[0]
        logging.info("got _boardId %r", _boardId)
        print _boardId
        _title = (self.request.arguments['title'])[0]
        logging.info("got title %r", _title)
        print _title
        _color = (self.request.arguments['color'])[0]
        logging.info("got color %r", _color)
        print _color
        
        params = {"title": _title, "color": _color, "boardId": _boardId}
        _str = json_encode(params)
        url = "http://182.92.66.109/greenboards/"+_boardId+"/stickynotes"
        http_client = HTTPClient()
        response = http_client.fetch(url, method="POST", body=_str)
        print response.body
        
        _timestamp = long(time.time() * 1000)
        params = {"completed":False, "before": _timestamp, "limit": 20}
        url = url_concat("http://182.92.66.109/greenboards/"+_boardId+"/stickynotes", params)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got response %r", response.body)
        print response.body
        uncompleted_notes = json_decode(response.body)
        
        params = {"completed":True, "before": _timestamp, "limit": 20}
        url = url_concat("http://182.92.66.109/greenboards/"+_boardId+"/stickynotes", params)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got response %r", response.body)
        print response.body
        completed_notes = json_decode(response.body)
        
        self.render("stickynotes.html", boardId=_boardId, unotes=uncompleted_notes, cnotes=completed_notes)
        

class EditNoteHandler(BaseHandler):
    @tornado.web.authenticated # if no session, redirect to login page
    def get(self):
        _boardId = (self.request.arguments['boardId'])[0]
        logging.info("got _boardId %r", _boardId)
        print _boardId
        _noteId = (self.request.arguments['noteId'])[0]
        logging.info("got _noteId %r", _noteId)
        print _noteId
        
        url = "http://182.92.66.109/greenboards/"+_boardId+"/stickynotes/"+_noteId
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        print response.body
        _note = json_decode(response.body)
        
        self.render("edit-note.html", note=_note)

    def post(self):
        _boardId = (self.request.arguments['boardId'])[0]
        logging.info("got _boardId %r", _boardId)
        print _boardId
        _noteId = (self.request.arguments['noteId'])[0]
        logging.info("got _noteId %r", _noteId)
        print _noteId
        _title = (self.request.arguments['title'])[0]
        logging.info("got title %r", _title)
        print _title
        _color = (self.request.arguments['color'])[0]
        logging.info("got color %r", _color)
        print _color
        try:
            _completed = (self.request.arguments['completed'])  
            _completed = True
        except Exception:  
            _completed = False  
        print _completed  
        
        params = {"title": _title, "color": _color, "id": _noteId, "completed": _completed}
        _str = json_encode(params)
        url = "http://182.92.66.109/greenboards/"+_boardId+"/stickynotes/"+_noteId
        http_client = HTTPClient()
        response = http_client.fetch(url, method="PUT", body=_str)
        print response.body
        
        _timestamp = long(time.time() * 1000)
        params = {"completed":False, "before": _timestamp, "limit": 20}
        url = url_concat("http://182.92.66.109/greenboards/"+_boardId+"/stickynotes", params)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got response %r", response.body)
        print response.body
        uncompleted_notes = json_decode(response.body)
        
        params = {"completed":True, "before": _timestamp, "limit": 20}
        url = url_concat("http://182.92.66.109/greenboards/"+_boardId+"/stickynotes", params)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got response %r", response.body)
        print response.body
        completed_notes = json_decode(response.body)
        
        self.render("stickynotes.html", boardId=_boardId, unotes=uncompleted_notes, cnotes=completed_notes)
        

class RemoveNoteHandler(BaseHandler):
    @tornado.web.authenticated # if no session, redirect to login page
    def post(self):
        _boardId = (self.request.arguments['boardId'])[0]
        logging.info("got _boardId %r", _boardId)
        print _boardId
        _noteId = (self.request.arguments['noteId'])[0]
        logging.info("got _noteId %r", _noteId)
        print _noteId
        
        url = "http://182.92.66.109/greenboards/"+_boardId+"/stickynotes/"+_noteId
        http_client = HTTPClient()
        response = http_client.fetch(url, method="DELETE")
        print response.body
        
        _timestamp = long(time.time() * 1000)
        params = {"completed":False, "before": _timestamp, "limit": 20}
        url = url_concat("http://182.92.66.109/greenboards/"+_boardId+"/stickynotes", params)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got response %r", response.body)
        print response.body
        uncompleted_notes = json_decode(response.body)
        
        params = {"completed":True, "before": _timestamp, "limit": 20}
        url = url_concat("http://182.92.66.109/greenboards/"+_boardId+"/stickynotes", params)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got response %r", response.body)
        print response.body
        completed_notes = json_decode(response.body)
        
        self.render("stickynotes.html", boardId=_boardId, unotes=uncompleted_notes, cnotes=completed_notes)


def main():
    parse_command_line()
    app = tornado.web.Application(
        [
            (r"/", MainHandler),
            (r'/login', LoginHandler),
            (r'/logout', LogoutHandler),
            (r'/register', RegisterHandler),
            (r'/forgot-pwd', ForgotPwdHandler),
            (r"/add-board", AddBoardHandler),
            (r"/edit-board", EditBoardHandler),
            (r"/remove-board", RemoveBoardHandler),
            (r"/notes", NotesHandler),
            (r"/add-note", AddNoteHandler),
            (r"/edit-note", EditNoteHandler),
            (r"/remove-note", RemoveNoteHandler),
            ],
        # __TODO:_GENERATE_YOUR_OWN_RANDOM_VALUE_HERE__
        cookie_secret="bZJc2sWbQLKos6GkHn/VB9oXwQt8S0R0kRvJ5/xJ89E=",
        template_path=os.path.join(os.path.dirname(__file__), "templates"),
        static_path=os.path.join(os.path.dirname(__file__), "static"),
        xsrf_cookies=True,
        debug=options.debug,
        login_url="/login",
        )
    app.listen(options.port)
    tornado.ioloop.IOLoop.current().start()


if __name__ == "__main__":
    main()
