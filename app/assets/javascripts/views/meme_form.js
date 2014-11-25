App.Views.MemeForm = Backbone.View.extend({
	template: JST["memes/form"],
	initialize: function(){
		this.memeView = App.Views.MemeShow({ model: this.model });
		this.listenTo( this.meme.collection, "beginEditing", select)
	},
	render: function(){
		var content = this.template({ model: this.model });
		this.$el.html( content );
		this.$(".meme-container").append( this.memeView.render().$el );
		return this;
	},
	select(arguments){
		console.log(arguments);
	}
});