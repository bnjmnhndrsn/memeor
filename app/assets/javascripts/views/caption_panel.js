App.Views.CaptionPanel = Backbone.PanelView.extend({
	className: "caption-panel panel",
	events: {
		"input input": "updateModel",
		"click .delete": "delete",
		"click .expand": "select",
		"click .retract": "retract",
		"click .panel-header": "toggle"
	},
	template: JST["captions/panel"],
	initialize: function(){
		this.listenTo( this.model, "sync", this.render);
		this.listenTo( this.model, "destroy", this.remove);
		this.listenTo( this.model, "select", this.expand);
		this.listenTo( this.model, "unselect", this.retract);
	},
	render: function(){
		var rendered = this.template({ caption: this.model });
		this.$el.html(rendered);
		this.$(".panel-header").html( this.header({title: "Caption"}) );
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
	expand: function(){
		Backbone.PanelView.prototype.expand.call(this);
		this.$("input[name='content']").focus();
	},
	select: function(){
		this.model.trigger("beginSelect", [this.model])
	},
	delete: function(){
		this.model.destroy();
	},
});