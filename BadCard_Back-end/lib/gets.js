module.exports = function setRoutes(app,fs){   
    app.route('/')
	   .get(function(req, res){
			res.sendFile(app.get('publicPath') + 'root.html');
       });
};