#!/usr/bin/env python
#
# Copyright 2015 planc2c.com
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

from base import BaseHandler, STP


class AplanApplicantsReportHandler(BaseHandler):
    def get(self):
        _sessionTicket = self.get_argument("X-Session-Id", "")
        self.set_secure_cookie("ticket", _sessionTicket)
        _id = self.get_argument("activityId", "")
        logging.debug("got activityId %r", _id)

        params = {"X-Session-Id": _sessionTicket}
        url = url_concat("http://"+STP+"/activities/"+_id+"/detail", params)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got response %r", response.body)
        _info = json_decode(response.body)
        
        params = {"X-Session-Id": _sessionTicket}
        url = url_concat("http://"+STP+"/activities/"+_id+"/application-template", params)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got response %r", response.body)
        _template = json_decode(response.body)
        
        params = {"X-Session-Id": _sessionTicket, "after": 0, "limit": 100}
        url = url_concat("http://"+STP+"/activities/"+_id+"/members", params)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got response %r", response.body)
        _members = json_decode(response.body)

        table = []
        for _member in _members:
            params = {"X-Session-Id": _sessionTicket}
            url = url_concat("http://"+STP+"/activities/"+_id+"/applications/"+_member['accountId'], params)
            http_client = HTTPClient()
            response = http_client.fetch(url, method="GET")
            logging.info("got response %r", response.body)
            _applications = json_decode(response.body)
            row = []
            for _application in _applications:
                keys = _application.keys()
                for _key in keys:
                    if _key != "type":
                        _value = _application[_key]
                        row.append(_value)
            table.append(row)

        self.render('aplan/applicants_report.html', info = _info, template = _template, applications = table)
