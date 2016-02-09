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

from tornado.escape import json_decode
from tornado.httpclient import HTTPClient
from tornado.httputil import url_concat
import tornado.web

from base import BaseHandler, timestamp_datetime


class ActivityHandler(BaseHandler):
    @tornado.web.authenticated  # if no session, redirect to login page
    def get(self):
        _id = self.get_argument("id", "")
        _ticket = self.get_secure_cookie("ticket")
        if _ticket == None:
            _ticket = ""
        print _ticket
        
        params = {"X-Session-Id": _ticket}
        url = url_concat("http://182.92.66.109/activities/"+_id+"/detail", params)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got response %r", response.body)
        print response.body
        _info = json_decode(response.body)
        
        _begin_time = timestamp_datetime(_info["beginTime"]/1000)
        
        params = {"X-Session-Id": _ticket}
        url = url_concat("http://182.92.66.109/activities/"+_id+"/poster", params)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got response %r", response.body)
        print response.body
        _descs = json_decode(response.body)
        
        self.render('activity/activity-info.html', info=_info, begin_time=_begin_time, descs=_descs)
