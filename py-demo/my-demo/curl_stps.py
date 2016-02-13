import tornado.ioloop
from tornado.httpclient import AsyncHTTPClient
from tornado.escape import json_decode

def handle_request(response):
    '''callback needed when a response arrive'''
    if response.error:
        print "Error:", response.error
    else:
        print 'called'
        print response.body
        array = json_decode(response.body)
        for data in array:
            id_ = data['id']
            ip_ = data['ip']
            port_ = data['port']
            active_ = data['active']
            max_ = data['maxVersion']
            min_ = data['minVersion']
            print id_,ip_,port_,active_,max_,min_

http_client = AsyncHTTPClient() # we initialize our http client instance
http_client.fetch("http://182.92.165.159/stps", handle_request) # here we try
                    # to fetch an url and delegate its response to callback
tornado.ioloop.IOLoop.instance().start() # start the tornado ioloop to
                    # listen for events