App.Views.MemePanel = Backbone.PanelView.extend({
	className: "panel expanded",
	template: JST["memes/panel"],
	events: {
		"input input" : "updateModel",
		"input select": "updateModel",
		"change input[type='checkbox']": "updateModel",
		"click .alignment": "align",
		"click .expand": "expand",
		"click .retract": "retract",
		"click .panel-header": "toggle",
		"click .add-caption": "newCaption",
		"changeColor input": "updateModel"
	},
	initialize: function(){
		this.listenTo( this.model, "sync", this.render);
		this.listenTo( this.model, "change:image", this.expand);
	},
	render: function(){
		var rendered = this.template({ meme: this.model });
		this.$el.html( rendered );
		this.$(".panel-header").html( this.header({title: "Meme Options"}) );
		this.highlightAlignedButton();
		if (this.model.image().isNew()){
			this.retract();
		}
		var $colorInput = this.$("input[name='color']");
		setTimeout(function(){
			$colorInput.colorpicker();
		}.bind(this), 1);
		return this;
	},
	updateModel: function(event){
		var $cur = $(event.currentTarget);
		var attr = $(event.currentTarget).attr("name"),
			val = $(event.currentTarget).val();
		if (attr === "content"){
			this.model.set("content", val);
		} else if (attr === "public"){
			this.model.set("public", $cur.prop("checked"));
		} else if (attr == "font-size") {
			this.model.css(attr, val + "px");
		} else {
			this.model.css(attr, val);
		}
		return false;
	},
	align: function(event){
		var $button = $(event.currentTarget);
		this.model.align( $button.attr("name") );
		this.highlightAlignedButton();
	},
	highlightAlignedButton: function(){
		if (this.model.css("text-align")) {
			this.$(".alignment").removeClass("btn-primary");
			var $button = this.$("button[name='" + this.model.css("text-align") + "']");
			$button.addClass("btn-primary");
		}
	},
	newCaption: function(event){
		event.preventDefault();
		var caption = new App.Models.Caption({ meme: this.model }),
			top = this.model.width() ? this.model.height() / 2 : 250,
			left = this.model.width() ? this.model.width() / 2 : 250;
		
		caption.css({
			left: left + "px",
			top: top + "px"
		});
		this.model.captions().add(caption);
	}
});