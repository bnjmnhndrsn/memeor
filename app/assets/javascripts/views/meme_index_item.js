App.Views.MemeIndexItem = Backbone.CompositeView.extend({
	events: {
		"mouseenter": "changeBGImage"
	},
	template: JST['memes/index_item'],
	mobileTemplate: JST['memes/index_item_xs'],
	className: "meme-index-item text-center col-md-2 col-sm-3 col-xs-12",
	initialize: function(){
		this.listenTo(this.model, "change", this.render );
	},
	render: function(){
		var template = App.viewport.is('xs') ? this.mobileTemplate : this.template,
			content = template({ meme: this.model });

		this.$el.html(content);
		return this;
	},
	changeBGImage: function(){
		App.Utils.setBGImage(this.model.image().get("image_src_full"));
	}
});