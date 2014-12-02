/**
 * CanvasRenderingContext2D.renderText extension
 */
if (CanvasRenderingContext2D && !CanvasRenderingContext2D.strokeAndFillText) {
    // @param  letterSpacing  {float}  CSS letter-spacing property
    CanvasRenderingContext2D.prototype.strokeAndFillText = function (text, x, y, letterSpacing) {
        if (!text || typeof text !== 'string' || text.length === 0) {
            return;
        }
        
        if (typeof letterSpacing === 'undefined') {
            letterSpacing = 0;
        }
        
        // letterSpacing of 0 means normal letter-spacing
        
        var characters = String.prototype.split.call(text, ''),
            index = 0,
            current,
            currentPosition = x,
            align = 1;
        
        if (this.textAlign === 'right') {
            characters = characters.reverse();
            align = -1;
        } else if (this.textAlign === 'center') {
            var totalWidth = 0;
            for (var i = 0; i < characters.length; i++) {
                totalWidth += (this.measureText(characters[i]).width + letterSpacing);
            }
            currentPosition = x - (totalWidth / 2);
        }
        
        while (index < text.length) {
            current = characters[index++];
			this.strokeText(current, currentPosition, y);
            this.fillText(current, currentPosition, y);
            currentPosition += (align * (this.measureText(current).width + letterSpacing));
        }
    }
}


App.Views.MemeShow = Backbone.View.extend({
	className: "meme",
	template: JST['memes/show'],
	initialize: function(){
		this.captionViews = [];
		this.selected = null;
		this.listenTo(this.model, "change:image", this.addImageView);
		this.listenTo(this.model, "change", this.update);
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.model.captions(), "add", this.addCaptionView);
		this.listenTo(this.model.captions(), "remove", this.removeCaptionView);
	},
	render: function(){
		this.$el.css( this.model.css() );
		this.addImageView();
		this.addCaptionViews();
		this.model.width( this.$el.width );
		return this;
	},
	update: function(){
		this.$el.css( this.model.css() );
	},
	addImageView: function(){
		this.imageView && this.imageView.remove();
		this.imageView = new App.Views.ImageShow({ model: this.model.image() });
		this.$el.append( this.imageView.render().$el );
	},
	addCaptionViews: function(){
		this.removeCaptionViews();
		this.model.captions().each(function(caption){
			this.addCaptionView(caption);
		}.bind(this));
	},
	removeCaptionView: function(caption){
		var view = _.find(this.captionViews, function(view){
			return caption.cid === view.model.cid;
		});
		view.remove();
		this.captionViews.splice( this.captionViews.indexOf(view), 1 );
	},
	removeCaptionViews: function(){
		if (this.captionViews){
			this.captionViews.forEach(function(captionView){
				captionView.remove();
			})
			this.captionViews = [];
		}
	},
	addCaptionView: function(caption){
		var view = new App.Views.CaptionShow({ model: caption });
		this.captionViews.push(view);
		this.$el.append( view.render().$el );
	},
	save: function(callback){
		var success = function(){
			App.Collections.memes.add(this.model);
			if (callback){
				callback();
			} else {
				Backbone.history.navigate("/memes/" + this.model.id + "/edit");
			}
				
		}.bind(this);
		var canvasify = new App.Utils.Canvasify({
			container: "meme-canvas",
	        width: this.model.width(),
	        height: this.model.height()
		});
		
		canvasify.addImage
	    var stage = new Kinetic.Stage({
			
	         });
	         var layer = new Kinetic.Layer();

			 var $el = $(".caption");

			var $image = $(".image img");
			var imageObj = new Image();
		    imageObj.onload = function(){
				var image = new Kinetic.Image({
				          x: 0,
				          y: 0,
				          image: imageObj,
				          width: stage.width(),
					height: stage.height()
				        });
						
					 layer.add(image);
						
						
			         var complexText = new Kinetic.Text({
			           x:  +$el.css('left').replace("px","") + 10,
			           y: +$el.css('top').replace("px","") + 10,
			           text: $el.find('.inner').text(),
						 fontSize: $el.css("font-size").replace("px",""),
			           fontFamily: $el.css("font-family"),
						 stroke: "black",
			           fill: $el.css("color"),
			           width: $el.width(),
			           padding: 0,
						strokeWidth: 2,
			           align: $el.css('text-align')
			         });

	        		layer.add(complexText);
	         		stage.add(layer);
				    stage.toDataURL({
				             callback: function(dataUrl) {
				               /*
				                * here you can do anything you like with the data url.
				                * In this tutorial we'll just open the url with the browser
				                * so that you can see the result as an image
				                */
				               window.open(dataUrl);
						   }
					 });
			};
			imageObj.src = $image.attr("src");
			
		// var that = this;
	//
	// 	var canvas = document.createElement("CANVAS");
	// 	canvas.width = this.model.width();
	// 	canvas.height = this.model.height();
	//
	// 	var context = canvas.getContext('2d');
	// 	var $image = $(".image img");
	//
	//
	// 	var imageObj = new Image();
	//     imageObj.onload = function(){
	//          context.drawImage(imageObj, 0, 0);
	//
	//  		$(".caption").each(function(i, el){
	//
	// 			var $el = $(el),
	// 				x = +$el.css('left').replace("px","") + 10,
	// 				y = +$el.css('top').replace("px","") + 10,
	// 				text = $el.find('.inner').text();
	// 			context.textBaseline = "top";
	//  			context.font = $el.css('font');
	//  			context.lineWidth = 3;
	//  		    context.strokeStyle = 'black';
	// 			context.fillStyle = 'white';
	// 			context.strokeAndFillText(text, x, y, 1);
	// 			var image = canvas.toDataURL("image/png");
	//
	// 			that.model.save({ cached_image: image}, {
	// 				success: success
	// 			});
	//
	//  		});
	// 	};
	// 	imageObj.src = $image.attr("src");
		

	
	}
});