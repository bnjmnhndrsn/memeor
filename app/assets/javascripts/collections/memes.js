App.Collections.Memes = Backbone.Collection.extend({
	model: App.Models.Meme,
	url: "/memes"
});

App.Collections.memes = new App.Collections.Memes();