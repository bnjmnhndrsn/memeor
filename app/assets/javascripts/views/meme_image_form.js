App.Views.MemeImageForm = Backbone.View.extend({
	className: "meme-image-form",
	template: JST["memes/image_form"],
	render: function(){
		var rendered = this.template();
		this.$el.html(rendered);
		return this;
	}
});