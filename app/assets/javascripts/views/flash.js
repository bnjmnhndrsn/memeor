App.Views.Flash = Backbone.View.extend({
	className: "flash",
	template: JST["shared/flash"],
	initialize: function(options){
		this.text = options.text;
		setTimeout(this.remove.bind(this), options.timeout);
	},
	render: function(){
		var rendered = this.template({ text: this.text });
		this.$el.html( rendered );
		this.$el.css("left", ( $(document).width() - this.$el.width() ) / 2 )
		return this;
	}
});