App.Views.ImagesGallery = Backbone.CompositeView.extend({
	events: {
		"click .sort" : "sort",
		"click .fetch-more button": "fetchMore"
	},
	template: JST["images/gallery"],
	initialize: function(){
		this.addIndexView();
		//this.listenTo(this.collection, "sync", this.render);
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
		var keys = this.sortFunctions[ $(event.currentTarget).data("sort") ];
		this.collection.setSorting( keys.sort_by, keys.order, { side: "client" } );
		this.collection.getPage(1, {
			fetch: true,
			success: function(){
				this.removeSubview(".bottom-content", this.indexView);
				this.collection.fullCollection.sort();
				console.log(this.collection.getPage(1).pluck("id"));
				this.addIndexView();
			}.bind(this)
		});
	},
	sortFunctions: {
		newest:  { sort_by: 'created_at', order: 1 },
		oldest: { sort_by: 'created_at', order: -1 },
		popularity:  { sort_by: 'memes_count', order: 1 }
	}, 
	fetchMore: function(){
		this.collection.getNextPage();
	},
	addIndexView: function(){
		this.indexView = new App.Views.ImagesIndex({ collection: this.collection });
		this.addSubview(".bottom-content", this.indexView);
	}
});