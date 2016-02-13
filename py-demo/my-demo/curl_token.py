#xiaorui.cc
import tornado.ioloop
from tornado.httpclient import AsyncHTTPClient
from tornado.escape import json_encode
#from tornado.httputil import url_concat

def handle_request(response):
    '''callback needed when a response arrive'''
    if response.error:
        print "Error:", response.error
    else:
        print 'called'
        print response.body

#AsyncHTTPClient.configure("tornado.curl_httpclient.CurlAsyncHTTPClient")
params = {"deviceId": "a", "appId": "b", "clientVersion": "Romania_v3.0.01"}
_str = json_encode(params);
print _str
#body = { "deviceId" : "1a4cc92a52ac3c4e5d0f851603e01a72", "appId" : "3d82737b73544137a19cd75a32b7e8d4", "clientVersion" : "Romania_v3.0.01"}
#url = url_concat("http://182.92.165.159/gatekeeper/tokens", params)
url = "http://182.92.165.159/gatekeeper/tokens"
http_client = AsyncHTTPClient()

#for i in range(10):
http_client.fetch(url, handle_request, method="POST", body=_str)           
tornado.ioloop.IOLoop.instance().start()