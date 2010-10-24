from google.appengine.ext import db

class SiteStats(db.Model):
    source      = db.StringProperty(required = True)
    action      = db.StringProperty(required = True)
    headers     = db.StringProperty(required = True)
    
    timestamp   = db.DateTimeProperty(auto_now_add = True)

