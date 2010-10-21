class MailInterface():
    def MailFile(self, subject, destination, data):
        from google.appengine.api import mail
        mail.send_mail( 
            sender      = "fergal.moran@gmail.com",
            to          = destination,
            subject     = "New book from chrome2kindle (" + subject + ")",
            body        = "Here's the latest book you requested from chrome2kindle. Hope it's everything you hoped it would be",
            attachments = [(subject + '.pdf', data)]
        )
    
