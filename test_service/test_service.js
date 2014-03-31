var express = require('express');
var fs = require('fs');

var app = express();

var counter = 0;

app.get('/nhlsport', function (req, res) {
	filepath = 'test.json';

	fs.readFile(filepath, 'utf8', function (err, data) {
		if(err) {
			doInError(err, res);
			return;
		}
			res.type('application/json');
			res.send(data);		
	});

	console.log('Client queried for: ' + JSON.stringify(req.query));
	console.log('Answered to request #' + (++counter));
});

app.get('/test', function (req, res) {
	res.type("text/javascript;charset=utf-8");
	callback = req.query.callback
	if (callback) {
		res.send(callback + '(' + '{"message": "some message"}' + ')');
	} else {
		res.send('{}')
	}
	

	console.log('Client queried for: ' + JSON.stringify(req.query));
	console.log('Answered to request #' + (++counter));
});

doInError = function (err, res) {
	if(err) {		
		console.log(err);
	}
	
	res.type('text/plain');
	res.send('ERROR 404: file not found');
	return;
};

port = process.env.PORT || 80;

console.log("Listening on port " + port);

app.listen(port);
