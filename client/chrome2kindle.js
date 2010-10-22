
function generateEBook(url){
    podnoms.chrome.chrome2kindle.init(url);
}


var podnoms = {
    chrome: {
        chrome2kindle: {
            state: {},
            serviceUrl: 'http://chrome2kindle.appspot.com/convert',
            currentUrl: '', 
            kindleAccount: localStorage["kindle_account"],
            outputSize: localStorage["output_size"],
            init: function (url) {
                if (this.kindleAccount == null){
                    $('#main>h1').text('Error');
                    $('#content').html(
                        '<span>No Kindle account found.<br />Please right click extension in toolbar, choose options and enter the email address of your Kindle account.' );

                }else{
                    this.currentUrl = url;
                    if (typeof chrome != 'undefined') {
                        this.refresh();
                    }
                }
            },
            refresh: function () {
                if (localStorage["server_type"] == "test"){
                    this.serviceUrl = 'http://fermi.wasptech.com:8080/convert';
                }
                var json = '{';
                json += '"pageUrl"    :   "' + this.currentUrl + '", ';
                json += '"kindleAccount"    :   "' + this.kindleAccount + '", ';
                json += '"pageSize"    :   "' + this.outputSize + '"';
                json += '}'; 
                $.ajax({
                    url: this.serviceUrl, 
                    data: json, 
                    type: 'POST',
                    success: function (xml, status, xhr) {
                        podnoms.chrome.chrome2kindle.update(xhr);
                    },
                    error: function (xml, status, xhr){
                        podnoms.chrome.chrome2kindle.error(xml, status);
                    }
                });
            },
            update: function (response) {
                var resp = JSON.parse(response.responseText);
                if (response.readyState == 4 && response.status == 200){
                    $('#main>h1').text('Success');
                    $('#content').html( '<span>' + resp['responseText'] + '</span>' );
                }else{
                    alert("Boo urns");
                }
            },
            error: function (xml, itemData) {
                $('#main>h1').text('Error creating ebook...');
                $('#content').html(
                    '<span>Status: ' + xml.status + '</span><br />' + 
                    '<span>' + xml.statusText + '</span>' );
            }
        }
    }
};
