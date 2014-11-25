App.Views.MemeForm = Backbone.View.extend({
	className: "meme-edit",
	template: JST["memes/form"],
	initialize: function(){
		this.memeView = new App.Views.MemeShow({ model: this.model });
		this.listenTo(this.memeView.model.captions(), "beginEditing", this.editCaption)
	},
	render: function(){
		this.$el.html( this.template() );
		this.$(".meme-container").append( this.memeView.render().$el );
		this.setjQueryMap();
		return this;
	},
	setjQueryMap: function(){
		this.$map = {
			$content: this.$("input[name='content']"),
			$size: this.$("input[name='font-size']"),
			$url: this.$("input[name='url']")
		};
	},
	changePanel: function(view){
		this._panelView && this._panelView.remove();
		this._panelView = view;
		this.$('.control-panel').html( this._panelView.render().$el );
	},
	editCaption: function(caption){	
		this.selected = caption;
		this.changePanel( new App.Views.CaptionForm({model: this.selected}) );
	}
});