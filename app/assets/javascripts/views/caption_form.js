App.Views.CaptionForm = Backbone.StylableForm.extend({
	className: "caption-form",
	template: JST["captions/form"],
	modelName: "caption"
});