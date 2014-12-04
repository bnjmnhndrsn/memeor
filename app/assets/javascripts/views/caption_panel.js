App.Views.CaptionPanel = Backbone.PanelView.extend({
	className: "caption-panel panel",
	template: JST["captions/panel"],
	initialize: function(){
		this.listenTo( this.model, "sync", this.render);
		this.listenTo( this.model, "remove", this.remove);
		this.listenTo( this.model, "beginEditing", this.expand);
		this.listenTo( this.model, "endEditing", this.retract);
	},
	render: function(){
		var rendered = this.template({ caption: this.model });
		this.$el.html(rendered);
		return this;
	},
	updateModel: function(event){
		var $cur = $(event.currentTarget);
		var attr = $(event.currentTarget).attr("name"),
			val = $(event.currentTarget).val();
		if (attr === "content"){
			this.model.set("content", val);
		} else if (attr == "font-size") {
			this.model.css(attr, val + "px");
		} else {
			this.model.css(attr, val);
		}
		return false;
	},
	destroy: function(){
		this.model.trigger("endEditing");
		this.model.destroy();
	},
});