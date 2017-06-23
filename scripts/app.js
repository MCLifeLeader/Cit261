// Update this for new agencies
var agencyID = 1;

var data_storage, login_storage, user, rh_data;
var bound = false;

var apiHost = 'https://kb7ppbwebapi.azurewebsites.net/api/Mobile';
var tokenHost = "https://kb7ppbwebapi.azurewebsites.net/Token";

var DEBUG = true;

if (DEBUG) {
	//  apiHost = 'http://localhost/RedheadMobileApi/api/Mobile';
    //  tokenHost = tokenHost = 'http://localhost/RedheadMobileApi/Token';
}


// Remove existing event handlers before adding new ones (to avoid having multiples).
function enableEventHandlers() {

        user = {};

        user.email = 'email@example.com';
		user.id = user.email
        user.password = 'password';
        user.agencyID = agencyID;

   		secureLogin(user);
    }

// Secure Login function to obtain access_token, token_type, tokenIssuedDateTime, tokenExpiresDateTime 
// from azure api site stored in tokenHost
function secureLogin(loginUser) {
	if (DEBUG) {
		console.log("user object: " + JSON.stringify(loginUser));
	};

	var ajaxSettings = {
		"async": true,
		"crossDomain": true,
		"url": tokenHost,
		"type": "POST",
		"headers": {
			"content-type": "application/x-www-form-urlencoded"
		},
		"data": {
			"grant_type": "password",
			"username": loginUser.email,
			"password": loginUser.password
		},
		"timeout": "30000" // 30 seconds
	}

	$.ajax(ajaxSettings)
		// .error(secureLoginError)
		.done(secureLoginSuccess);
		

	if (DEBUG) {
		console.log("LoginUser email: " + loginUser.email);
	};

}

function secureLoginSuccess(responseData) {
	if (DEBUG) {
		console.log("secureLoginSuccess function");
		console.log(responseData);
		console.log("user objet" + user)
	}

	if (responseData.userName === user.id) {
		user.access_token = responseData.access_token;
		user.token_type = responseData.token_type;

        retrieveData();
	}
	else {
		console.log("user id does not match")
	}
}

function secureLoginError(response_data, status, jqXHR) {

	console.log('Login failed ' + status);

	if (status === 'timeout') {
        console.log('timeout');
	} else {
		console.log(response_data.responseJSON.error_description);
	}
}

// dbOnly flag is much faster than normal call, but it only gets the information from the database
// not from QQ
function retrieveData() {

    console.log('retrieveData');

    // Docs: http://api.jquery.com/jQuery.ajax/


var ajaxSettings = {
  "async": true,
  "crossDomain": true,
  "url": apiHost + '/GetPolicyDataLegacy?id=' + user.id,
  "method": "GET",
  "headers": {
    "accept": "application/json",
    "content-type": "application/json",
    "authorization": "Bearer " + user.access_token,
  }
}

console.log(JSON.stringify(ajaxSettings));


    $.ajax(ajaxSettings)
    // .error(retrieveDataError)
    .done(retrieveDataSuccess)
    // .timeout(30000);
}

function retrieveDataSuccess(responseData, status, jqXHR) {

    console.log(JSON.stringify(status));
    console.log(JSON.stringify(responseData));

    rh_data = responseData;

    console.log(JSON.stringify(rh_data));
}

function retrieveDataError(jqXHR, status, error) {

    console.log('Login failed ' + status);

    if (status === 'timeout') {
        console.log('timeout');
    }

    console.log('login error');
}
