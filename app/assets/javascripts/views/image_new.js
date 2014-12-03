App.Views.ImageNew = Backbone.View.extend({
	events: {
		"submit form": "submit"
	},
	template: JST["images/new"],
	render: function(){
		var rendered = this.template();
		this.$el.html( rendered );
		return this;
	},
	submit: function(event){
		event.preventDefault();
		var $form = $(event.currentTarget);
		var values = {};
	    var csrf_param = $('meta[name=csrf-param]').attr('content');
	    var csrf_token = $('meta[name=csrf-token]').attr('content');
	    var values_with_csrf;
		
	    _.each($form.serializeArray(), function(input){
	         values[ input.name ] = input.value;
	    });
		

		values_with_csrf = _.extend({}, values)
    	values_with_csrf[csrf_param] = csrf_token
		   		   
		var image = new App.Models.Image(values);
		var that = this;
		
		image.save({}, {
			iframe: true,
			files: $form.find(":file"),
			data: values_with_csrf,
			success: function(){
				that.collection.add(image);
				Backbone.history.navigate("/images/" + image.id);
			} 
		});
		
	}
});