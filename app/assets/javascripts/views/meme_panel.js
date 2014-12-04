App.Views.MemePanel = Backbone.PanelView.extend({
	className: "panel",
	template: JST["memes/panel"],
	events: {
		"input input" : "updateModel",
		"click .alignment": "align",
		"click .expand": "expand",
		"click": "expand",
		"click .retract": "retract"
	},
	initialize: function(){
		this.listenTo( this.model, "sync", this.render);
	},
	render: function(){
		var rendered = this.template({ meme: this.model });
		this.$el.html( rendered );
		this.$(".panel-header").html( this.header({title: "Meme Options"}) );
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
		return false;
	},
	align: function(event){
		var $button = $(event.currentTarget);
		this.highlightAlignedButton();
		this.model.align( $button.attr("name") );
	},
	highlightAlignedButton: function(){
		if (this.model.css("text-align")) {
			this.$(".alignment").removeClass("btn-primary");
			var $button = this.$("button[name='" + this.model.css("text-align") + "']");
			$button.addClass("btn-primary");
		}
	}
});