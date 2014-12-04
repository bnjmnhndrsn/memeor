App.Views.MemeImagePanel = Backbone.PanelView.extend({
	events: {
		"click .meme-image-item": "changeImage",
		"submit .create": "createImage",
		"click .expand": "expand",
		"click .retract": "retract",
		"click .panel-header": "toggle"
	},
	className: "meme-image-form panel",
	template: JST["memes/image_panel"],
	initialize: function(){
		this.collection.fetch();
		
		this.collection.each(function(image){
			this.addImageView(image);
		}.bind(this));
		
		this.listenTo(this.collection, "add", this.addImageView);
	},
	render: function(){
		var rendered = this.template();
		this.$el.html(rendered);
		this.$(".panel-header").html( this.header({title: "Image"}) );
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
				that.model.setImage(image);
			} 
		});
		
	}
});