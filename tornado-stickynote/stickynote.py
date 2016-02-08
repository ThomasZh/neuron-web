#!/usr/bin/env python
#
# Copyright 2015 Time2Box
# thomas@time2box.com
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
import time

from tornado.escape import json_decode, json_encode
from tornado.httpclient import HTTPClient
from tornado.httputil import url_concat
import tornado.web

from base import BaseHandler


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