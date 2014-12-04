App.Views.SocialShare = Backbone.View.extend({
	template: JST["shared/social_share"],
	initialize: function(options){
		this.url = options.url;
		this.title = options.title;
	},
	render: function(){
		var rendered = this.template({ url: this.url, title: this.title });
		this.$el.html( rendered );
		return this;
	}
})