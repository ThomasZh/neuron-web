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

from tornado.escape import json_decode, json_encode
from tornado.httpclient import HTTPClient
from tornado.httputil import url_concat

from account import ssoLogin
from base import BaseHandler, timestamp_datetime, STP
from wechat import getAccessToken, APP_ID, APP_SECRET, getUserInfo


class WechatActivityIndexHandler(BaseHandler):
    def get(self):
        _id = self.get_argument("ekey", "")
        self.redirect("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxaa328c83d3132bfb&redirect_uri=http://planc2c.com/wechat/activity/desc?ekey="+_id+"&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect")


class WechatActivityApplyHandler(BaseHandler):
    def get(self):
        _id = self.get_argument("ekey", "")
        _sessionTicket = self.get_secure_cookie("ticket")
        
        params = {"X-Session-Id": _sessionTicket}
        url = url_concat("http://"+STP+"/activities/"+_id+"/detail", params)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got response %r", response.body)
        _info = json_decode(response.body)
        
        _begin_time = timestamp_datetime(_info["beginTime"]/1000)
        _info["beginTime"] = _begin_time
        
        params = {"X-Session-Id": _sessionTicket}
        url = url_concat("http://"+STP+"/activities/"+_id+"/application-template", params)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got response %r", response.body)
        _template = json_decode(response.body)
        
        self.render('wechat/activity_apply.html', ekey=_id, info = _info, template = _template)

    def post(self):
        _id = self.get_argument("ekey", "")
        _sessionTicket = self.get_secure_cookie("ticket")
        
        params = {"X-Session-Id": _sessionTicket}
        url = url_concat("http://"+STP+"/activities/"+_id+"/application-template", params)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got response %r", response.body)
        _template = json_decode(response.body)
        
        arr = []
        for _field in _template:
            _field_name = _field['fieldName']
            _field_name = unicode(_field_name).encode('utf-8')
            logging.info("got fieldName %r", _field_name)
            _field_value = self.get_argument("participation_"+_field_name, "")
            logging.info("got fieldValue %r", _field_value)
            data = {_field_name : _field_value, "type": 200}
            arr.append(data)
        _json = json_encode(arr)
        
        params = {"X-Session-Id": _sessionTicket}
        url = url_concat("http://"+STP+"/activities/"+_id+"/applications", params)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="POST", body=_json)
        
        self.render('wechat/activity_apply_success.html')


class WechatActivitySignupHandler(BaseHandler):
    def post(self):
        _id = self.get_argument("ekey", "")
        _sessionTicket = self.get_secure_cookie("ticket")

        params = {"X-Session-Id": _sessionTicket}
        url = url_concat("http://"+STP+"/activities/"+_id+"/signups", params)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="POST")
        
        self.render('wechat/activity_apply_success.html')


class WechatActivityDescHandler(BaseHandler):
    def get(self):
        _id = self.get_argument("ekey", "")
        logging.debug("got id %r", _id)
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
        url = url_concat("http://"+STP+"/activities/"+_id+"/detail", params)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got response %r", response.body)
        _info = json_decode(response.body)
        
        _begin_time = timestamp_datetime(_info["beginTime"]/1000)
        _info["beginTime"] = _begin_time
         
        params = {"X-Session-Id": _sessionTicket}
        url = url_concat("http://"+STP+"/activities/"+_id+"/poster", params)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got response %r", response.body)
        _descs = json_decode(response.body)
        
        self.render('wechat/activity_desc.html', ekey = _id, info = _info, descs = _descs)
