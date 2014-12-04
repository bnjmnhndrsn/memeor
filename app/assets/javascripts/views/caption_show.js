App.Views.CaptionShow = Backbone.View.extend({
	template: JST['captions/show'],
	events: {
		"mousedown" : "triggerSelect",
		"resizestop": "resize",
		"dragstop": "drag"
	},
	className: "caption",
	initialize: function(){
		this.listenTo(this.model, "select", this.select);
		this.listenTo(this.model, "unselect", this.unselect);
		this.listenTo(this.model, "change", this.update);
		this.listenTo(this.model, "align", this.align);
	},
	render: function(){
		var rendered = this.template({ caption: this.model });
		this.$el.html( rendered );
		this.$el.css( this.model.css() );
		this.$el.css("position", "absolute");
		this.model.width( this.$el.width() );
		setTimeout(function(){
			this.$el.draggable({
				containment: "parent"
			}).resizable();
		}.bind(this), 1)
		return this;
	},
	update: function(){
		this.$(".inner").text( this.model.get("content") );
		this.model.width( this.$el.width() );
		
		if (this.model.css("text-align")){
			var alignment = this.model.css("text-align");
			this.model.css("left", this.model.getAlignment(), {silent: true});
		}
		
		this.$el.css( this.model.css() );		

	},
	triggerSelect: function(event){
		this.model.trigger("beginSelect", [this.model]);
	},
	select: function(){
		this.$el.addClass("selected");
	},
	unselect: function(){
		this.$el.removeClass("selected");
	},
	resize: function(event, ui){
		var width = ui.element.find(".inner").width() + 20;
		var height = ui.element.find(".inner").height() + 20;
		
		this.model.css({
			"width": width + "px",
			"height": height + "px"
		}, {silent: false});
	},
	drag: function(event, ui){
		this.model.css({
			"left": ui.position.left + "px",
			"top": ui.position.top + "px"
		});
	}
});