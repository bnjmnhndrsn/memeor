App.Models.Styling = Backbone.Model.extend({
	initialize: function(attributes, options){
		if (options.parentModel){
			this.parentModel = options.parentModel;
			this.on("change", function(){
				this.parentModel.trigger("change");
			}.bind(this))
		}
	}
});