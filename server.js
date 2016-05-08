var connect = require('connect');
var serveStatic = require('serve-static')

var directory = 'public/';
var port = 8082;
var app = connect();

app.use(serveStatic(directory));
app.use(require('connect-livereload')());
app.listen(port);

console.log('Listening on port ' + port + '.');