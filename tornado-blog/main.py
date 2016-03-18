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

import logging
import os.path
import time

from tornado.escape import json_decode
from tornado.httpclient import HTTPClient
from tornado.httputil import url_concat
import tornado.ioloop
from tornado.options import define, options, parse_command_line
from tornado.web import RequestHandler
import tornado.web

from account import LoginHandler, LogoutHandler, RegisterHandler, \
    ForgotPwdHandler, ResetPwdHandler
from admin import AdminHandler, Admin2Handler, Admin3Handler, FormHandler, \
    FormAdvancedHandler, FormValidationHandler, FormWizardsHandler, \
    FormUploadHandler, FormButtonsHandler, GeneralElementsHandler, \
    MediaGalleryHandler, TypographyHandler, IconsHandler, GlyphiconsHandler, \
    WidgetsHandler, InvoiceHandler, InboxHandler, CalenderHandler, TablesHandler, \
    TablesDynamicHandler, ChartjsHandler, Chartjs2Handler, MorisjsHandler, \
    EchartsHandler, OtherChartsHandler, AdditionalEcommerceHandler, \
    AdditionalProjectsHandler, AdditionalProjectDetailHandler, \
    AdditionalContactsHandler, AdditionalProfileHandler, Extras500Handler, \
    ExtrasPlainHandler, ExtrasLoginHandler, ExtrasPricingTablesHandler
from base import timestamp_datetime
from blog import AddArticleHandler, ArticleHandler, AjaxArticlesHandler, \
    MyArticlesHandler, EditArticleHandler, AjaxMyArticlesHandler, \
    MyArticleHandler, AddParagraphHandler, EditParagraphHandler, \
    UpParagraphHandler, DownParagraphHandler, EditParagraphRawHandler, \
    EditParagraphImgHandler, AddParagraphRawHandler, AddParagraphImgHandler, \
    DelParagraphHandler, AddParagraphAfterHandler, AddParagraphRawAfterHandler, \
    AddParagraphImgAfterHandler
from chat import ChatOverviewHandler, ChatRoomHandler, MsgHandler, \
    ChatFriendListHandler
from greenboard import AddBoardHandler, EditBoardHandler, RemoveBoardHandler, \
    BoardsHandler
from stickynote import NotesHandler, AddNoteHandler, EditNoteHandler, \
    RemoveNoteHandler


define("port", default=8888, help="run on the given port", type=int)
define("debug", default=True, help="run in debug mode")


class PageNotFoundHandler(RequestHandler):
    def get(self):
        self.render('404.html')


class MainHandler(tornado.web.RequestHandler):
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
        
        self.render('index.html', articles=_articles)


class AboutHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('about.html')


class ContactHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('contact.html')


class DemoCenterHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('demo-center.html')


class RichTextEditorHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('richeditor/full_page.html')


class GoGameHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('gogame/playing.html')


class GomokuGameHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('gogame/gomoku.html')


class SyntaxHighlighterHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('SyntaxHighlighter/example.htm')


class ScrollHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('scroll/travel.html')


class DatatablesHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('datatables/example.html')


class Html5ColorGameHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('html5/color-game.html')


class Html5GearAnimationHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('html5/gear-animation.html')


class Html5FiveStoneHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('html5/five-stone.html')


class Html5ChineseChessHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('html5/chinese-chess.html')


class Html5TimelineHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('html5/timeline.html')


def main():
    parse_command_line()
    app = tornado.web.Application(
        [            
            (r"/", MainHandler),
            (r"/about", AboutHandler),
            (r"/demo-center", DemoCenterHandler),
            (r"/contact", ContactHandler),
            (r"/article", ArticleHandler),
            (r"/ajax-articles", AjaxArticlesHandler),
            (r"/ajax-my-articles", AjaxMyArticlesHandler),
            (r'/account/login', LoginHandler),
            (r'/account/logout', LogoutHandler),
            (r'/account/register', RegisterHandler),
            (r'/account/forgot-pwd', ForgotPwdHandler),
            (r'/account/reset-pwd', ResetPwdHandler),
            (r"/admin/my-articles", MyArticlesHandler),
            (r"/admin/my-article", MyArticleHandler),
            (r"/admin/add-article", AddArticleHandler),
            (r"/admin/edit-article", EditArticleHandler),
            (r"/admin/add-paragraph", AddParagraphHandler),
            (r"/admin/add-paragraph-raw", AddParagraphRawHandler),
            (r"/admin/add-paragraph-img", AddParagraphImgHandler),
            (r"/admin/add-paragraph/after", AddParagraphAfterHandler),
            (r"/admin/add-paragraph-raw/after", AddParagraphRawAfterHandler),
            (r"/admin/add-paragraph-img/after", AddParagraphImgAfterHandler),
            (r"/admin/edit-paragraph", EditParagraphHandler),
            (r"/admin/edit-paragraph-raw", EditParagraphRawHandler),
            (r"/admin/edit-paragraph-img", EditParagraphImgHandler),
            (r"/admin/paragraph/up", UpParagraphHandler),
            (r"/admin/paragraph/down", DownParagraphHandler),
            (r"/admin/paragraph/del", DelParagraphHandler),
            (r"/sticky-note/boards", BoardsHandler),
            (r"/sticky-note/add-board", AddBoardHandler),
            (r"/sticky-note/edit-board", EditBoardHandler),
            (r"/sticky-note/remove-board", RemoveBoardHandler),
            (r"/sticky-note/notes", NotesHandler),
            (r"/sticky-note/add-note", AddNoteHandler),
            (r"/sticky-note/edit-note", EditNoteHandler),
            (r"/sticky-note/remove-note", RemoveNoteHandler),
            (r"/rich-text-editor", RichTextEditorHandler),
            (r"/syntax-high-lighter", SyntaxHighlighterHandler),
            (r"/aplan/scroll", ScrollHandler),
            (r"/go-game", GoGameHandler),
            (r"/gomoku-game", GomokuGameHandler),
            (r"/chat/overview", ChatOverviewHandler),
            (r"/chat/friends", ChatFriendListHandler),
            (r"/chat/chatroom", ChatRoomHandler),
            (r"/chat/msg", MsgHandler),
            (r"/datatables/demo", DatatablesHandler),
            (r"/html5/color-game", Html5ColorGameHandler),
            (r"/html5/gear-animation", Html5GearAnimationHandler),
            (r"/html5/five-stone", Html5FiveStoneHandler),
            (r"/html5/chinese-chess", Html5ChineseChessHandler),
            (r"/html5/timeline", Html5TimelineHandler),
            (r'/admin/1', AdminHandler),
            (r'/admin/2', Admin2Handler),
            (r'/admin/3', Admin3Handler),
            (r'/admin/form', FormHandler),
            (r'/admin/form/advanced', FormAdvancedHandler),
            (r'/admin/form/validation', FormValidationHandler),
            (r'/admin/form/wizards', FormWizardsHandler),
            (r'/admin/form/upload', FormUploadHandler),
            (r'/admin/form/buttons', FormButtonsHandler),
            (r'/admin/general/elements', GeneralElementsHandler),
            (r'/admin/media/gallery', MediaGalleryHandler),
            (r'/admin/typography', TypographyHandler),
            (r'/admin/icons', IconsHandler),
            (r'/admin/glyphicons', GlyphiconsHandler),
            (r'/admin/widgets', WidgetsHandler),
            (r'/admin/invoice', InvoiceHandler),
            (r'/admin/inbox', InboxHandler),
            (r'/admin/calender', CalenderHandler),
            (r'/admin/tables', TablesHandler),
            (r'/admin/tables/dynamic', TablesDynamicHandler),
            (r'/admin/chartjs', ChartjsHandler),
            (r'/admin/chartjs2', Chartjs2Handler),
            (r'/admin/morisjs', MorisjsHandler),
            (r'/admin/echarts', EchartsHandler),
            (r'/admin/charts/other', OtherChartsHandler),
            (r'/admin/additional/ecommerce', AdditionalEcommerceHandler),
            (r'/admin/additional/projects', AdditionalProjectsHandler),
            (r'/admin/additional/project/detail', AdditionalProjectDetailHandler),
            (r'/admin/additional/contacts', AdditionalContactsHandler),
            (r'/admin/additional/profile', AdditionalProfileHandler),
            (r'/admin/extras/404', PageNotFoundHandler),
            (r'/admin/extras/500', Extras500Handler),
            (r'/admin/extras/plain', ExtrasPlainHandler),
            (r'/admin/extras/login', ExtrasLoginHandler),
            (r'/admin/extras/pricing_tables', ExtrasPricingTablesHandler),
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
    tornado.locale.load_gettext_translations(os.path.join(os.path.dirname(__file__), "locale"), "stickynote")
    tornado.locale.set_default_locale("en_US")
    app.listen(options.port)
    tornado.ioloop.IOLoop.current().start()


if __name__ == "__main__":
    main()
