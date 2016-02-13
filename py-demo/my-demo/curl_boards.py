#xiaorui.cc
import tornado.ioloop
from tornado.httpclient import AsyncHTTPClient
from tornado.httputil import url_concat

def handle_request(response):
    '''callback needed when a response arrive'''
    if response.error:
        print "Error:", response.error
    else:
        print 'called'
        print response.body

params = {"before": 1454716792059, "limit": 20}
url = url_concat("http://182.92.66.109/greenboards", params)
http_client = AsyncHTTPClient()

#for i in range(10):
http_client.fetch(url, handle_request, method="GET")           
tornado.ioloop.IOLoop.instance().start()