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
		var key = $(event.currentTarget).data("sort");
		this.collection.comparator = this.sortFunctions[key];
		this.collection.sort()
	},
	sortFunctions: {
		recent: function(model){
			return new Date(model.get('updated_at'));
		},
		popularity: function(model){
			return -model.get("total_memes");
		}
	}
});