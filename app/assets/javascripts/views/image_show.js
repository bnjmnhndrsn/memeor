App.Views.ImageShow = Backbone.View.extend({
	className: "image",
	template: JST['images/show'],
	initialize: function(){},
	render: function(){
		var content = this.template({image: this.model});
		this.$el.html(content);
		return this;
	}
});