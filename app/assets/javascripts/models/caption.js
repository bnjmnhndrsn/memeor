App.Models.Caption = Backbone.Model.extend({
	parse: function(response){
		response.styling = App.Utils.parseAttr(response.styling);
		return response;
	},
	urlRoot: "/captions"
});