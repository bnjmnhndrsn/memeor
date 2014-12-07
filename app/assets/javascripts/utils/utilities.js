App.Utils.setBGImage = function(url){
	var val = url ? "url('" + url + "')" : "";
	if (val && !ResponsiveBootstrapToolkit.is('xs')) {
		var image = new Image();
		var timestamp = App.Utils.BGImageTimestamp = new Date();
		image.onload = function(){
			if (timestamp === App.Utils.BGImageTimestamp ){
				$("#bg-image").css("background-image", val);			
			}
		}
		image.src = url;
	}
	else {
		$("#bg-image").css("background-image", "");
	}
}