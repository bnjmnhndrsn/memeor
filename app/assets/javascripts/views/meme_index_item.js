App.Views.MemeIndexItem = Backbone.CompositeView.extend({
	events: {
		"mouseenter": "changeBGImage"
	},
	template: JST['memes/index_item'],
	className: "meme-index-item text-center col-md-2 col-sm-3 col-xs-12",
	initialize: function(){
		this.resizeHandler = this.render.bind(this);
		$(window).on("viewportResize", this.resizeHandler);
		this.listenTo(this.model, "change", this.render );
	},
	render: function(){
		console.log("rendering")
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