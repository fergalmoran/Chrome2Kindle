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
                $.post(this.serviceUrl, json, function (xml, status, xhr) {
                    podnoms.chrome.chrome2kindle.update(xml);
                });
            },
            update: function (itemData) {
                $('#main>h1').text('Hello Sailor...');
                $('#content').html(itemData);
            }
        }
    }
};
