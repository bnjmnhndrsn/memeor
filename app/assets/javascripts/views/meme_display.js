App.Views.MemeDisplay = Backbone.View.extend({
	events: {
		"click .selectable": "selectText"
	},
	template: JST['memes/display'],
	className: "meme-display container",
	initialize: function(){
		this.listenTo(this.model, "sync change", this.render)
	},
	render: function(){
		var editable = (App.current_user.id == this.model.get("user_id"));
		debugger;
		var content = this.template({ meme: this.model, editable: editable });
		this.$el.html(content);
		return this;
	},
	selectText: function(event){
		$(event.currentTarget).find("input").select();
	}
});