App.Views.BlockPage = Backbone.View.extend({
	className: "block-page",
	template: JST["shared/block_page"],
	render: function(){
		var pageHeight = $(document).height(),
			pageWidth = $(window).width();
		this.$el.html( this.template() );
		
		this.$el.css({
			height: pageHeight,
			width: pageWidth,
		});
		
		$(window).resize(function(){
			this.$el.css({
				height: $(document).height(),
				width: $(document).width()
			});
		}.bind(this))
		
		return this;
	},
	remove: function(){
		$(window).off('resize');
		Backbone.View.prototype.remove.call(this);
		
	}
});