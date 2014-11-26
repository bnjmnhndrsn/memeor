App.Models.Meme = Backbone.Model.extend({
	initialize: function(){
	},
	image: function(){
		this._image = this._image || new App.Models.Image();
		return this._image;
	},
	captions: function(){
		this._captions = this._captions || new App.Collections.Captions();
		return this._captions;
	},
	parse: function(response){
		if (response.image) {
			this.image().set( response.image, { parse: true } );
			delete response.image;
		}
		
		if (response.captions) {
			this.captions().set( response.captions, { parse: true } );
			delete response.captions;
		}
		
		return response;
	},
	urlRoot: "/memes"
});
	
