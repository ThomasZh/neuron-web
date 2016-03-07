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

from account import ssoLogin
from base import BaseHandler, STP, timestamp_datetime
from wechat import getAccessToken, APP_ID, APP_SECRET, getUserInfo


class WechatJourneyIndexHandler(BaseHandler):
    def get(self):
        # ekey=activityId_journeyId
        _ekey = self.get_argument("ekey", "")
        logging.debug("got _ekey %r", _ekey)
        self.redirect("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxaa328c83d3132bfb&redirect_uri=http://planc2c.com/wechat/journey/info?ekey="+_ekey+"&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect")


class WechatJourneyInfoHandler(BaseHandler):
    def get(self):
        _ekey = self.get_argument("ekey", "")
        logging.debug("got _ekey %r", _ekey)
        arr = _ekey.split('_')
        activityId = arr[0]
        journeyId = arr[1]
        logging.debug("got activityId %r", activityId)
        logging.debug("got journeyId %r", journeyId)
        _code = self.get_argument("code", "")
        logging.debug("got code %r", _code)
        _unionid = self.get_argument("unionid", "")
        logging.debug("got unionid %r", _unionid)
        
        _sessionTicket = self.get_secure_cookie("ticket")
        if not _sessionTicket:
            accessToken = getAccessToken(APP_ID, APP_SECRET, _code);
            _token = accessToken["access_token"];
            logging.debug("got token %r", _token)
            _openid = accessToken["openid"];
            logging.debug("got openid %r", _openid)
            _unionid = accessToken["unionid"];
            logging.debug("got unionid %r", _unionid)
        
            userInfo = getUserInfo(_token, _openid)
            _nickname = userInfo["nickname"]
            _nickname = unicode(_nickname).encode('utf-8')
            logging.debug("got nickname %r", _nickname)
            _headimgurl = userInfo["headimgurl"]
            logging.debug("got headimgurl %r", _headimgurl)
        
            _user_agent = self.request.headers["User-Agent"]
            _lang = self.request.headers["Accept-Language"]
            # 1604=wechat
            stpSession = ssoLogin(1604, _unionid, _nickname, _headimgurl, _user_agent, _lang)
            _accountId = stpSession["accountId"]
            _sessionTicket = stpSession["sessionToken"]
            self.set_secure_cookie("ticket", _sessionTicket)
        
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
        
        self.render('wechat/journey_info.html', info=_info)
