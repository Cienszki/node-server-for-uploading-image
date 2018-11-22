var fs = require('fs');
var formidable = require('formidable');

function upload(request, response) {
	console.log('Starting upload');
	var form = new formidable.IncomingForm();
	form.parse(request, function(error, fields, files) {	
		global.fileName = files.upload.name	
		fs.renameSync(files.upload.path, fileName);		
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write('received image: <br/ >');
		response.write('<img src="/show" >');
		response.end();
	});
}
function welcome(request, response) {
	console.log('Starting welcome');
	fs.readFile('./pages/start.html', 'utf-8', function(err, data) {
		response.writeHead(200, {"Content-Type": "text/html; charset=utf8"});
		response.write(data);
		response.end();
	});	
}
function error(request, response) {
	console.log('Something went wrong :(');
	response.write('Something went wrong.S 404 :(');
	response.end();
}

function show(request, response) {
	console.log('Showing image');
	fs.readFile(fileName, "binary", function(err, file) {
		response.writeHead(200, {"Content-Type": "img/png"});
		response.write(file, "binary");
		response.end();
	});
}

exports.upload = upload;
exports.welcome = welcome;
exports.error = error;
exports.show = show;