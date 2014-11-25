App.Views.MemeShow = Backbone.View.extend({
	className: "image",
	template: JST['images/show'],
	initialize: function(){},
	render: function(){
		var content = this.template({image: this.model});
		this.$el.html(content);
		this.$el.css( this.model.get("styling") );
		return this;
	}
});