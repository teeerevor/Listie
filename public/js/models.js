(function() {
  var Item = Backbone.Model.extend();
  
  var Items = Backbone.Collection.extend({
    model : Item,
    localStorage : new Store('list'),
    
    selected : function() {
      return this.filter(function(item) { return $(item.view.el).find(':input').is(':checked'); });
    },
    
    removeSelected : function() {
      _.each(Listie.newList.Items.selected(), function(item) { item.destroy(); });
    }    
  });
  
  List = Backbone.Model.extend({    
    initialize : function() {
      var self = this;
      if (!(self.get('articles'))) self.set({ 'items': [] }, { silent: true });
      _.bindAll(this, 'updateItems');
      self.Items = new Items;
      _.each(['refresh', 'add', 'remove'], function(e) { self.Items.bind(e, self.updateItems); });
    },
    
    url : function() { return this.isNew() ? '/lists' : '/lists/' + this.id; },
            
    updateItems : function() {
      this.set({ items : this.Items.map(function(item) { return item.get('name'); }) });
    }
  });  
})();