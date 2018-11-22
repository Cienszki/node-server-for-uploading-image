var colors = require('colors');
var http = require('http');
var handlers = require('./handlers');

function start() {
	function onRequest(request, response) {
		console.log('Got request'.green);
		console.log('Request' + request.url + 'processed');
		
		response.writeHead(200, {"Content-Type": "text/plain"});
		
		switch (request.url) {
			case '/':			
			
			case '/welcome': 
			handlers.welcome(request, response);
			break;
			
			case '/error':
			handlers.error(request, response);
			break;

			case '/upload':
			handlers.upload(request, response);
			break;

			case '/show':
			handlers.show(request, response);
			break;
		}
	}
	http.createServer(onRequest).listen(9000);
	console.log(colors.green('Server ready'));
}
exports.start = start;