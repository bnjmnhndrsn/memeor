App.Views.MemeShow = Backbone.View.extend({
	className: "meme",
	template: JST['memes/show'],
	initialize: function(){
		this.captionViews = [];
		this.selected = null;
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.model.captions(), "add", this.addCaptionView)
	},
	render: function(){
		this.addCaptionViews();
		this.addImageView();
		return this;
	},
	addImageView: function(){
		this.imageView && this.imageView.remove();
		this.imageView = new App.Views.ImageShow({ model: this.model.image() });
		this.$el.append( this.imageView.render().$el );
	},
	addCaptionViews: function(){
		this.removeCaptionViews();
		this.model.captions().each(function(caption){
			this.addCaptionView(caption);
		}.bind(this));
	},
	removeCaptionViews: function(){
		if (this.captionViews){
			this.captionViews.forEach(function(captionView){
				captionView.remove();
			})
			this.captionViews = [];
		}
	},
	addCaptionView: function(caption){
		var view = new App.Views.CaptionShow({ model: caption });
		this.captionViews.push(view);
		this.$el.append( view.render().$el );
	},
	save: function(){
		this.model.save({}, {
			success: function(){
				console.log("success");
				this.captionViews.forEach(function(view){
					view.save();
				});
			}.bind(this)
		});
	}
});