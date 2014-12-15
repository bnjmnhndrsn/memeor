App.Collections.Memes = Backbone.PageableCollection.extend({
	model: App.Models.Meme,
	url: "/memes",
	mode: "infinite"
});

App.Collections.memes = new App.Collections.Memes();