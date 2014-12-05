App.Views.MemeIndexItem = Backbone.CompositeView.extend({
	events: {
		"mouseenter": "changeBGImage",
		"mouseleave": "emptyBGImage"
	},
	template: JST['memes/index_item'],
	className: "meme-index-item col-md-2 col-sm-3 col-xs-4",
	initialize: function(){
		this.listenTo(this.model, "change", this.render );
	},
	render: function(){
		var content = this.template({ meme: this.model });
		this.$el.html(content);
		return this;
	},
	changeBGImage: function(){
		App.Utils.setBGImage(this.model.image().get("image_src_full"));
	},
	emptyBGImage: function(){
		App.Utils.setBGImage();
	}
});