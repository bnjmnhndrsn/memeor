App.Collections.Images = Backbone.PageableCollection.extend({
	model: App.Models.Image,
	
	url: "/images",
	comparator: function(model){
		return model.get('created_at');
	},
	mode: "infinite"
});

App.Collections.images = new App.Collections.Images();