App.Routers.Router = Backbone.Router.extend({
	initialize: function(){
		this.$rootEl = $("#content");
	},
	routes: {
		"" : "index",
		"memes/:id" : "show"
	},
	index: function(){
		alert('this doesnt exist yet');
	},
	show: function(id){
		var meme = new App.Models.Meme({ id: id });
		meme.fetch();
		//var view = new App.Views.MemeShow({ model: this.meme });
		window.meme = meme;
	}
});