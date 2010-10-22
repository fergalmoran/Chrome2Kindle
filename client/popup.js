$(document).ready(function () {
});

function generateEBook(url){
    podnoms.chrome.chrome2kindle.init(url);
}

var podnoms = {
    chrome: {
        chrome2kindle: {
            state: {},
            serviceUrl: 'http://chrome2kindle.appspot.coM',
            currentUrl: '', 
            kindleAccount: localStorage["kindle_account"],
            init: function (url) {
                this.currentUrl = url;
                if (typeof chrome != 'undefined') {
                    this.refresh();
                }
            },
            refresh: function () {
                var json = '{';
                json += '"pageUrl"    :   "' + this.currentUrl + '", ',
                json += '"kindleAccount"    :   "' + this.kindleAccount + '"';
                json += '}'; 
                $.ajax(
                    url: this.serviceUrl, 
                    data: json, 
                    success: function (xml, status, xhr) {
                        podnoms.chrome.chrome2kindle.update(xml);
                    },
                    error: function (xml, status, xhr){
                        podnoms.chrome.chrome2kindle.error(status);
                    }
                );
            },
            update: function (itemData) {
                $('#main>h1').text('Hello Sailor...');
                $('#content').html(itemData);
            }
            error: function (itemData) {
                $('#main>h1').text('Error creating ebook...');
                $('#content').html(itemData);
            }
        }
    }
};
