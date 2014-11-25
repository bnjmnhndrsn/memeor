App.Views.CaptionForm = Backbone.View.extend({
	className: "caption-form",
	events: {
		"input input" : "updateCaption"
	},
	template: JST["captions/form"],
	render: function(){
		var fontSize = this.model.get("styling")['font-size'],
			content = this.model.get("content"),
			rendered = this.template({ fontSize: fontSize, content: content });
		
		this.$el.html(rendered);
		return this;
	},
	updateCaption: function(event){
		var $cur = $(event.currentTarget);
		var attr = $(event.currentTarget).attr("name"),
			val = $(event.currentTarget).val();
		
		if (attr === "content"){
			this.model.set("content", val);
		} else {
			this.model.get("styling")[attr] = val;
		}
		
		return false;
	}
});