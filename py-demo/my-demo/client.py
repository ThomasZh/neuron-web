import tornado.ioloop
from tornado.httpclient import AsyncHTTPClient

def handle_request(response):
    '''callback needed when a response arrive'''
    if response.error:
        print "Error:", response.error
    else:
        print 'called'
        print response.body

http_client = AsyncHTTPClient() # we initialize our http client instance
http_client.fetch("http://ip.jsontest.com", handle_request) # here we try
                    # to fetch an url and delegate its response to callback
tornado.ioloop.IOLoop.instance().start() # start the tornado ioloop to
                    # listen for events