App.Views.ImagesGallery = Backbone.CompositeView.extend({
	events: {
		"click .sort" : "sort"
	},
	template: JST["images/gallery"],
	initialize: function(){
		var view = new App.Views.ImagesIndex({ collection: this.collection });
		this.addSubview(".bottom-content", view);
	},
	render: function(){
		var rendered = this.template();
		this.$el.html(rendered);
		this.attachSubviews();
		return this;
	},
	sort: function(event){
		this.$(".sort").css("font-weight", "normal");
		$(event.currentTarget).css("font-weight", "bold");
		var key = $(event.currentTarget).data("sort");
		this.collection.comparator = this.sortFunctions[key];
		this.collection.sort()
	},
	sortFunctions: {
		newest: function(model){
			var d = new Date(model.get('updated_at'));
			return -d;
		},
		oldest: function(model){
			var d = new Date(model.get('updated_at'));
			return d;
		},
		popularity: function(model){
			return -model.get("total_memes");
		}
	}
});