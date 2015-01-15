App.Views.MemeImageItem = Backbone.View.extend({
	template: JST['memes/image_item'],
	className: "meme-image-item",
	attributes: function(){
		return { 'data-id': this.model.id } ;
	},
	render: function(){
		var content = this.template({ image: this.model });
		this.$el.html(content);
		return this;
	}
});