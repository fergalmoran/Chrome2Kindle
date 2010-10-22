from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from django.utils import simplejson
import logging, pdb, traceback
from PdfMaker import PdfMaker
from MailInterface import MailInterface
from HtmlParser import HtmlParser
from django.utils import simplejson

class ExtensionPostHandler(webapp.RequestHandler):

    def get(self):
        self.error(403)

    def post(self):
        try:
            logging.info("Creating json: " + self.request.body)
            payload = simplejson.loads(self.request.body)

            url         = payload['pageUrl']
            destination = payload['kindleAccount']
            pageSize    = payload['pageSize']
            logging.info("Preparing pdf. Destination: %s Page Size: %s" % (destination, pageSize))

            parser = HtmlParser(url)
            pageTitle = parser.Title()
            pdf = PdfMaker().createFromHtml(url, pageSize)
            MailInterface().MailFile(pageTitle, destination, pdf)
            jsonResult = {  
                'code' : '200', 
                'responseText' : 'PDF Generated succesfully.<br />Should show up on your Kindle soon.'
            }
            logging.info('JSON Result: ' + simplejson.dumps(jsonResult));
            self.response.out.write(simplejson.dumps(jsonResult));

        except Exception, ex:
            logging.error('Error generating pdf: ' + str(ex.message))
            logging.error(traceback.format_exc())
            self.response.headers['Content-Type'] = 'text/html'
            self.error(500)
            jsonResult = ['{"code" : "500", "responseText" : "' + traceback.format_exc() + '"}']
            self.response.out.write(simplejson.dumps(jsonResult));
