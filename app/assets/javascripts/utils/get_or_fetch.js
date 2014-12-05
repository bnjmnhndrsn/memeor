Backbone.Collection = Backbone.Collection.extend({
	getOrFetch: function(id){
		var model, collection = this;
		
		if (model = this.get(id)){
			model.fetch();
		} else {
			model = new this.model({id: id});
			model.fetch({
				success: function(){
					if (model.get("public")){
						collection.add(model);	
					}
					
				}
			});
		}
		
		return model;
	}
});