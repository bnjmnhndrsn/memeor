App.Views.CaptionForm = Backbone.View.extend({
	className: "caption-form",
	events: {
		"input input" : "updateCaption",
		"click .destroy": "destroy",
		"click .alignment": "align"
	},
	template: JST["captions/form"],
	render: function(){
		var fontSize = this.model.styling().get('font-size'),
			content = this.model.get("content");
		if (fontSize) {
			fontSize = +fontSize.replace('px', '');
		}
		
		var rendered = this.template({ fontSize: fontSize, content: content });
		this.$el.html(rendered);
		return this;
	},
	updateCaption: function(event){
		var $cur = $(event.currentTarget);
		var attr = $(event.currentTarget).attr("name"),
			val = $(event.currentTarget).val();
		if (attr === "content"){
			this.model.set("content", val);
		} else if (attr == "font-size") {
			this.model.styling().set("font-size", val + "px");
		}
		
		return false;
	},
	destroy: function(){
		this.model.trigger("endEditing");
		this.model.destroy();
	},
	align: function(event){
		var dir = $(event.currentTarget).attr("name");
		dir = (dir === "none") ? "" : dir;
		this.model.trigger("align", dir);
	}
});