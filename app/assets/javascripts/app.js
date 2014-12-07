var App = {
	Collections: {},
	Models: {},
	Routers: {},
	Utils: {},
	Views: {},
	initialize: function(){
		new App.Routers.Router();
		Backbone.history.start();
		App.viewport = ResponsiveBootstrapToolkit;
	}
};

$(App.initialize);