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
		this._switchView(view);
	},
	index: function(){
		App.Collections.memes.fetch();
		var view = new App.Views.MemesIndex({ collection: App.Collections.memes });
		this._switchView(view);
	},
	show: function(id){
		var meme = new App.Models.Meme({ id: id });
		meme.fetch();
		var view = new App.Views.MemeShow({ model: meme });
		this._switchView(view);
	},
	edit: function(id){
		var meme = new App.Models.Meme({ id: id });
		meme.fetch();
		var view = new App.Views.MemeForm({ model: meme });
		this._switchView(view);
	},
	_switchView: function(view){
		this._view && this._view.remove();
		this._view = view;
		this.$rootEl.html( this._view.render().$el );
	}
});