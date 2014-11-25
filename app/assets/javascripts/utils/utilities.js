App.Utils = {
	parseAttr: function(attr){
		var split = attr.split(";"), 
			obj = {};
		
		split.forEach(function(pair){
			var keyValue = pair.split(":");
			obj[ keyValue[0] ] = keyValue[1];
		});
		
		return obj;
	}
}