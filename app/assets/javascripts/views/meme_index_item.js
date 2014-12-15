App.Views.MemeIndexItem = Backbone.CompositeView.extend({
	events: {
		"mouseenter": "changeBGImage",
		"viewportResize": "resizeHandler"
	},
	template: JST['memes/index_item'],
	className: "meme-index-item text-center col-md-2 col-sm-3 col-xs-12",
	initialize: function(){
		App.viewport.registerTarget(this.$el);
	},
	render: function(){
		var content = this.template({ meme: this.model, xs: App.viewport.is('xs') });
		this.$el.html(content);
		return this;
	},
	changeBGImage: function(){
		App.Utils.setBGImage(this.model.image().get("image_src_full"));
	},
    remove: function() {
		App.viewport.removeTarget(this.$el);
        Backbone.View.prototype.remove.apply(this, arguments);
    },
	resizeHandler: function(event, oldSize, newSize){
		if (oldSize === "xs" || newSize === "xs"){
			this.render();
		}
	}
});