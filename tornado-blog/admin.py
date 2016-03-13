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
import tornado.web


class PageNotFoundHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('admin/page_404.html')


class AdminHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('admin/index.html')


class Admin2Handler(tornado.web.RequestHandler):
    def get(self):
        self.render('admin/index2.html')


class Admin3Handler(tornado.web.RequestHandler):
    def get(self):
        self.render('admin/index3.html')


class FormHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('admin/form.html')


class FormAdvancedHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('admin/form_advanced.html')


class FormValidationHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('admin/form_validation.html')


class FormWizardsHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('admin/form_wizards.html')


class FormUploadHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('admin/form_upload.html')


class FormButtonsHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('admin/form_buttons.html')


class GeneralElementsHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('admin/general_elements.html')


class MediaGalleryHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('admin/media_gallery.html')


class TypographyHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('admin/typography.html')


class IconsHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('admin/icons.html')


class GlyphiconsHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('admin/glyphicons.html')


class WidgetsHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('admin/widgets.html')


class InvoiceHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('admin/invoice.html')


class InboxHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('admin/inbox.html')


class CalenderHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('admin/calender.html')


class TablesHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('admin/tables.html')


class TablesDynamicHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('admin/tables_dynamic.html')


class ChartjsHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('admin/chartjs.html')


class Chartjs2Handler(tornado.web.RequestHandler):
    def get(self):
        self.render('admin/chartjs2.html')


class MorisjsHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('admin/morisjs.html')


class EchartsHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('admin/echarts.html')


class OtherChartsHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('admin/other_charts.html')


class AdditionalEcommerceHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('admin/e_commerce.html')


class AdditionalProjectsHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('admin/projects.html')


class AdditionalProjectDetailHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('admin/project_detail.html')


class AdditionalContactsHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('admin/contacts.html')


class AdditionalProfileHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('admin/profile.html')


class Extras404Handler(tornado.web.RequestHandler):
    def get(self):
        self.render('admin/page_404.html')


class Extras500Handler(tornado.web.RequestHandler):
    def get(self):
        self.render('admin/page_500.html')


class ExtrasPlainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('admin/plain_page.html')


class ExtrasLoginHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('admin/login.html')


class ExtrasPricingTablesHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('admin/pricing_tables.html')