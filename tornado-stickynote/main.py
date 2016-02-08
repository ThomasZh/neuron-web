#!/usr/bin/env python
#
# Copyright 2015 Time2Box
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
from tornado.options import define, options, parse_command_line
import tornado.web

from account import LoginHandler, LogoutHandler, RegisterHandler, \
    ForgotPwdHandler
from greenboard import BoardsHandler, AddBoardHandler, EditBoardHandler, \
    RemoveBoardHandler
from stickynote import NotesHandler, AddNoteHandler, EditNoteHandler, \
    RemoveNoteHandler
from activity import ActivityHandler


define("port", default=8888, help="run on the given port", type=int)
define("debug", default=True, help="run in debug mode")


def main():
    parse_command_line()
    app = tornado.web.Application(
        [
            (r"/", BoardsHandler),
            (r'/login', LoginHandler),
            (r'/logout', LogoutHandler),
            (r'/register', RegisterHandler),
            (r'/forgot-pwd', ForgotPwdHandler),
            (r"/add-board", AddBoardHandler),
            (r"/edit-board", EditBoardHandler),
            (r"/remove-board", RemoveBoardHandler),
            (r"/notes", NotesHandler),
            (r"/add-note", AddNoteHandler),
            (r"/edit-note", EditNoteHandler),
            (r"/remove-note", RemoveNoteHandler),
            (r"/activity", ActivityHandler),
            ],
        # __TODO:_GENERATE_YOUR_OWN_RANDOM_VALUE_HERE__
        cookie_secret="bZJc2sWbQLKos6GkHn/VB9oXwQt8S0R0kRvJ5/xJ89E=",
        template_path=os.path.join(os.path.dirname(__file__), "templates"),
        static_path=os.path.join(os.path.dirname(__file__), "static"),
        xsrf_cookies=True,
        debug=options.debug,
        login_url="/login",
        )
    app.listen(options.port)
    tornado.ioloop.IOLoop.current().start()


if __name__ == "__main__":
    main()
