/*
	Author: Michael Carey
	BYU-Idaho: CIT-261
*/

// http://www.w3schools.com/js/js_cookies.asp
function setCookie(cname, cvalue, exdays) 
{
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// http://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) 
{
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');

    for(var i = 0; i <ca.length; i++) 
    {
        var c = ca[i];
        while (c.charAt(0) == ' ') 
        {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) 
        {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function redirectUrl(curl) 
{
	window.location = curl;
}

// http://stackoverflow.com/questions/14446447/javascript-read-local-text-file
function readTextFile(file)
{
    // See XMLHTTPRequest.html for AJAX + JSON request
	var allText = "";
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText;
                // By placing my return statment here it breaks my footer and does not display on each page.
                // return allText;
            }
        }
    }

    // Moving this line up directly below the "open" call does not seem to help.
    rawFile.send(null);
	
    // I am not certain why I have to have my return here but this is where it works.
	return allText;
}

//http://stackoverflow.com/questions/3387427/remove-element-by-id
Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
//http://stackoverflow.com/questions/3387427/remove-element-by-id
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}
