App.Views.MemeShow = Backbone.View.extend({
	className: "meme",
	template: JST['memes/show'],
	initialize: function(){
		this.captionViews = [];
		this.selected = null;
		this.listenTo(this.model, "change:image", this.addImageView);
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.model.captions(), "add", this.addCaptionView);
		this.listenTo(this.model.captions(), "remove", this.removeCaptionView);
	},
	render: function(){
		this.$el.css( this.model.css() );
		this.addImageView();
		this.addCaptionViews();
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
	save: function(callback){
		var success = function(){
				Backbone.history.navigate("/memes/" + this.model.id + "/edit");
		}.bind(this);
		
		var that = this;
		html2canvas(this.$el, {
			allowTaint: true,
		    onrendered: function(canvas) {
				var image = canvas.toDataURL("image/png");
				
				success = (callback) ? callback : success;
			 
				that.model.save({ cached_image: image}, {
					success: success
				});
		        
		    }
		});
		
	
	}
});