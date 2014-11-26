App.Collections.Captions = Backbone.Collection.extend({
	serialize: function(){
		this.invoke("serialize");
		return this;
	},
	model: App.Models.Caption
});