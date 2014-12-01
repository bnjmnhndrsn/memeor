App.Views.ImageDisplay = Backbone.View.extend({
	events: {
		"click .new" : "new"
	},
	template: JST['images/display'],
	className: "image-display container",
	initialize: function(){
		this.listenTo(this.model, "sync change", this.render);
	},
	render: function(){
		var content = this.template({ image: this.model });
		this.$el.html(content);
		return this;
	},
	new: function(){
		Backbone.history.navigate("/memes/new/" + this.model.id, { trigger: true });
	}
});