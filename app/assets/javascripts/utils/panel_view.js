Backbone.PanelView = Backbone.CompositeView.extend({
	expand: function(){
		this.$(".exandable").show();
	},
	retract: function(){
		this.$(".expandable").show();
	}
});