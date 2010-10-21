from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from django.utils import simplejson
import logging, pdb, traceback
from PdfMaker import PdfMaker
from MailInterface import MailInterface
from HtmlParser import HtmlParser
class ExtensionPostHandler(webapp.RequestHandler):

    def get(self):
        self.error(403)

    def post(self):
        try:
            logging.info("Creating json: " + self.request.body)
            payload = simplejson.loads(self.request.body)

            logging.info("Parsing url")
            url = payload['pageUrl']
            destination = payload['kindleAccount']
            logging.info("Creating html parser")
            parser = HtmlParser(url)
            
            pageTitle = parser.Title()
            pdf = PdfMaker().createFromHtml(url)
            MailInterface().MailFile(pageTitle, destination, pdf)
        except Exception, ex:
            logging.error('Error generating pdf: ' + str(ex.message))
            logging.error(traceback.format_exc())
            self.response.headers['Content-Type'] = 'text/html'
            self.response.out.write('Something went wrong, here\'s some gibberish<br />' + str(ex.message))
