App.Collections.Images = Backbone.Collection.extend({
	model: App.Models.Image,
	url: "/images",
	comparator: function(model){
		return model.get('created_at');
	}
});

App.Collections.images = new App.Collections.Images();