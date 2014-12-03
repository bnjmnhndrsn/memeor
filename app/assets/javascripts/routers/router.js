App.Routers.Router = Backbone.Router.extend({
	initialize: function(){
		this.$rootEl = $("#content");
		this.$modal = $("#modal");
	},
	routes: {
		"": "landing",
		"memes" : "index",
		"memes/new": "new",
		"memes/new/:id": "new",
		"memes/:id/edit": "edit",
		"memes/:id/fork": "fork",
		"memes/:id": "show",
		"images": "imageIndex",
		"images/:id": "imageShow"
	},
	landing: function(){
		App.Collections.memes.fetch();
		App.Collections.images.fetch();
		var view = new App.Views.Landing();
		this._switchView(view);
	},
	new: function(image_id){
		var attrs = (image_id) ? { image_id: image_id} : {};
		var meme = new App.Models.Meme(attrs);
		var view = new App.Views.MemeEditor({ model: meme });
		this._switchView(view);
	},
	index: function(){
		App.Collections.memes.fetch();
		var view = new App.Views.MemesGallery({ collection: App.Collections.memes });
		this._switchView(view);
	},
	show: function(id){
		var meme = App.Collections.memes.getOrFetch(id);
		var view = new App.Views.MemeDisplay({ model: meme });
		this._switchView(view);
	},
	edit: function(id){
		var meme = new App.Models.Meme({ id: id });
		this._blockUntilFetched(meme, function(meme){
			var view = new App.Views.MemeEditor({ model: meme });
			this._switchView(view);
		});	
		
	},
	fork: function(id){
		var original = new App.Models.Meme({ id: id });
		
		this._blockUntilFetched(original, function(meme){
			App.Collections.memes.add(meme);
			var forked = meme.fork();
			var view = new App.Views.MemeEditor({ model: forked });
			this._switchView(view);
		})
		
	},
	imageIndex: function(){
		App.Collections.images.fetch();
		var view = new App.Views.ImagesGallery({ collection: App.Collections.images });
		this._switchView(view);
	},
	imageShow: function(id){
		var image = App.Collections.images.getOrFetch(id),
			memes = image.memes();
		var view = new App.Views.ImageDisplay({ model: image, collection: memes });
		
		this._switchView(view);
	},
	
	//displays block page until model is fetched, then runs callback
	_blockUntilFetched: function(model, callback){
		var blockview = new App.Views.BlockPage();
		var that = this;
		$("body").append( blockview.render().$el );
		
		model.fetch({
			success: function(){
				blockview.remove();
				callback.call(that, model);
			}
		});
	},
	_switchView: function(view){	
		this._view && this._view.remove();
		this._view = view;
		this.$rootEl.html( this._view.render().$el );
	}
});