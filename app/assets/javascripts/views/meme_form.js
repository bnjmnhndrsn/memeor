App.Views.MemeForm = Backbone.View.extend({
	className: "meme-edit row",
	template: JST["memes/form"],
	defaultPanel: JST["memes/default_panel"],
	events: {
		"dblclick .meme": "newCaption",
		"click .meme": "triggerUnselect",
		"click .save": "save",
		"click .change-image": "changeImage",
		"click .cancel": "cancel"
	},
	initialize: function(){
		this.memeView = new App.Views.MemeShow({ model: this.model });
		this.listenTo(this.memeView.model.captions(), "beginEditing", this.editCaption);
	},
	render: function(){
		this.$el.html( this.template() );
		this.changePanel();
		this.$(".meme-container").append( this.memeView.render().$el );
		if (this.memeView.model.isNew()){
			this.changeImage();
		}
		return this;
	},
	changePanel: function(view){
		this._panelView && this._panelView.remove();
		if (view) {
			this._panelView = view;
			this.$('.control-panel').html( this._panelView.render().$el );
		} else {
			this.$('.control-panel').html( this.defaultPanel() )
		}
	},
	editCaption: function(caption){	
		this.triggerUnselect();
		this.selected = caption;
		this.listenTo(this.selected, "endEditing unselect", this.changePanel)
		this.triggerSelect();
		this.changePanel( new App.Views.CaptionForm({model: this.selected}) );
	},
	newCaption: function(event){
		event.preventDefault();
		this.triggerUnselect();
		var caption = new App.Models.Caption({meme_id: this.memeView.model.id});
		caption.styling().set({
			left: event.offsetX,
			top: event.offsetY,
			'font-size': '24px',
			color: 'black'
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
		var callback = function(){
			Backbone.history.navigate("", { trigger: true })
		};
		if ( $(event.currentTarget).hasClass("redirect") ){
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