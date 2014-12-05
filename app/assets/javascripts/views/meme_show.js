App.Views.MemeShow = Backbone.View.extend({
	className: "meme",
	template: JST['memes/show'],
	initialize: function(){
		this.captionViews = [];
		this.listenTo(this.model, "change:image", this.addImageView);
		this.listenTo(this.model, "change", this.update);
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.model.captions(), "add", this.addCaptionView);
		this.listenTo(this.model.captions(), "remove", this.removeCaptionView);
	},
	render: function(){
		this.$el.css( this.model.css() );
		this.addImageView();
		this.addCaptionViews();
		this.model.width( this.$el.width );
		return this;
	},
	update: function(){
		this.$el.css( this.model.css() );
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
	removeCaptionView: function(caption){
		var view = _.find(this.captionViews, function(view){
			return caption.cid === view.model.cid;
		});
		view.remove();
		this.captionViews.splice( this.captionViews.indexOf(view), 1 );
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
	save: function(options){
		
		var blockpage = new App.Views.BlockPage();
		$("body").append(blockpage.render().$el);
		var canvasify = new App.Utils.Canvasify({
			container: "meme-canvas",
	        width: this.model.width(),
	        height: this.model.height()
		});
		
		canvasify.addImage( $(".image img") );
		
		$(".caption").each(function(){
			canvasify.addCaption( $(this) );
		});
		
		var that = this;
		
		var success = function(){
			App.Collections.memes.add(that.model);
			Backbone.history.navigate("/memes/" + that.model.id, { trigger: true });
			blockpage.remove();
		};
		
		canvasify.toDataUrl(function(dataUrl){
			
			that.$el.find("#meme-canvas").empty();
			dataUrl
			that.model.save({ cached_image: dataUrl }, {
				success: success
			});
		});
	}
});