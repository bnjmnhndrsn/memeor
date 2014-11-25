App.Views.CaptionShow = Backbone.View.extend({
	events: {
		"click" : "triggerEditing"
	},
	className: "caption",
	initialize: function(){},
	render: function(){
		var content = this.template({element: this.model});
		this.$el.html(content);
		this.$el.css( this.model.get("styling") );
		return this;
	},
	select: function(){
		this.$el.addClass("selected");
	},
	triggerEditing: function(){
		this.model.trigger("beginEditing", this.model);
	}
});