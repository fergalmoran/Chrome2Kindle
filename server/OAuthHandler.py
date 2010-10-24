from oauth import oauth
from google.appengine.ext import webapp
import logging

class OAuthHandler(webapp.RequestHandler):
    def request(self):
        logging.debug("request")

    def authorise(self):
        logging.debug("request")

    def access(self):
        logging.debug("request")
