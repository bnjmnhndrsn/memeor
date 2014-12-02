App.Views.MemeImageItem = Backbone.View.extend({
	template: JST['memes/image_item'],
	className: "meme-image-item",
	render: function(){
		var content = this.template({ image: this.model });
		this.$el.html(content);
		this.$el.data("id", this.model.id);
		return this;
	}
});