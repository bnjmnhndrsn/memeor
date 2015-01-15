App.Views.MemeImagePanel = Backbone.PanelView.extend({
	events: {
		"click .meme-image-item": "changeImage",
		"submit .create": "createImage",
		"click .expand": "expand",
		"click .retract": "retract",
		"click .panel-header": "toggle",
		"change input": "validate",
		"input input": "validate",
		"click .fetch-more button": "fetchMore"
	},
	className: "meme-image-form panel expanded",
	template: JST["memes/image_panel"],
	initialize: function(){
		this.collection.fetch();
		this.collection.each(function(image){
			this.addImageView(image);
		}.bind(this));
		
		this.listenTo(this.collection.fullCollection, "add", this.addImageView);
	},
	render: function(){
		var rendered = this.template({ images: this.collection });
		this.$el.html(rendered);
		this.$(".panel-header").html( this.header({title: "Image"}) );
		if (!this.model.image().isNew()){
			this.retract();
		}
		this.attachSubviews();
		return this;
	},
	addImageView: function(image){
		var view = new App.Views.MemeImageItem({ model: image });
		this.addSubview(".image-items", view);
	},
	changeImage: function(event){
		var id = $(event.currentTarget).data("id"),
			newImage = App.Collections.images.get(id);
		this.model.setImage(newImage);
		this.retract();
		return false;
	},
	fetchMore: function(){
		this.collection.getNextPage();
	},
	validate: function(){
		$inputs = this.$("input");
		var isValid = _.all($inputs, function(input){
			return !!input.value;
		});
		isValid && this.$("input[type='submit']").prop("disabled", false);
		
	},
	createImage: function(event){
		event.preventDefault();
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
				that.model.setImage(image);
				that.retract();
				$form.find("input[type='text']").val("");
				$form.find("input[type='file']").val("");
			} 
		});
		
	}
});