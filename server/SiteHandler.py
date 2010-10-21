from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext.webapp import template
import os
class SiteHandler(webapp.RequestHandler):
    def get(self):
        template_values = {
            'counter'   :   1
        }
        path = os.path.join(os.path.dirname(__file__), 'site/index.html')
        self.response.out.write(template.render(path, template_values))
