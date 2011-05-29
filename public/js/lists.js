(function() {
  var ListView = Backbone.View.extend({
    tagName   : 'li',
    template  : _.template($('#list-item-template').html()),
    events  : {
      'click input' : 'check'
    },
    
    initialize : function() {
      _.bindAll(this, 'remove');
      this.model.bind('remove', this.remove);
      this.model.view = this;
    },
    
    render : function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },
        
    check : function() {
      Listie.Creator.calculateSelected();
    }
  });
  
  Creator = Backbone.View.extend({
    el      : $('#new'),
    list    : $('#items'),
    events  : {
      'submit form'         : 'create',
      'click #delete-items' : 'removeSelected',
      'click #save-list'    : 'saveToServer'
    },
    
    initialize : function() {
      _.bindAll(this, 'add', 'addAll', 'calculateSelected');
      Listie.currentList.Items.bind('add',      this.add);
      Listie.currentList.Items.bind('refresh',  this.addAll);
      Listie.currentList.Items.fetch();
    },
    
    add : function(item) {
      this.list.find('li.empty').remove();
      var li = new ListView({ model: item });
      this.list.append(li.render().el);
      return this;
    },
    
    addAll : function() {
      Listie.currentList.Items.each(this.add);
    },
    
    create : function(event) {
      event.preventDefault();
      var field = this.el.find(':text');
      Listie.currentList.Items.create({ name : field.val() });
      field.val('').focus();
    },
    
    calculateSelected : function() {
      var total = Listie.currentList.Items.selected().length,
        button = this.el.find('#delete-items');
      total ? button.text('Delete (' + total + ')') && button.removeAttr('disabled') : button.text('Delete') && button.attr('disabled', 'disabled');
    },
    
    removeSelected : function() {
      Listie.currentList.Items.removeSelected();
    },
    
    saveToServer : function() {
      Listie.currentList.save();
    }
  });
})();