App.Collections.Images = Backbone.Collection.extend({
	model: App.Models.Image,
	url: "/images",
	getOrFetch: function(id){
		var image, images = this;
		
		if (image = this.get(id)){
			image.fetch();
		} else {
			image = new this.model({id: id});
			image.fetch({
				success: function(){
					images.add(image);
				}
			});
		}
		
		return image;
	}
});

App.Collections.images = new App.Collections.Images();