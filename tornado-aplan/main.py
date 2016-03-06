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


import os.path

import tornado.ioloop
from tornado.options import define, options
import tornado.web

from account import LoginHandler, LogoutHandler, RegisterHandler, \
    ForgotPwdHandler, ResetPwdHandler
from wechat_activity import WechatActivityIndexHandler, WechatActivityDescHandler, \
    WechatActivityApplyHandler, WechatActivitySignupHandler
from wechat_journey import WechatJourneyIndexHandler, WechatJourneyInfoHandler


define("port", default=8888, help="run on the given port", type=int)
define("debug", default=True, help="run in debug mode")


class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('index.html')


class AgreementHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('agreement.html')


class PrivacyHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('privacy.html')


class ContactHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('contact.html')


class PageNotFoundHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('404.html')


def main():
    app = tornado.web.Application(
        [
            (r'/', MainHandler),
            (r'/contact', ContactHandler),
            (r'/agreement', AgreementHandler),
            (r'/privacy', PrivacyHandler),
            (r'/account/login', LoginHandler),
            (r'/account/logout', LogoutHandler),
            (r'/account/register', RegisterHandler),
            (r'/account/forgot-pwd', ForgotPwdHandler),
            (r'/account/reset-pwd', ResetPwdHandler),
            (r'/wechat/activity/index', WechatActivityIndexHandler),
            (r'/wechat/activity/desc', WechatActivityDescHandler),
            (r'/wechat/activity/apply', WechatActivityApplyHandler),
            (r'/wechat/activity/signup', WechatActivitySignupHandler),
            (r'/stp-web-5.0.0/aplan/activity/info', WechatActivityIndexHandler),
            (r'/wechat/journey/index', WechatJourneyIndexHandler),
            (r'/wechat/journey/info', WechatJourneyInfoHandler),
            (".*", PageNotFoundHandler),
        ],
        # __TODO:_GENERATE_YOUR_OWN_RANDOM_VALUE_HERE__
        cookie_secret="bZJc2sWbQLKos6GkHn/VB9oXwQt8S0R0kRvJ5/xJ89E=",
        template_path=os.path.join(os.path.dirname(__file__), "templates"),
        static_path=os.path.join(os.path.dirname(__file__), "static"),
        xsrf_cookies=True,
        debug=options.debug,
        login_url="/account/login",
    )
    # tornado.locale.load_gettext_translations(os.path.join(os.path.dirname(__file__), "locale"), "aplan")
    tornado.locale.set_default_locale("en_US")
    tornado.options.parse_command_line()
    app.listen(options.port)
    tornado.ioloop.IOLoop.current().start()

if __name__ == '__main__':
    main()
