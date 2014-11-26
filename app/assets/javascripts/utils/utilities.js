App.Utils = {
	parseAttr: function(attr){
		attr = attr.replace(/\s/g, "");
		var split = attr.split(";"), 
			obj = {};
		
		split.forEach(function(pair){
			var keyValue = pair.split(":");
			if (keyValue[0] && keyValue[1]) {
				obj[ keyValue[0] ] = keyValue[1];	
			}
			
		});
		return obj;
		
	}
}