App.Views.MemeEditor = Backbone.CompositeView.extend({
	className: "meme-edit row",
	template: JST["memes/editor"],
	events: {
		"dblclick .meme": "newCaption",
		"click .meme": "triggerUnselect",
		"click .unselect": "triggerUnselect",
		"click .image-panel": "triggerUnselect",
		"click .save": "save",
		"click .change-image": "changeImage",
		"click .cancel": "cancel",
		"click .delete": "delete"
	},
	initialize: function(){
		this.render();
		this.memeView = new App.Views.MemeShow({ model: this.model });
		this.addSubview(".meme-container", this.memeView);
		
		this.memePanel = new App.Views.MemePanel({ model: this.model });
		this.addSubview(".meme-panel", this.memePanel);
		
		this.imagePanel = new App.Views.MemeImagePanel({ model: this.memeView.model, collection: App.Collections.images });
		this.addSubview(".images-panel", this.imagePanel);
		
		this.listenTo(this.memeView.model.captions(), "add", this.addCaptionPanel);
	},
	render: function(){
		var rendered = this.template({ meme: this.model });
		this.$el.html(rendered);
		this.attachSubviews();
		return this;
	},
	addCaptionPanel: function(caption){
		var view = new App.Views.CaptionPanel({ model: caption });
		this.$(".caption-panels").append( view.render().$el );
	},
	newCaption: function(event){
		event.preventDefault();
		this.triggerUnselect();
		var caption = new App.Models.Caption({ meme: this.memeView.model });
		caption.styling().set({
			left: event.offsetX,
			top: event.offsetY
		});
		this.memeView.model.captions().add(caption);
		caption.trigger("beginEditing", caption);
	},
	triggerUnselect: function(event){
		this.selected && this.selected.trigger("unselect");
		return false;
	},
	triggerSelect: function(event){
		this.selected && this.selected.trigger("select");
		return false;
	},
	save: function(event){
		event.preventDefault();
		var $button = $(event.currentTarget);
		
		if ($button.hasClass("unselect")){
			this.selected.trigger("unselect");
		}
		
		var options = {
			redirect: $button.hasClass("redirect")
		};
		
		this.memeView.save(options);
		
	},
	cancel: function(){
		Backbone.history.navigate("", { trigger: true } );
	},
	delete: function(){
		if (this.model.isNew()){
			this.cancel();
			return;
		}
		
		var blockpage = new App.Views.BlockPage();
		$("body").append( blockpage.render().$el );
		this.model.destroy({
			success: function(){
				blockpage.remove();
				Backbone.history.navigate("", { trigger: true });
			},
			error: function(){
				blockpage.remove();
				alert("error!");
			}
		});
	}
});