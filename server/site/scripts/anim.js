
function ThisURL() {
	var URL = unescape(location.href);	// get current URL in plain ASCII
	var xstart = URL.lastIndexOf("/") + 1;
	var xend = URL.length;
	var hereName = URL.substring(xstart,xend);
	var herePath = URL.substring(0,xstart);
	return herePath;
	/*
	document.write("The name of the current file is: " + hereName)
	document.write("The path of the current file is: " + herePath)
	*/
}

