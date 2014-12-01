App.Routers.Router = Backbone.Router.extend({
	initialize: function(){
		this.$rootEl = $("#content");
		this.$modal = $("#modal");
	},
	routes: {
		"" : "index",
		"memes/new" : "new",
		"memes/new/:id": "new",
		"memes/:id/edit" : "edit",
		"memes/:id/fork" : "fork",
		"memes/:id" : "show"
	},
	new: function(image_id){
		var attrs = (image_id) ? { image_id: image_id} : {};
		var meme = new App.Models.Meme(attrs);
		var view = new App.Views.MemeEditor({ model: meme });
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
		var view = new App.Views.MemeDisplay({ model: meme });
		this._switchView(view);
	},
	edit: function(id){
		var meme = App.Collections.memes.getOrFetch(id);
		var view = new App.Views.MemeEditor({ model: meme });
		this._switchView(view);
	},
	fork: function(id){
		var original = App.Collections.memes.getOrFetch(id);
		var forked = original.fork();
		var view = new App.Views.MemeEditor({ model: forked });
		this._switchView(view);
	},
	_switchView: function(view){	
		this._view && this._view.remove();
		this._view = view;
		this.$rootEl.html( this._view.render().$el );
	}
});