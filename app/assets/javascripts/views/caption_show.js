App.Views.CaptionShow = Backbone.View.extend({
	template: JST['captions/show'],
	events: {
		"click": "triggerEditing",
		"dblclick": "triggerEditing"
	},
	className: "caption",
	initialize: function(){
		this.listenTo(this.model, "select", this.select);
		this.listenTo(this.model, "unselect", this.unselect);
		this.listenTo(this.model, "change", this.render);
		this.selected = false;
	},
	render: function(){
		var content = this.template({ caption: this.model });
		this.$el.html(content);
		console.log(this.model.get("styling"));
		this.$el.css( this.model.get("styling") );
		this.$el.css("position", "absolute");
		return this;
	},
	select: function(){
		if (!this.selected){
			this.selected = true;
			this.$el.addClass("selected").draggable().resizable();
		}
	},
	unselect: function(){
		if (this.selected) {
			this.selected = false;
			this.$el.removeClass("selected").draggable('destroy').resizable('destroy');
		}
	},
	triggerEditing: function(event){
		event.preventDefault();
		if (!this.selected) {
			this.model.trigger("beginEditing", this.model);
		}
		return false;	
	},
	save: function(){
		this.model.save({
			styling: this.$el.attr("style")
		}, {
			success: function(model){
				this.model = model;
			}.bind(this)
		});
		
	}
});