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


class BoardsHandler(BaseHandler):
    @tornado.web.authenticated  # if no session, redirect to login page
    def get(self):
        _ticket = self.get_secure_cookie("ticket")
        _login_name = self.get_secure_cookie("login_name")

        _timestamp = long(time.time() * 1000)
        params = {"X-Session-Id": _ticket, "before": _timestamp, "limit": 20}
        url = url_concat("http://182.92.66.109/greenboards", params)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got response %r", response.body)
        boards = json_decode(response.body)
        self.render("stickynote/boards.html", login_name=_login_name, boards=boards)


class AddBoardHandler(BaseHandler):
    @tornado.web.authenticated  # if no session, redirect to login page
    def get(self):
        self.render("stickynote/add-board.html")

    def post(self):
        _ticket = self.get_secure_cookie("ticket")
        _login_name = self.get_secure_cookie("login_name")
        _title = (self.request.arguments['title'])[0]
        logging.info("got title %r", _title)
        
        params = {"X-Session-Id": _ticket}
        url = url_concat("http://182.92.66.109/greenboards", params)
        data = {"title": _title}
        _json = json_encode(data)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="POST", body=_json)
        logging.info("got response %r", response.body)
        
        _timestamp = long(time.time() * 1000)
        params = {"X-Session-Id": _ticket, "before": _timestamp, "limit": 20}
        url = url_concat("http://182.92.66.109/greenboards", params)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got response %r", response.body)
        boards = json_decode(response.body)
        self.render("stickynote/boards.html", login_name=_login_name, boards=boards)


class EditBoardHandler(BaseHandler):
    @tornado.web.authenticated  # if no session, redirect to login page
    def get(self):
        _ticket = self.get_secure_cookie("ticket")
        _boardId = (self.request.arguments['boardId'])[0]
        logging.info("got _boardId %r", _boardId)
        
        params = {"X-Session-Id": _ticket}
        url = url_concat("http://182.92.66.109/greenboards/" + _boardId, params)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got response %r", response.body)
        _board = json_decode(response.body)
        self.render("stickynote/edit-board.html", board=_board)

    def post(self):
        _ticket = self.get_secure_cookie("ticket")
        _boardId = (self.request.arguments['boardId'])[0]
        logging.info("got _boardId %r", _boardId)
        _title = (self.request.arguments['title'])[0]
        logging.info("got title %r", _title)
        
        params = {"X-Session-Id": _ticket}
        url = url_concat("http://182.92.66.109/greenboards/" + _boardId, params)
        data = {"title": _title}
        _json = json_encode(data)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="PUT", body=_json)
        logging.info("got response %r", response.body)
        
        _timestamp = long(time.time() * 1000)
        params = {"completed":False, "before": _timestamp, "limit": 20}
        url = url_concat("http://182.92.66.109/greenboards/" + _boardId + "/stickynotes", params)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got response %r", response.body)
        uncompleted_notes = json_decode(response.body)
        
        params = {"completed":True, "before": _timestamp, "limit": 20}
        url = url_concat("http://182.92.66.109/greenboards/" + _boardId + "/stickynotes", params)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got response %r", response.body)
        completed_notes = json_decode(response.body)
        
        self.render("stickynote/stickynotes.html", boardId=_boardId, unotes=uncompleted_notes, cnotes=completed_notes)
        

class RemoveBoardHandler(BaseHandler):
    @tornado.web.authenticated  # if no session, redirect to login page
    def post(self):
        _ticket = self.get_secure_cookie("ticket")
        _login_name = self.get_secure_cookie("login_name")            
        _boardId = (self.request.arguments['boardId'])[0]
        logging.info("got _boardId %r", _boardId)
        
        params = {"X-Session-Id": _ticket}
        url = url_concat("http://182.92.66.109/greenboards/"+_boardId, params)
        http_client = HTTPClient()
        http_client.fetch(url, method="DELETE")
        
        _timestamp = long(time.time() * 1000)
        params = {"X-Session-Id": _ticket, "before": _timestamp, "limit": 20}
        url = url_concat("http://182.92.66.109/greenboards", params)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got response %r", response.body)
        boards = json_decode(response.body)
        self.render("stickynote/boards.html", login_name=_login_name, boards=boards)
