Backbone.Stylable = Backbone.Model.extend({
	defaultStyling: {
		
	},
	css: function(property, value){
		if (arguments.length == 1) {
			var val = this.styling().get(property);
			return (val) ? val : this.defaultStyling[property];
		} else if (arguments.length == 2) {
			this.styling().set(property, value)
		}
		
	},
	toJSON: function(){
		var json = Backbone.Model.prototype.toJSON.call(this);
		json.styling = JSON.stringify( this.styling().toJSON() );
		debugger;
		return json;
	},
	styling: function(){
		this._styling = this._styling || new App.Models.Styling({}, { parentModel: this });
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