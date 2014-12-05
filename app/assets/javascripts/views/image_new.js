App.Views.ImageNew = Backbone.View.extend({
	events: {
		"submit form": "submit",
		"change input": "validate",
		"input input": "validate"
	},
	template: JST["images/new"],
	render: function(){
		var rendered = this.template();
		this.$el.html( rendered );
		return this;
	},
	validate: function(){
		$inputs = this.$("input");
		var isValid = _.all($inputs, function(input){
			return !!input.value;
		});
		isValid && this.$("input[type='submit']").prop("disabled", false);
		
	},
	submit: function(event){
		event.preventDefault();
		
		
		var blockview = new App.Views.BlockPage();
		$("body").append(blockview.render().$el);
		
		var $form = $(event.currentTarget);
		var values = {};
	    var csrf_param = $('meta[name=csrf-param]').attr('content');
	    var csrf_token = $('meta[name=csrf-token]').attr('content');
	    var values_with_csrf;
		
	    _.each($form.serializeArray(), function(input){
	         values[ input.name ] = input.value;
	    });
		
		values["public"] = $form.find("[name='public']").prop("checked");

		values_with_csrf = _.extend({}, values)
    	values_with_csrf[csrf_param] = csrf_token
		   		   
		var image = new App.Models.Image(values);
		var that = this;
		
		image.save({}, {
			iframe: true,
			files: $form.find(":file"),
			data: values_with_csrf,
			success: function(){
				image.get("public") && that.collection.add(image);
				blockview.remove();
				Backbone.history.navigate("/images/" + image.id, { trigger: true });
			} 
		});
		
	}
});