Backbone.PanelView = Backbone.CompositeView.extend({
	header: JST["shared/panel_header"],
	expand: function(){
		this.$el.toggleClass("expanded");
		this.$(".panel-header span.glyphicon").attr("class", "glyphicon glyphicon-minus");
		this.$(".expandable").show();
		return false;
	},
	retract: function(){
		this.$el.toggleClass("expanded");
		this.$(".panel-header span.glyphicon").attr("class", "glyphicon glyphicon-plus");
		this.$(".expandable").hide();
		return false;
	},
	toggle: function(){
		if (this.$(".expandable").css("display") === "none"){
			this.expand();
		} else {
			this.retract();
		}
	}
});