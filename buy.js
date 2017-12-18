var page = require('webpage').create();

page.settings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36';

var date = new Date();
var hr = date.getHours();
var min = date.getMinutes();
var sec = date.getSeconds();
var ms = date.getMilliseconds();

var drop = (3600000 * (10 - hr)) + (60000 * (60 - min)) + (1000 * (60 - sec)) + 1000 - ms;

var hostName = "www.supremenewyork.com";
var pathName = "/shop/all";
var href = hostName + pathName;

var articles = [];

// grab old products
setTimeout(function() {
	page.open(href, function() {
		page.evaluate(function() {
			articles = document.getElementsByTagName('aritcle');
		});
	});
}, drop - 1800000);

phantom.exit();
