App.Utils.Canvasify = function(options){
	this._queue = [];
	this._delay = false;
	this.height = options.height;
	this.width = options.width;
	this.stage = new Kinetic.Stage({
		container: options.container,
        width: options.width,
        height: options.height
    });
};

App.Utils.Canvasify.prototype._clearQueue = function(){
	for (var i = 0; i < this._queue.length; i++){
		this._queue[i]();
	}
	this._queue = [];
};

App.Utils.Canvasify.prototype.addImage = function($image){
	this._delay = true;
	var imageObj = new Image();
	imageObj.crossOrigin = 'anonymous';
	var layer = new Kinetic.Layer();
    imageObj.onload = function(){
		var image = new Kinetic.Image({
			x: 0,
			y: 0,
			image: imageObj,
			width: this.stage.width(),
			height: this.stage.height()
		});
				
		layer.add(image);
		this.stage.add(layer);
		this._clearQueue();
		this._delay = false;
	}.bind(this);
	
	imageObj.src = $image.attr("src").split("?")[0];
};

App.Utils.Canvasify.prototype.addCaption = function($caption){
	var fn = function(){
		var layer = new Kinetic.Layer();
        var textInner = new Kinetic.Text({
			x:  +$caption.css('left').replace("px",""),
			y: +$caption.css('top').replace("px",""),
			text: $caption.find('.inner').text(),
			fontSize: $caption.css("font-size").replace("px",""),
			fontFamily: $caption.css("font-family"),
			fill: $caption.css("color"),
			width: $caption.width() + 2,
			padding: 10,
			align: $caption.css('text-align')
        });
		
        var textOuter = new Kinetic.Text({
			x:  +$caption.css('left').replace("px",""),
			y: +$caption.css('top').replace("px",""),
			text: $caption.find('.inner').text(),
			fontSize: $caption.css("font-size").replace("px",""),
			fontFamily: $caption.css("font-family"),
			stroke: "black",
			width: $caption.width() + 2,
			padding: 10,
			strokeWidth: 5,
			lineJoin:'round',
			align: $caption.css('text-align')
        });
		
		layer.add(textOuter);
		layer.add(textInner);
		this.stage.add(layer);
	}.bind(this);
	
	if (this._delay) {
		this._queue.push(fn);
	} else {
		fn();
	}
};

App.Utils.Canvasify.prototype.toDataUrl = function(callback){
	var fn = function(){
		this.stage.toDataURL({
			callback: callback
		});
	}.bind(this);
	
	if (this._delay) {
		this._queue.push(fn);
	} else {
		fn();
	}
};