App.Views.MemeEditor = Backbone.View.extend({
	className: "meme-edit row",
	template: JST["memes/editor"],
	events: {
		"dblclick .meme": "newCaption",
		"click .meme": "triggerUnselect",
		"click .save": "save",
		"click .change-image": "changeImage",
		"click .cancel": "cancel"
	},
	initialize: function(){
		this.memeView = new App.Views.MemeShow({ model: this.model });
		this.memeForm = new App.Views.MemeForm({ model: this.model });
		this.listenTo(this.memeView.model.captions(), "beginEditing", this.editCaption);
		this.listenTo(this.model, "change:image", this.openDefaultPanel);
	},
	render: function(){
		this.$el.html( this.template({ meme: this.model }) );
		this.changePanel( this.memeForm );
		this.$(".meme-container").append( this.memeView.render().$el );
		if (this.memeView.model.isNew()){
			this.changeImage();
		}
		return this;
	},
	changePanel: function(view){
		this._panelView && this._panelView.remove();
		this._panelView = view;
		this.$('.control-panel').html( this._panelView.render().$el );
	},
	openDefaultPanel: function() {
		this.changePanel( this.memeForm );
	},
	editCaption: function(caption){	
		this.triggerUnselect();
		this.selected = caption;
		this.listenTo(this.selected, "endEditing unselect", this.openDefaultPanel)
		this.triggerSelect();
		this.changePanel( new App.Views.CaptionForm({model: this.selected}) );
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
		
		var callback = function(){
			Backbone.history.navigate("", { trigger: true })
		};
		
		if ( $button.hasClass("redirect") ){
			this.memeView.save(callback);
		} else {
			this.memeView.save();
		}
		
	},
	changeImage: function(){
		event.preventDefault();
		this.triggerUnselect();
		App.Collections.images.fetch();
		this.changePanel( new App.Views.MemeImageForm({ model: this.memeView.model, collection: App.Collections.images }) );
	},
	cancel: function(){
		Backbone.history.navigate("", { trigger: true } );
	}
});