App.Views.MemeForm = Backbone.View.extend({
	template: JST["memes/form"],
	initialize: function(){
		
	},
	render: function(){
		var rendered = this.template({ meme: this.model });
		this.$el.html(rendered);
		return this;
	}
});