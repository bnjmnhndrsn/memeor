App.Views.CaptionForm = Backbone.View.extend({
	className: "caption-form",
	events: {
		"input input" : "updateCaption",
		"click .destroy": "destroy",
		"click .alignment": "align"
	},
	template: JST["captions/form"],
	initialize: function(){
		
	},
	render: function(){
		var rendered = this.template({ caption: this.model });
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
	align: function(event){
		var $button = $(event.currentTarget);
		
		if ($button.hasClass("btn-primary")) {
			$button.removeClass("btn-primary");
		} else {
			this.$(".alignment").removeClass("btn-primary");
			$button.addClass("btn-primary");
		}
		this.model.trigger("align", $button.attr("name"));
	}
});