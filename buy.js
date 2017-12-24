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

var preDropDump;
var preDropPaths = [];
var postDropDump;
var postDropPaths = [];

setTimeout(function() {
	casper.start();
	casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36');

	casper.thenOpen(href, function() {
		preDropDump = this.getElementsInfo('.inner-article > a');		

		for (var i = 0; i < preDropDump.length; i++) {
			preDropPaths.push(preDropDump[i].attributes.href);
		}
	});
	
	casper.wait(895000, function() {
		checkForDrop();
	});

	casper.then(function() {
		var productIndex;

		for (var i = 0; i < preDropPaths.length; i++) {
			productIndex = postDropPaths.indexOf(preDropPaths[i]);

			postDropPaths.splice(productIndex, 1);
		}
	});

	casper.then(function() {
		console.log(postDropPaths);
	});

	casper.then(function() {
		casper.exit();
	});

	casper.run();
}, drop - 900000);

var checkForDrop = function() {
	casper.wait(5000, function() {
		casper.reload();

		casper.then(function() {
		  postDropDump = this.getElementsInfo('.inner-article > a');

		  if (postDropDump.length <= preDropDump.length) {
		  	console.log("waiting for drop...");
		  	checkForDrop();
		  }
		  else {
		  	for (var i = 0; i < postDropDump.length; i++) {
		  		postDropPaths.push(postDropDump[i].attributes.href);
		  	}
		  }
		});
	});
}
