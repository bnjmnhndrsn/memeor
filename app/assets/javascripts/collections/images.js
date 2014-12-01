App.Collections.Images = Backbone.Collection.extend({
	model: App.Models.Image,
	url: "/images"
});

App.Collections.images = new App.Collections.Images();