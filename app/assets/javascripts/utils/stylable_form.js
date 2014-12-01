Backbone.StylableForm = Backbone.View.extend({
	events: {
		"input input" : "updateModel",
		"click .destroy": "destroy",
		"click .alignment": "align"
	},
	initialize: function(){
		this.listenTo( this.model, "sync", this.render);
	},
	render: function(){
		var templateObj = {};
		templateObj[this.modelName] = this.model;
		var rendered = this.template(templateObj);
		this.$el.html(rendered);
		this.highlightAlignedButton();
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
		console.log(this.model.css());
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
		this.model.align( $button.attr("name") );
	},
	highlightAlignedButton: function(){
		if (this.model.css("text-align")) {
			var $button = this.$("button[name='" + this.model.css("text-align") + "']");
			$button.addClass("btn-primary");
		}
	}
});