(function() {
  var Item = Backbone.Model.extend({
    quack : function() { console.log('quack')}
  });
  
  Items = Backbone.Collection.extend({
    model : Item,
    localStorage : new Store('list'),
    
    selected : function() {
      return this.filter(function(item) { return $(item.view.el).find(':input').is(':checked'); });
    },
    
    removeSelected : function() {
      _.each(Listie.currentList.Items.selected(), function(item) { item.destroy(); });
    }
  });
  
  List = Backbone.Model.extend({    
    initialize : function() {
      var self = this;
      if (!(self.get('items'))) self.set({ 'items': [] }, { silent: true });
      _.bindAll(self, 'updateItems');
      self.Items = new Items;
      self.Items.bind('reset',  self.updateItems);
      self.Items.bind('add',    self.updateItems);        
      self.Items.bind('remove', self.updateItems);        
    },
    
    url : function() { return this.isNew() ? '/lists' : '/lists/' + this.id; },
            
    updateItems : function() {
      this.set({ items : this.Items.map(function(item) { return item.get('name'); }) });
    }
  }); 
  
  Lists = Backbone.Collection.extend({ 
    url : '/lists',
    
    initialize : function() {
      var self = this;
      Listie.User.bind('change:lists', function(user, lists) { self.reset(lists); });
    }
  });
})();