App.Utils.Canvasify = function(options){
	this._queue = [];
	this._delay = false;
	this.height = height;
	this.width = width;
	this.stage = new Kinetic.Stage({
		options.container: container
        options.width: this.model.width(),
        options.height: this.model.height()
    });
};

App.Utils.Canvasify.prototype._clearQueue = function(){
	for (var i = 0; i < this.queue.length; i++){
		this._queue[i]();
	}
};

App.Utils.Canvasify.prototype.addImage = function($image){
	this._delay = true;
	var imageObj = new Image();
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
};

App.Utils.Canvasify.prototype.addCaption = function($caption){
	var fn = function(){
		var layer = new Kinetic.Layer();
        var complexText = new Kinetic.Text({
			x:  +$caption.css('left').replace("px","") + 10,
			y: +$caption.css('top').replace("px","") + 10,
			text: $caption.find('.inner').text(),
			fontSize: $caption.css("font-size").replace("px",""),
			fontFamily: $caption.css("font-family"),
			stroke: "black",
			fill: $caption.css("color"),
			width: $caption.width(),
			padding: 0,
			strokeWidth: 2,
			align: $caption.css('text-align')
        });
		
		layer.add(complexText);
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
		this.stage.toDataUrl({
			callback: callback
		});
	}.bind(this);
	
	if (this._delay) {
		this._queue.push(fn);
	} else {
		fn();
	}
};