App.Models.Caption = Backbone.Model.extend({
	parse: function(response){
		response.styling = App.Utils.parseAttr(response.styling);
		console.log(response);
		return response;
	}
});