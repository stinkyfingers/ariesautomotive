'use strict';

var express = require('express');
var zombie = require('zombie');
zombie.waitDuration = '30s';
var app = express();

app.use('/assets', express.static(__dirname + '/dist/assets'));
app.use('/fonts', express.static(__dirname + '/dist/fonts'));
app.use('/scripts', express.static(__dirname + '/dist/scripts'));
app.use('/styles', express.static(__dirname + '/dist/styles'));
app.get('*', function (req, res) {

	var frag;
	if (req.query) {
		frag = req.query.escaped_fragment;
	}

	if (frag) {
        var url = 'http://www.ariesautomotive.com' + frag;
        zombie.visit(url, {
            runScripts: true,
            loadCSS: false,
            silent: true,
            headers: {
                bot: true
            }
        }, function(err, browser) {
            if (err) {
                console.error(err);
                res.status(500).send(err);
            } else {
                var html = browser.html();
                res.status(200).send(html);
            }
        });
	} else {
		res.sendFile('index.html', {root: './dist'});
	}
});

var server = app.listen(process.env.PORT || 8080, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('App listening at http://%s:%s', host, port);
});
