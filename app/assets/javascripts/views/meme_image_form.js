App.Views.MemeImageForm = Backbone.CompositeView.extend({
	events: {
		"click .meme-image-item": "changeImage",
		"submit .create": "createImage"
	},
	className: "meme-image-form",
	template: JST["memes/image_form"],
	initialize: function(){
		
		this.collection.each(function(meme){
			this.addMemeView(meme);
		}.bind(this));
		
		this.listenTo(this.collection, "add", this.addMemeView);
	},
	render: function(){
		var rendered = this.template();
		this.$el.html(rendered);
		this.attachSubviews();
		return this;
	},
	addMemeView: function(meme){
		var view = new App.Views.MemeImageItem({ model: meme });
		this.addSubview(".image-items", view);
	},
	changeImage: function(event){
		var id = $(event.currentTarget).data("id"),
			newImage = App.Collections.images.get(id);
			
		this.model.setImage(newImage);
	},
	createImage: function(event){
		event.preventDefault();
		
		var data = $(event.currentTarget).serializeJSON(),
			image = new App.Models.Image(data.image),
			that = this;
		
		image.save({}, {
			success: function(){
				that.collection.add(image);
				that.model.setImage(image);
			} 
		});
		
	}
});