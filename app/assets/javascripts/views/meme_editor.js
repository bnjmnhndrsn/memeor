App.Views.MemeEditor = Backbone.CompositeView.extend({
	className: "meme-edit row",
	template: JST["memes/editor"],
	events: {
		"dblclick .meme": "newCaption",
		"click .save": "save",
		"click .change-image": "changeImage",
		"click .cancel": "cancel",
		"click .delete": "delete",
	},
	initialize: function(){
		this.render();
		this.memeView = new App.Views.MemeShow({ model: this.model });
		this.addSubview(".meme-show-container", this.memeView);
		
		this.memePanel = new App.Views.MemePanel({ model: this.model });
		this.addSubview(".meme-panel", this.memePanel);
		
		this.imagePanel = new App.Views.MemeImagePanel({ model: this.memeView.model, collection: App.Collections.images });
		this.addSubview(".images-panel", this.imagePanel);
		
		this.memeView.model.captions().each(function(caption){
			this.addCaptionPanel(caption);
		}.bind(this));
		
		this.listenTo(this.memeView.model.captions(), "add", this.addCaptionPanel);
		this.listenTo(this.memeView.model.captions(), "beginSelect", this.changeSelected)
		this.listenTo(this.memeView.model.captions(), "endSelect", this.changeSelected)
	},
	render: function(){
		var rendered = this.template({ meme: this.model });
		this.$el.html(rendered);
		this.attachSubviews();
		return this;
	},
	addCaptionPanel: function(caption){
		var view = new App.Views.CaptionPanel({ model: caption });
		this.addSubview(".caption-panels", view);
		view.retract();
		caption.trigger("beginSelect", [caption]);
	},
	newCaption: function(event){
		event.preventDefault();
		var caption = new App.Models.Caption({ meme: this.memeView.model });
		caption.styling().set({
			left: event.offsetX,
			top: event.offsetY
		});
		this.memeView.model.captions().add(caption);
	},
	changeSelected: function(args){
		if (arguments.length === 0){
			this.selected && this.selected.trigger("unselect");
			this.selected = null;
		} else if (this.selected !== args[0]) {
			this.selected && this.selected.trigger("unselect");
			this.selected = args[0];
			this.selected.trigger("select");
		}
	},
	save: function(event){
		event.preventDefault();
		var $button = $(event.currentTarget);
		
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