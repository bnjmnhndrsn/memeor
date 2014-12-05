App.Views.ImageIndexItem = Backbone.CompositeView.extend({
	events: {
		"mouseenter": "changeBGImage",
		"mouseleave": "emptyBGImage"
	},
	template: JST['images/index_item'],
	className: "image-index-item col-md-3 col-sm-4 col-xs-6",
	initialize: function(){
		this.listenTo(this.model, "change", this.render );
	},
	render: function(){
		var content = this.template({ image: this.model });
		this.$el.html(content);
		return this;
	},
	changeBGImage: function(){
		App.Utils.setBGImage(this.model.get("image_src_full"));
	},
	emptyBGImage: function(){
		App.Utils.setBGImage();
	}
});