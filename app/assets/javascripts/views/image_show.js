App.Views.ImageShow = Backbone.View.extend({
	className: "image",
	template: JST['images/show'],
	initialize: function(){
		this.listenTo(this.model, "change", this.render);
	},
	render: function(){
		App.Utils.setBGImage(this.model.get("image_src_full"));
		var content = this.template({ image: this.model });
		this.$el.html(content);
		return this;
	}
});