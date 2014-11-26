App.Views.MemeForm = Backbone.View.extend({
	className: "meme-edit",
	template: JST["memes/form"],
	events: {
		"dblclick .meme": "newCaption",
		"click .meme": "triggerUnselect",
		"click .save": "save"
	},
	initialize: function(){
		this.memeView = new App.Views.MemeShow({ model: this.model });
		this.listenTo(this.memeView.model.captions(), "beginEditing", this.editCaption);
	},
	render: function(){
		this.$el.html( this.template() );
		this.$(".meme-container").append( this.memeView.render().$el );
		return this;
	},
	changePanel: function(view){
		this._panelView && this._panelView.remove();
		if (view) {
			this._panelView = view;
			this.$('.control-panel').html( this._panelView.render().$el );
		}
	},
	editCaption: function(caption){	
		this.triggerUnselect();
		this.selected = caption;
		this.listenTo(this.selected, "endEditing", this.changePanel)
		this.triggerSelect();
		this.changePanel( new App.Views.CaptionForm({model: this.selected}) );
	},
	newCaption: function(event){
		event.preventDefault();
		this.triggerUnselect();
		var caption = new App.Models.Caption({meme_id: this.memeView.model.id});
		caption.set("styling", {
			left: event.offsetX,
			top: event.offsetY,
			'font-size': '12px',
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
	save: function(){
		this.memeView.save();
	}
});