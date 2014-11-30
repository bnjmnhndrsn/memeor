App.Models.Meme = Backbone.Stylable.extend({
	initialize: function(){
	},
	setImage: function(newImage){
		this._image = newImage;
		this.trigger("change:image");
	},
	image: function(){
		if (!this._image){
			this._image = new App.Models.Image();
			!this._image.isNew() && App.Collections.images.add(this._image);
		}
		return this._image;
	},
	captions: function(){
		this._captions = this._captions || new App.Collections.Captions();
		return this._captions;
	},
	parse: function(response){
		response = Backbone.Stylable.prototype.parse.call(this, response);
		
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
	toJSON: function(){
		var json = Backbone.Model.Stylable.toJSON.call(this);
		json.image_id = this.image().id;
		json.captions_attributes = this.captions().toJSON();
		
		return { meme: json };
	},
	
	urlRoot: "/memes"
});
	
