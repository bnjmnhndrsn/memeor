App.Routers.Router = Backbone.Router.extend({
	initialize: function(){
		this.$rootEl = $("#content");
		this.$modal = $("#modal");
	},
	routes: {
		"" : "index",
		"memes/new" : "new",
		"memes/:id/edit" : "edit",
		"memes/:id" : "show",
		"modal": "modal" 
	},
	new: function(){
		var meme = new App.Models.Meme();
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
	modal: function(){
		var meme = new App.Models.Meme();
		var view = new App.Views.MemeForm({ model: meme });
		this._toggleModalView(view);
	},
	_switchView: function(view){
		this._view && this._view.remove();
		this._view = view;
		this.$rootEl.html( this._view.render().$el );
	},
	_toggleModalView: function(view){
		this._modalView && this._modalView.remove();
		
		if (view) {
			if (!this._blockPage) {
				this._blockPage = new App.Views.BlockPage();
				this.$modal.append( this._blockPage.render().$el );
			}
			
			this._modalView = view;
			this._blockPage.$('.popup-container').append( this._modalView.render().$el.addClass("modal-popup") );
			
		} else {
			this._blockPage && this._blockPage.remove();
			this._blockPage = null;
			this._modalView = null;
			
		}
	}
});