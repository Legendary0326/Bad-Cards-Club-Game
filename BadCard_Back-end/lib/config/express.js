var path 			= require('path'),
	compression 	= require('compression'),				
	cookieParser 	= require('cookie-parser'),				
	bodyParser 		= require('body-parser'),				
	ejs				= require('ejs');

module.exports = function configureExpress(express, app){
	/* Express environment */
	app.set('publicPath', path.join(__dirname + '/../../public/'));
	app.use(express.static(path.join(__dirname + '/../../public/')));
	app.set('views', path.join(__dirname + '/../../public/'));
	app.engine('html', ejs.renderFile);
	app.set('view engine', 'html');

	/* Express middleware */
	app.use(bodyParser.urlencoded({extended: false }));
	app.use(cookieParser());
	app.use(compression());	
};