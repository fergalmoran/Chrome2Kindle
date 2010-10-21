import cStringIO
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
import ho.pisa as pisa
import urllib

class PdfMaker():
    def createInMemoryPdf(self, pdfData):
        pdfBuffer = cStringIO.StringIO()
        
        c = canvas.Canvas(pdfBuffer, pagesize=A4)

        c.drawString(100, 100, pdfData)
        c.showPage()
        c.save()

        return pdfBuffer.getvalue()
    
    def createFromHtml(self, url, color=0, style=None, landscape=0, number=0):
        pdfBuffer = cStringIO.StringIO()
        pdf = pisa.CreatePDF(
            urllib.urlopen(url),
            pdfBuffer,
            log_warn = 1,
            log_err = 1,
            path = url,
            link_callback = pisa.pisaLinkLoader(url).getFileName
        )
            
        return pdfBuffer.getvalue()
