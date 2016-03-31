import json
import logging
import md5

from tornado.escape import json_decode, json_encode
from tornado.httpclient import HTTPClient
from tornado.httputil import url_concat
import tornado.web

from base import BaseHandler, timestamp_datetime


class ChatFriendListHandler(BaseHandler):
    @tornado.web.authenticated  # if no session, redirect to login page
    def get(self):
        _ticket = self.get_secure_cookie("ticket")
        
        params = {"X-Session-Id": _ticket}
        url = url_concat("http://182.92.66.109/talent/my-profile", params)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got response %r", response.body)
        _myAccount = json_decode(response.body)
        _myAccountId = _myAccount["accountId"]
        print "myAccountId: "+_myAccountId
        
        params = {"X-Session-Id": _ticket, "pageNum": 1, "pageSize": 2000}
        url = url_concat("http://182.92.66.109/talent/friends", params)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got response %r", response.body)
        _friends = json_decode(response.body)
        
        #m = hashlib.md5()
        m = md5.new()
        for _friend in _friends:
            _frinedAccountId = _friend["accountId"]
            print "frinedAccountId: "+_frinedAccountId
            # chatId = md5(myAccountId + friendAccountId)
            if cmp(_frinedAccountId, _myAccountId) :
                m.update(_frinedAccountId + _myAccountId)
                _chatId = m.hexdigest()
                print "chatId: "+_chatId
            else:
                m.update(_myAccountId + _frinedAccountId)
                _chatId = m.hexdigest()
                print "chatId: "+_chatId
            _friend["chatId"] = _chatId
            
        self.render('chat/friends.html', friends=_friends)


class ChatOverviewHandler(BaseHandler):
    @tornado.web.authenticated  # if no session, redirect to login page
    def get(self):
        _ticket = self.get_secure_cookie("ticket")
        
        params = {"X-Session-Id": _ticket, "chatType": 123, "pagenum": 1, "limit": 20}
        url = url_concat("http://182.92.66.109/chats/overviews", params)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got response %r", response.body)
        _chats = json_decode(response.body)
        
        for _chat in _chats:
            _timestamp = _chat["timestamp"]
            _datetime = timestamp_datetime(_timestamp / 1000)
            _chat["timestamp"] = _datetime
            
        self.render('chat/overview.html', chats=_chats)


class ChatRoomHandler(BaseHandler):
    @tornado.web.authenticated  # if no session, redirect to login page
    def get(self):
        _chat_id = self.get_argument("id")
        
        self.render('chat/chatroom.html', chatId=_chat_id)


class MsgHandler(BaseHandler):
    @tornado.web.authenticated  # if no session, redirect to login page
    def get(self):
        _ticket = self.get_secure_cookie("ticket")
        _chat_id = self.get_argument("id")
        print _chat_id
        
        params = {"X-Session-Id": _ticket, "limit": 20}
        url = url_concat("http://182.92.66.109/chats/"+ _chat_id +"/msgs", params)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        print response
        _msgs = json_decode(response.body)
        
        for _msg in _msgs:
            _timestamp = _msg["timestamp"]
            _datetime = timestamp_datetime(_timestamp / 1000)
            _msg["timestamp"] = _datetime
        
        self.finish(json.dumps(_msgs))
    
    @tornado.web.authenticated  # if no session, redirect to login page    
    def post(self):
        _ticket = self.get_secure_cookie("ticket")
        _login_name = self.get_secure_cookie("login_name")
        _chat_id = self.get_argument("chatId")
        _content = self.get_argument("content")
        print _chat_id+": "+_content
        
        params = {"X-Session-Id": _ticket}
        url = url_concat("http://182.92.66.109/chats/"+ _chat_id +"/msgs", params)
        data = {"type": 0, "content": _content}
        _json = json_encode(data)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="POST", body=_json)
        logging.info("got response %r", response.body)
