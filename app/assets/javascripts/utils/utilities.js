App.Utils.setBGImage = function(url){
	var val = url ? "url('" + url + "')" : ""; 
	$("#bg-image").css("background-image", val);
}