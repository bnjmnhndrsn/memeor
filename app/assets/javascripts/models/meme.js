App.Models.Meme = Backbone.Stylable.extend({
	defaultStyling: {
		"color": "white",
		"font-size" : "32px",
		"font-family" : "Impact, Charcoal, sans-serif",
		"text-align" : "center"
	},
	initialize: function(){
		var image_id = this.get("image_id");

		if (image_id) {
			var image = App.Collections.images.getOrFetch(image_id);
			this.setImage(image);
		}
		
		if (this.isNew()){
			this.styling().set( this.defaultStyling, { parse: true } );
		}
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
		this._captions = this._captions || new App.Collections.Captions([], { meme: this });
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
		var json = Backbone.Stylable.prototype.toJSON.call(this);
		json.image_id = this.image().id;
		json.captions_attributes = this.captions().toJSON();
		return { meme: json };
	},
	getAlignment: function(){
		return "";
	},
	width: function(){
		return 500;
	},
	urlRoot: "/memes",
	duplicate: function(){
		var cloned = new App.Models.Meme();
		var json = this.toJSON().meme;
		delete json.id;
		_.each(json.captions_attributes, function(caption){
			delete caption.id;
		});
		cloned.nestedSet(json);
		return cloned;
	},
	nestedSet: function(json){
		this.parse(json);
		this.set(json);
	}
});
	
