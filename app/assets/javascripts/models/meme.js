App.Models.Meme = Backbone.Model.extend({
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
			this.image().set( response.image );
			delete response.image;
		}
		
		if (response.captions) {
			this.captions().set( response.captions );
			delete response.captions;
		}
		
		return response;
	},
	urlRoot: "/memes"
});
	
