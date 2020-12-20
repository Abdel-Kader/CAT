//imports
var express     = require('express')
var bodyParser  = require('body-parser');
var apiRouter   = require('./apiRouter').router;
var cors        = require('cors')

//instantiate server
var server = express();

server.use(cors())
//Body Parser configuration
server.use(bodyParser.urlencoded({ extended: true, limit:'50mb' }));
server.use(bodyParser.json({limit: '50mb'}));

//configuration
server.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bnjour sur mon server</h1>');
});

server.use('/api/', apiRouter);
server.listen(8080, function() {
    console.log('Server is starting... :)')
})