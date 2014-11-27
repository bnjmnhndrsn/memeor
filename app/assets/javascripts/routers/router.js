App.Routers.Router = Backbone.Router.extend({
	initialize: function(){
		this.$rootEl = $("#content");
	},
	routes: {
		"" : "index",
		"memes/new" : "new",
		"memes/:id/edit" : "edit",
		"memes/:id" : "show"
	},
	new: function(){
		meme = new App.Models.Meme();
		var view = new App.Views.MemeForm({ model: meme });
		this.$rootEl.html( view.render().$el );
	},
	index: function(){
		App.Collections.memes.fetch();
		var view = new App.Views.MemesIndex({ collection: App.Collections.memes });
		this.$rootEl.html( view.render().$el );
	},
	show: function(id){
		var meme = new App.Models.Meme({ id: id });
		meme.fetch();
		var view = new App.Views.MemeShow({ model: meme });
		this.$rootEl.html( view.render().$el );
	},
	edit: function(id){
		var meme = new App.Models.Meme({ id: id });
		meme.fetch();
		var view = new App.Views.MemeForm({ model: meme });
		this.$rootEl.html( view.render().$el );
	}
});