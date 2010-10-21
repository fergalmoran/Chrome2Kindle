from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from django.utils import simplejson
import logging, pdb, traceback

from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from ExtensionPostHandler import ExtensionPostHandler
from SiteHandler import SiteHandler

application = webapp.WSGIApplication(
                        [('/convert', ExtensionPostHandler),
                         ('/', SiteHandler)],
                        debug=True)

def main():
    run_wsgi_app(application)

if __name__ == "__main__":
    main()
