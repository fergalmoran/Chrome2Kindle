$(document).ready(function () {
    $("#kindle_account").keyup(function () {
        var email = $("#kindle_account").val();
        if (email != 0) {
            if (isValidEmailAddress(email)) {
                $("#validEmail").css({
                    "background-image": "url('validyes.png')"
                });
            } else {
                $("#validEmail").css({
                    "background-image": "url('validno.png')"
                });
            }
        } else {
            $("#validEmail").css({
                "background-image": "none"
            });
        }
    });

    //update bookmark select list
    //chrome.bookmarks.get(id, 
});

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
}

function updateSelect(select, value){
    for (var i=0; i < select.children.length; i++){
        var child = select.children[i];
        if (child.value == value){
            child.selected = "true";
            break;
        }
    }
}   
function checkToBool(str){
    return str == "true";
}
// Saves options to localStorage.
function save_options() {
    var kindleAccount = document.getElementById("kindle_account").value;
    var serverType = document.getElementById("server_type").value;
    var outputSize = document.getElementById("output_size").value;
    var createBookmark = document.getElementById("create_bookmark").checked;

    localStorage["kindle_account"] = kindleAccount;
    localStorage["server_type"] = serverType;
    localStorage["output_size"] = outputSize;
    localStorage["create_bookmark"] = createBookmark;

    // Update status to let user know options were saved.
    var status = document.getElementById("status");
    status.innerHTML = "Options Saved.";
    setTimeout(function() {
        status.innerHTML = "";
    }, 1200);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
    var kindleAccount   = localStorage["kindle_account"];
    var serverType      = localStorage["server_type"];
    var outputSize      = localStorage["output_size"];
    var createBookmark  = localStorage["create_bookmark"];

    if (null != kindleAccount){
        ctlKindle = document.getElementById("kindle_account");
        ctlKindle.value = kindleAccount;
    }
    if (null != serverType){
        select = document.getElementById("server_type");
        updateSelect(select, serverType);
    }
    if (null != outputSize){
        ctlOutputSize = document.getElementById("output_size");
        updateSelect(ctlOutputSize, outputSize);
    }   
    if (null != createBookmark){
        ctlCreateBookmark = document.getElementById("create_bookmark");
        ctlCreateBookmark.checked = checkToBool(createBookmark);
    }else{
        ctlCreateBookmark.checked = false;
    }
}
