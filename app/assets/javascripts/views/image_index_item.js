App.Views.ImageIndexItem = Backbone.CompositeView.extend({
	events: {
		"mouseenter": "changeBGImage",
		"viewportResize": "resizeHandler"
	},
	template: JST['images/index_item'],
	className: "image-index-item text-center col-md-3 col-sm-4 col-xs-12",
	initialize: function(){
		App.viewport.registerTarget(this.$el);
	},
	render: function(){
		var content = this.template({ image: this.model, xs: App.viewport.is('xs') });
		this.$el.html(content);
		return this;
	},
	changeBGImage: function(){
      //  $(window).off("viewportResize", this.resizeHandler);
		App.Utils.setBGImage(this.model.get("image_src_full"));
	},
	resizeHandler: function(event, oldSize, newSize){
		if (oldSize === "xs" || newSize === "xs"){
			this.render();
		}
	}
});