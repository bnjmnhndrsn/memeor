App.Views.CaptionShow = Backbone.View.extend({
	template: JST['captions/show'],
	events: {
		"click": "triggerEditing",
		"dblclick": "triggerEditing",
		"resizestop": "resize",
		"dragstop": "drag"
	},
	className: "caption",
	initialize: function(){
		this.listenTo(this.model, "select", this.select);
		this.listenTo(this.model, "unselect", this.unselect);
		this.listenTo(this.model, "change", this.update);
		this.listenTo(this.model, "align", this.align);
		this.selected = false;
	},
	render: function(){
		var rendered = this.template({ caption: this.model });
		this.$el.html( rendered );
		this.$el.css( this.model.css() );
		this.$el.css("position", "absolute");
		this.model.width( this.$el.width() );
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
	select: function(){
		if (!this.selected){
			this.selected = true;
			this.$el.addClass("selected").draggable().resizable();
		}
	},
	unselect: function(){
		if (this.selected) {
			if (!this.model.get("content")) {
				this.model.destroy();
				this.remove();
			} else {
				this.selected = false;
				this.$el.removeClass("selected").draggable('destroy').resizable('destroy');
			}

		}
	},
	triggerEditing: function(event){
		if (!this.selected) {
			event.preventDefault();
			this.model.trigger("beginEditing", this.model);
			return false;
		}
	},
	resize: function(event, ui){
		this.model.css({
			"width": ui.element.width() + "px",
			"height": ui.element.height() + "px"
		}, {silent: true});
	},
	drag: function(event, ui){
		this.model.css({
			"left": ui.position.left + "px",
			"top": ui.position.top + "px"
		});
	}
});