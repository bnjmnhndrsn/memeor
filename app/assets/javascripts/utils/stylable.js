Backbone.Stylable = Backbone.Model.extend({
	defaultStyling: {
		
	},
	css: function(property, value, options){
		if ($.isPlainObject(property)) {
			this.styling().set(property, options);
		} else if (arguments.length == 0) {
			return this.styling().attributes;
		} else if (arguments.length == 1) {
			var val = this.styling().get(property);
			return (val) ? val : this.defaultStyling[property];
		} else {
			this.styling().set(property, value, options)
		}
		
	},
	toJSON: function(){
		var json = Backbone.Model.prototype.toJSON.call(this);
		json.styling = JSON.stringify( this.styling().toJSON() );
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
	getAlignment: function(){
		//implement in child class
	},
	align: function(alignment){
		if (this.css("text-align") == alignment) {
			alignment = "";
		}
		this.css("text-align", alignment);
		
		this.css("left", this.getAlignment());
	},
	width: function(width){
		if (arguments.length == 0) {
			return this._width;
		} else {
			this._width = width;
		}
 			
	} 
});