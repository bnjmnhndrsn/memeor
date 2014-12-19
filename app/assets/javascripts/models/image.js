App.Models.Image = Backbone.Model.extend({
	urlRoot: "/images",
	memes: function(){
		this._memes = this._memes || new App.Collections.Memes();
		return this._memes;
	},
	parse: function(response){
		if (response.created_at){
			response.created_at = new Date(response.created_at);
		}
		if (response.updated_at){
			response.updated_at = new Date(response.updated_at);
		}
		if (response.memes){
			this.memes().set( response.memes, { parse: true } );
			delete response.memes;
		}
		return response;
	}
});