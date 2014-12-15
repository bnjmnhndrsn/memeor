App.Views.ImagesGallery = Backbone.CompositeView.extend({
	events: {
		"click .sort" : "sort",
		"click .fetch-more button": "fetchMore"
	},
	template: JST["images/gallery"],
	initialize: function(){
		var view = new App.Views.ImagesIndex({ collection: this.collection });
		this.addSubview(".bottom-content", view);
		this.listenTo(this.collection, "sync", this.render);
	},
	render: function(){
		var rendered = this.template({images: this.collection});
		this.$el.html(rendered);
		this.attachSubviews();
		return this;
	},
	sort: function(event){
		this.$(".sort").css("font-weight", "normal");
		$(event.currentTarget).css("font-weight", "bold");
		var key = $(event.currentTarget).data("sort");
		this.collection.fullCollection.comparator = this.sortFunctions[key];
		this.collection.fullCollection.sort()
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
	}, 
	fetchMore: function(){
		this.collection.getNextPage();
	}
});