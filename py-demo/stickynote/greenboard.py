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

import logging
import os.path
import time

from tornado import gen
from tornado.escape import json_decode, json_encode
from tornado.httpclient import HTTPClient
from tornado.httputil import url_concat
import tornado.ioloop
from tornado.options import define, options, parse_command_line
import tornado.web


define("port", default=8888, help="run on the given port", type=int)
define("debug", default=False, help="run in debug mode")


class MainHandler(tornado.web.RequestHandler):
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


class AddBoardViewHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("add-board.html")


class AddBoardActionHandler(tornado.web.RequestHandler):
    @gen.coroutine
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


class EditBoardViewHandler(tornado.web.RequestHandler):
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
        

class EditBoardActionHandler(tornado.web.RequestHandler):
    @gen.coroutine
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
        

class RemoveBoardActionHandler(tornado.web.RequestHandler):
    @gen.coroutine
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
        
                        
class NotesViewHandler(tornado.web.RequestHandler):
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
        
        
class AddNoteViewHandler(tornado.web.RequestHandler):
    def get(self):
        _boardId = (self.request.arguments['boardId'])[0]
        logging.info("got _boardId %r", _boardId)
        print _boardId
        
        self.render("add-note.html", boardId=_boardId)
        

class AddNoteActionHandler(tornado.web.RequestHandler):
    @gen.coroutine
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
        

class EditNoteViewHandler(tornado.web.RequestHandler):
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
        

class EditNoteActionHandler(tornado.web.RequestHandler):
    @gen.coroutine
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
        _completed = True
        try:
            _completed = (self.request.arguments['completed'])  
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
        

class RemoveNoteActionHandler(tornado.web.RequestHandler):
    @gen.coroutine
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
            (r"/add-board", AddBoardViewHandler),
            (r"/add-board-action", AddBoardActionHandler),
            (r"/edit-board", EditBoardViewHandler),
            (r"/edit-board-action", EditBoardActionHandler),
            (r"/remove-board-action", RemoveBoardActionHandler),
            (r"/notes", NotesViewHandler),
            (r"/add-note", AddNoteViewHandler),
            (r"/add-note-action", AddNoteActionHandler),
            (r"/edit-note", EditNoteViewHandler),
            (r"/edit-note-action", EditNoteActionHandler),
            (r"/remove-note-action", RemoveNoteActionHandler),
            ],
        cookie_secret="__TODO:_GENERATE_YOUR_OWN_RANDOM_VALUE_HERE__",
        template_path=os.path.join(os.path.dirname(__file__), "templates"),
        static_path=os.path.join(os.path.dirname(__file__), "static"),
        xsrf_cookies=True,
        debug=options.debug,
        )
    app.listen(options.port)
    tornado.ioloop.IOLoop.current().start()


if __name__ == "__main__":
    main()
