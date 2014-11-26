App.Models.Caption = Backbone.Model.extend({
	serialize: function(){
		this.set("styling", this.styling().attributes);
		console.log('getting called');
	},
	styling: function(){
		this._styling = this._styling || new App.Models.Styling({}, { meme: this });
		return this._styling;
	},
	parse: function(response){	
		if (response.styling) {
			this.styling().set( App.Utils.parseAttr(response.styling), { parse: true } );
			delete response.styling;
		}
		return response;
	},
	urlRoot: "/captions"
});