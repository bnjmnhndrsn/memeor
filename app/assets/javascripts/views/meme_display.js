App.Views.MemeDisplay = Backbone.View.extend({
	events: {
		"click .selectable": "selectText"
	},
	template: JST['memes/display'],
	className: "meme-display container",
	initialize: function(){
		this.listenTo(this.model, "sync change", this.render)
		var url = window.location.protocol + "//" + window.location.host + 
			window.location.pathname + "#/images/" + this.model.id;
		var title = "Memeor";
		this.socialShares = new App.Views.SocialShare({url: url, title: title});
	},
	render: function(){
		var editable = (App.current_user.id == this.model.get("user_id"));
		var content = this.template({ meme: this.model, editable: editable });
		this.$el.html(content);
		this.$(".shares").html( this.socialShares.render().$el );
		return this;
	},
	selectText: function(event){
		$(event.currentTarget).find("input").select();
	}
});