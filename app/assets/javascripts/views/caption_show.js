App.Views.CaptionShow = Backbone.View.extend({
	template: JST['captions/show'],
	events: {
		"click" : "triggerEditing"
	},
	className: "caption",
	initialize: function(){
		this.listenTo(this.model, "beginEditing", this.select);
		this.listenTo(this.model, "change", this.render);
	},
	render: function(){
		var content = this.template({ caption: this.model });
		this.$el.html(content);
		this.$el.css( this.model.get("styling") );
		this.$el.css("position", "absolute");
		return this;
	},
	select: function(){
		this.$el.addClass("selected");
	},
	triggerEditing: function(){
		this.model.trigger("beginEditing", this.model);
	}
});