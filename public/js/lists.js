(function() {
  var CheckBoxListView = Backbone.View.extend({
    tagName   : 'li',
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
    }
  });

  var ItemView = CheckBoxListView.extend({
    template  : _.template($('#list-item-template').html()),
    
    check : function() {
      Listie.Creator.calculateSelected();
    }
  });

  var ListView = CheckBoxListView.extend({
    template  : _.template($('#list-template').html()),    

    check : $.noop
  });

  Browser = Backbone.View.extend({
    el    : $('#browse'),
    list  : $('#browse ul'),
    initialize : function() {
      _.bindAll(this, 'add', 'addAll');
      Listie.Lists.bind('add',      this.add);
      Listie.Lists.bind('reset',    this.addAll);
    },

    add : function(list) {
      var view = new ListView({ model : list });
      this.list.append(view.render().el);
      return this;
    },

    addAll : function() {
      Listie.Lists.each(this.add);
    }
  });

  Creator = Backbone.View.extend({
    el      : $('#list'),
    list    : $('#items'),
    events  : {
      'submit form'         : 'create',
      'click #new-list'     : 'newList',
      'click #delete-items' : 'removeSelected',
      'click #save-list'    : 'saveToServer'
    },

    initialize : function() {
      _.bindAll(this, 'add', 'addAll', 'open', 'calculateSelected', 'removeSelected');
    },
    
    open : function(list) {
      if (list === 'new') {
        var newList = new List;
        Listie.currentList = newList;
      } else {
        if (Listie.currentList) Listie.currentList.Items.unbind('all');
        Listie.currentList = list;        
      }
      Listie.currentList.Items.bind('add',      this.add);
      Listie.currentList.Items.bind('add',      this.calculateSelected);      
      Listie.currentList.Items.bind('reset',    this.addAll);
      Listie.currentList.Items.bind('remove',   this.calculateSelected);      
      Listie.currentList.Items.reset(_.map(Listie.currentList.get('items'), function(name) { return { name : name }; }));      
    },

    add : function(item) {
      this.list.find('li.empty').remove();
      var li = new ItemView({ model: item });
      this.list.append(li.render().el);
      return this;
    },

    addAll : function() {
      this.list.empty();
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
      total ? button.text('Delete (' + total + ')') && button.removeAttr('disabled') : 
        button.text('Delete') && button.attr('disabled', 'disabled');
    },

    removeSelected : function() {
      Listie.currentList.Items.removeSelected();
    },
    
    newList : function() {
      location.hash = '!/';
    },

    saveToServer : function() {
      Listie.currentList.save(
        { }, // Save whatever attributes we've set() before
        {
          success : function(model) { Listie.Lists.add(model); location.hash = '!/lists/' + model.get('id'); },
          error   : function(attrs, response) { if (response.status === 401) location.hash = '!/account';
        }
      });
    }
  });
})();