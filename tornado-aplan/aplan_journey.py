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

from base import BaseHandler, STP, timestamp_datetime


class AplanJourneyInfoHandler(BaseHandler):
    def get(self):
        _sessionTicket = self.get_argument("X-Session-Id", "")
        self.set_secure_cookie("ticket", _sessionTicket)
        
        activityId = self.get_argument("activityId", "")
        journeyId = self.get_argument("journeyId", "")
        logging.debug("got activityId %r", activityId)
        logging.debug("got journeyId %r", journeyId)
        
        try:
            params = {"X-Session-Id": _sessionTicket}
            url = url_concat("http://"+STP+"/activities/"+activityId+"/journeys/"+journeyId, params)
            http_client = HTTPClient()
            response = http_client.fetch(url, method="GET")
            logging.info("got response %r", response.body)
            _info = json_decode(response.body)
         
            _begin_time = timestamp_datetime(_info["beginTime"]/1000)
            _info["beginTime"] = _begin_time
            _end_time = timestamp_datetime(_info["endTime"]/1000)
            _info["endTime"] = _end_time
        except Exception:
            # sessionTicket expire
            logging.error("sessionTicket %r expire", _sessionTicket)
        
        self.render('aplan/journey_info.html', info=_info)
