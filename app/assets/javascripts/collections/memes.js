App.Collections.Memes = Backbone.PageableCollection.extend({
	model: App.Models.Meme,
	url: "/memes",
	mode: "infinite",
	state: {
		pageSize: 24
	}
});

App.Collections.memes = new App.Collections.Memes();