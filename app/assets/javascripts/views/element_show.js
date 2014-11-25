App.Views.MemeShow = Backbone.View.extend({
	className: "meme-elem",
	initialize: function(){},
	render: function(){
		var content = this.template({element: this.model});
		this.$el.html(content);
		this.$el.css( this.model.get("styling") );
		return this;
	}
});