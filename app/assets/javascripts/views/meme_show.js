App.Views.MemeShow = Backbone.View.extend({
	className: "meme",
	template: JST['memes/show'],
	initialize: function(){
		this.captionViews = [];
		this.model.captions().each(function(element){
			this.addCaptionView(caption);
		}.bind(this));
		this.imageView = new App.Views.ImageView({ model: this.model.image() });
		this.selected = null;
		
		this.listenTo(this.model, "sync", this.render);
	},
	render: function(){
		this.$el.append( imageView.render().$el );
		
		captionViews.forEach(function(captionView){
			this.$el.append( elementView.render().$el );
		}.bind(this));
		
		return this;
	},
	addcaptionView: function(element, options){
		options = options || {};
		
		var view = new App.Views.CaptionView({ model: caption });
		this.captionViews.push(view);
		this.$el.append( view.render().$el );
		if (options.select) {
			this.selected = view;
			view.select();
		}
	},
	select: function(caption){
		var view = _.find(this.captionViews, function(view){
			return view.model.cid == caption.data("cid");
		});
		view.select();
	}
});