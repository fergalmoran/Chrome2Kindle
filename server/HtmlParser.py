#!/usr/bin/python
from BeautifulSoup import BeautifulSoup
from urlparse import urlsplit
import urllib2

import logging
class HtmlParser:
    def __init__(self, url):
        self._serverUrl = url
        self._pageContent = urllib2.urlopen(url).read()
        self._soup = BeautifulSoup(''.join(self._pageContent))
   
    def Title(self):
        return self._soup.html.head.title.string

    def ScrapeImages(self):
        try:
            imgTags = self._soup.findAll('img')
            logging.info ('Opened the page...')
            for imgTag in imgTags:
                imgUrl = imgTag['src']
                logging.info(imgUrl)
            
            logging.info('Finished parsing...')

        except ImportError:
            logging.error('Beautiful Soup is not installed')
        else:
            logging.info('Web page retrieved....')
