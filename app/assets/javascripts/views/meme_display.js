App.Views.MemeDisplay = Backbone.View.extend({
	template: JST['memes/display'],
	className: "meme-display container",
	initialize: function(){
		this.listenTo(this.model, "sync change", this.render)
	},
	render: function(){
		var content = this.template({ meme: this.model });
		this.$el.html(content);
		return this;
	}
});