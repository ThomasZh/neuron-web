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

from base import BaseHandler, STP, timestamp_datetime


class WechatJourneyInfoHandler(BaseHandler):
    def get(self):
        _ekey = self.get_argument("ekey", "")
        logging.debug("got _ekey %r", _ekey)
        arr = _ekey.split('_')
        activityId = arr[0]
        journeyId = arr[1]
        logging.debug("got activityId %r", activityId)
        logging.debug("got journeyId %r", journeyId)
        
        url = "http://"+STP+"/activities/"+activityId+"/journeys/"+journeyId
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got response %r", response.body)
        _info = json_decode(response.body)
        
        _begin_time = timestamp_datetime(_info["beginTime"]/1000)
        _info["beginTime"] = _begin_time
        _end_time = timestamp_datetime(_info["endTime"]/1000)
        _info["endTime"] = _end_time
        
        self.render('wechat/journey_info.html', info=_info)
