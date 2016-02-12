#!/usr/bin/env python
#
# Copyright 2016 Time2Box
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

import json
import logging
import time

from tornado.escape import json_encode, json_decode
from tornado.httpclient import HTTPClient
from tornado.httputil import url_concat
import tornado.web

from base import BaseHandler, timestamp_datetime


class MyArticlesHandler(BaseHandler):
    @tornado.web.authenticated  # if no session, redirect to login page
    def get(self):
        _timestamp = long(time.time() * 1000)
        params = {"before": _timestamp, "limit": 20}
        url = url_concat("http://182.92.66.109/blogs/articles", params)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got response %r", response.body)
        _articles = json_decode(response.body)
        
        for _article in _articles:
            _timestamp = _article["timestamp"]
            _datetime = timestamp_datetime(_timestamp / 1000)
            _article["timestamp"] = _datetime
            
        self.render('blog/my-articles.html', articles=_articles)


class AddArticleHandler(BaseHandler):
    @tornado.web.authenticated  # if no session, redirect to login page
    def get(self):
        self.render('blog/add-article.html')
        
    def post(self):
        _ticket = self.get_secure_cookie("ticket")
        _title = (self.request.arguments['title'])[0]
        _content = (self.request.arguments['content'])[0]
        _img_url = (self.request.arguments['imgUrl'])[0]
        logging.info("got title %r", _title)
        logging.info("got title %r", _content)
        logging.info("got title %r", _img_url)
        
        params = {"X-Session-Id": _ticket}
        url = url_concat("http://182.92.66.109/blogs/articles", params)
        data = {"title": _title, "content": _content, "imgUrl": _img_url}
        _json = json_encode(data)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="POST", body=_json)
        logging.info("got response %r", response.body)

        _timestamp = long(time.time() * 1000)
        params = {"before": _timestamp, "limit": 20}
        url = url_concat("http://182.92.66.109/blogs/articles", params)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got response %r", response.body)
        _articles = json_decode(response.body)
        
        for _article in _articles:
            _timestamp = _article["timestamp"]
            _datetime = timestamp_datetime(_timestamp / 1000)
            _article["timestamp"] = _datetime
            
        self.render('blog/my-articles.html', articles=_articles)


class EditArticleHandler(BaseHandler):
    @tornado.web.authenticated  # if no session, redirect to login page
    def get(self):
        _article_id = (self.request.arguments['id'])[0]
        logging.info("article_id: ", _article_id)
        
        url = "http://182.92.66.109/blogs/articles/" + _article_id
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got response %r", response.body)
        _article = json_decode(response.body)
        
        self.render('blog/edit-article.html', article=_article)

    def post(self):
        _ticket = self.get_secure_cookie("ticket")
        _id = (self.request.arguments['articleId'])[0]
        _title = (self.request.arguments['title'])[0]
        _content = (self.request.arguments['content'])[0]
        _img_url = (self.request.arguments['imgUrl'])[0]
        logging.info("got title %r", _title)
        logging.info("got title %r", _content)
        logging.info("got title %r", _img_url)
        
        params = {"X-Session-Id": _ticket}
        url = url_concat("http://182.92.66.109/blogs/articles/"+_id, params)
        data = {"title": _title, "content": _content, "imgUrl": _img_url}
        _json = json_encode(data)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="PUT", body=_json)
        logging.info("got response %r", response.body)

        _timestamp = long(time.time() * 1000)
        params = {"before": _timestamp, "limit": 20}
        url = url_concat("http://182.92.66.109/blogs/articles", params)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got response %r", response.body)
        _articles = json_decode(response.body)
        
        for _article in _articles:
            _timestamp = _article["timestamp"]
            _datetime = timestamp_datetime(_timestamp / 1000)
            _article["timestamp"] = _datetime
            
        self.render('blog/my-articles.html', articles=_articles)


class ArticleHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('blog/article.html')


class AjaxArticlesHandler(tornado.web.RequestHandler):
    def get(self):
        _timestamp = long(time.time() * 1000)
        params = {"before": _timestamp, "limit": 20}
        url = url_concat("http://182.92.66.109/blogs/articles", params)
        http_client = HTTPClient()
        response = http_client.fetch(url, method="GET")
        logging.info("got response %r", response.body)
        _articles = json_decode(response.body)
        
        for _article in _articles:
            _timestamp = _article["timestamp"]
            _datetime = timestamp_datetime(_timestamp / 1000)
            _article["timestamp"] = _datetime
        
        self.finish(json.dumps(_articles))  
