App.Views.MemeDisplay = Backbone.View.extend({
	events: {
		"click .edit" : "edit",
		"click .fork" : "fork",
		"click .new" : "new"
	},
	template: JST['memes/display'],
	className: "meme-display container",
	initialize: function(){
		this.listenTo(this.model, "sync change", this.render)
	},
	render: function(){
		var content = this.template({ meme: this.model });
		this.$el.html(content);
		return this;
	},
	edit: function(){
		Backbone.history.navigate("/memes/" + this.model.id + "/edit", { trigger: true });
	},
	new: function(){
		Backbone.history.navigate("/memes/new/" + this.model.image().id, { trigger: true });
	},
	fork: function(){
		Backbone.history.navigate("/memes/" + this.model.id + "/fork", { trigger: true });
	}
});