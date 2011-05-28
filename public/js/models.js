(function() {
  var Item = Backbone.Model.extend();
  
  List = Backbone.Collection.extend({
    localStorage : new Store('list'),
    url   : '/lists',
    model : Item,
    
    selected : function() {
      return this.filter(function(item) { return $(item.view.el).find(':input').is(':checked'); });
    },
    
    removeSelected : function() {
      _.each(Listie.newList.selected(), function(item) { item.destroy(); });
    }
  });  
})();