App.Views.BlockPage = Backbone.View.extend({
	className: "block-page",
	template: JST["shared/block_page"],
	render: function(){
		var pageHeight = $(document).height(),
			pageWidth = $(window).width();
		
		this.$el.css({
			height: pageHeight,
			width: pageWidth
		});
		
		return this;
	}
});