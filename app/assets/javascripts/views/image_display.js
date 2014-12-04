App.Views.ImageDisplay = Backbone.View.extend({
	events: {
		"click .selectable": "selectText"
	},
	template: JST['images/display'],
	className: "image-display container",
	initialize: function(){
		this.listenTo(this.model, "sync change", this.render);
		this.memesIndex = new App.Views.MemesIndex({ collection: this.collection });
	},
	render: function(){
		var content = this.template({ image: this.model });
		this.$el.html(content);
		this.$el.append( this.memesIndex.render().$el );
		return this;
	},
	selectText: function(event){
		$(event.currentTarget).find("input").select();
	}
});