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
		debugger;
		var rendered = this.template({ caption: this.model });
		this.$el.html( rendered );
		this.$el.css( this.model.styling().attributes );
		this.$el.css("position", "absolute");
		return this;
	},
	update: function(){
		this.$(".inner").text( this.model.get("content") );
		
		if (this.model.styling().get("text-align")){
			var alignment = this.model.styling().get("text-align");
			this.model.styling().set("left", this.getAlignment(alignment), {silent: true});
		}
		
		this.$el.css( this.model.styling().attributes );

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
	save: function(){
		this.model.save({
			styling: this.$el.attr("style")
		}, {
			success: function(model){
				this.model = model;
			}.bind(this)
		});
		
	},
	getAlignment: function(direction){
		var res;
		if (direction == "center"){
			res = 250 - (this.$el.width() / 2) + "px";
		} else if (direction == "left") {
			res = "5px"
		} else if (direction == "right") {
			res = 495 - (this.$el.width()) + "px";
		} else {
			res = this.model.styling().get("left");
		}
		return res;
	},
	align: function(alignment){
		if (this.model.styling().get("text-align") == alignment) {
			alignment = "";
		}
		
		this.model.styling().set({
			"left": this.getAlignment(alignment),
			"text-align": alignment
		});
	},
	resize: function(event, ui){
		this.model.styling().set({
			"width": ui.element.width() + "px",
			"height": ui.element.height() + "px"
		}, {silent: true});
	},
	drag: function(event, ui){
		this.model.styling().set({
			"left": ui.position.left + "px",
			"top": ui.position.top + "px"
		});
	}
});