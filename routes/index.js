module.exports = function() {
    var routes = {};
    routes.index = function(req, res){
        res.render('index', {
            title: 'nas'
        });
    };
    return routes;
};