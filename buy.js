var casper = require('casper').create();

var date = new Date();
var hr = date.getHours();
var min = date.getMinutes();
var sec = date.getSeconds();
var ms = date.getMilliseconds();

var drop = (3600000 * (10 - hr)) + (60000 * (60 - min)) + (1000 * (60 - sec)) + 1000 - ms;

var hostName = "https://www.supremenewyork.com";
var pathName = "/shop/all";
var href = hostName + pathName;

//TODO: set timeout to drop
setTimeout(function() {
	casper.start();
	casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36');

	casper.thenOpen(href, function() {
		var articles = this.evaluate(function() {
			return document.getElementsByTagName('article');
		});
		for (var i = 0; i < articles.length; i++) {
			this.echo(articles[i]);
		}
	});	

	casper.then(function() {
		casper.exit();
	});

	casper.run();
}, 1000);
