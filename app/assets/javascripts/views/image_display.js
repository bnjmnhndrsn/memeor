App.Views.ImageDisplay = Backbone.View.extend({
	events: {
		"click .selectable": "selectText"
	},
	template: JST['images/display'],
	className: "image-display container",
	initialize: function(){
		this.listenTo(this.model, "sync change", this.render);
		var url = window.location.protocol + "//" + window.location.host + 
			window.location.pathname + "#/images/" + this.model.id;
		var title = "Memeor";
		this.socialShares = new App.Views.SocialShare({url: url, title: title});
		this.memesIndex = new App.Views.MemesIndex({ collection: this.collection });
	},
	render: function(){
		var content = this.template({ image: this.model });
		this.$el.html(content);
		this.$el.append( this.memesIndex.render().$el );
		this.$(".shares").html( this.socialShares.render().$el );
		return this;
	},
	selectText: function(event){
		$(event.currentTarget).find("input").select();
	}
});