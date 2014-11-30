Backbone.Stylable = Backbone.Model.extend({
	toJSON: function(){
		var json = Backbone.Model.prototype.toJSON.call(this);
		json.styling = JSON.stringify( this.styling().toJSON() );
		return json;
	},
	styling: function(){
		this._styling = this._styling || new App.Models.Styling({}, { meme: this });
		return this._styling;
	},
	parse: function(response){	
		if (response.styling) {
			var parsed = JSON.parse(response.styling);
			this.styling().set( parsed, { parse: true } );
			delete response.styling;
		}
		return response;
	},
});