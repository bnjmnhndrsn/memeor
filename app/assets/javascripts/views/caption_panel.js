App.Views.CaptionPanel = Backbone.PanelView.extend({
	className: "caption-panel panel expanded",
	events: {
		"keydown input[name='content']": "print",
		"input input": "updateModel",
		"click .delete": "delete",
		"click .panel-header": "toggle",
		"changeColor input": "updateModel",
		
	},
	print: function(event){
		var code = (event.keyCode ? event.keyCode : event.which);
		 if (code == 13) { 
			 this.retract();
		 }
	},
	template: JST["captions/panel"],
	initialize: function(){
		this.listenTo( this.model, "sync", this.render);
		this.listenTo( this.model, "destroy", this.remove);
		this.listenTo( this.model, "select", this.expand);
		this.listenTo( this.model, "unselect", this.retract);
		this.expanded = true;
	},
	render: function(){
		var rendered = this.template({ caption: this.model });
		this.$el.html(rendered);
		this.$(".panel-header").html( this.header({title: "Caption"}) );
		var $colorInput = this.$("input[name='color']");
		setTimeout(function(){
			$colorInput.colorpicker();
		}.bind(this), 1);
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
		if (!this.expanded){
			this.expanded = true;
			Backbone.PanelView.prototype.expand.call(this);
			this.select();
			this.$("input[name='content']").focus();
			
		}
	},
	retract: function(){
		if (this.expanded){
			this.expanded = false;
			Backbone.PanelView.prototype.retract.call(this);
			this.model.trigger("endSelect");	
		}
	},
	select: function(){
		this.model.trigger("beginSelect", [this.model])
	},
	delete: function(){
		this.model.destroy();
	},
});