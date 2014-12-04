Backbone.PanelView = Backbone.CompositeView.extend({
	header: JST["shared/panel_header"],
	expand: function(){
		this.$(".expandable").show();
		return false;
	},
	retract: function(){
		this.$(".expandable").hide();
		return false;
	}
});