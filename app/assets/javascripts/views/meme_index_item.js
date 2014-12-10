App.Views.MemeIndexItem = Backbone.CompositeView.extend({
	events: {
		"mouseenter": "changeBGImage"
	},
	template: JST['memes/index_item'],
	className: "meme-index-item text-center col-md-2 col-sm-3 col-xs-12",
	initialize: function(){
		this.resizeHandler = function(event, sizes){
			var isChanged = sizes.oldSize !== sizes.newSize && 
				(sizes.oldSize === "xs" || sizes.newSize === "xs");
			isChanged && this.render();
		}.bind(this);
		
		$(window).on("viewportResize", this.resizeHandler);
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
        $(window).off("viewportResize", this.resizeHandler);
        Backbone.View.prototype.remove.apply(this, arguments);
    }
});