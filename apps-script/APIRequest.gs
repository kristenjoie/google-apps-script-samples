var baseUrl = 'https://postman-echo.com'

function apiRequest(url, headers, options) {
  options.headers = headers
  return UrlFetchApp.fetch(url, options)
}

function apiGETRequest(url) {
  var headers = {
    "access-control-allow-headers": "Content-Type",
    "CLIENT_TOKEN": "API-TOKEN"
  };
  var options = {
    'method': 'get',
    'muteHttpExceptions': true
  }
  return apiRequest(url, headers, options)
}

function apiPOSTRequest(url, payload) {
  var headers = {
    "access-control-allow-headers": "Content-Type",
    "CLIENT_TOKEN": "application/json"
  };
  var options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(payload),
    'muteHttpExceptions': true
  }
  return apiRequest(url, headers, options)
}

/**
 * Postman echo API
 */

function apiGETtime() {
  url = baseUrl + '/time/now'
  var response = apiGETRequest(url);
  return response.getContentText()
}

function apiGETIP() {
  url = baseUrl + '/ip'
  var response = apiGETRequest(url);
  return response.getContentText()
}

function apiAddTime(current_timestamp, years=0, months=0, days=0) {
  url = baseUrl + `/time/add?timestamp=${current_timestamp}&years=${years}&months=${months}&days=${days}`
  var response = apiGETRequest(url);
  return response.getContentText()
}

function apiSubtractTime(current_timestamp, years=0, months=0, days=0) {
  url = baseUrl + `/time/subtract?timestamp=${current_timestamp}&years=${years}&months=${months}&days=${days}`
  var response = apiGETRequest(url);
  return response.getContentText()
}

// just an example to use POST method
function apiExemple() {
  url = baseUrl + '/post'
  payload = { "data": ["totoro", "mononoke", "kiki"] }
  var response = apiPOSTRequest(url, payload);
  console.log(response.getContentText())
}
