(function() {
  Router = Backbone.Controller.extend({
    routes : {
      ''            : 'currentList',
      '!/'          : 'currentList',
      '!/browse'    : 'browse',
      '!/account'   : 'account',
      '!/lists/:id' : 'show'
    },
    
    currentList : function() {
      $('section.current').removeClass('current');
      _.delay(function() { Listie.Creator.el.addClass('current'); }, 250);
    },
    
    browse : function() {
      $('section.current').removeClass('current');
      _.delay(function() { Listie.Browser.el.addClass('current'); }, 250);
    },
    
    account : function() {
      $('section.current').removeClass('current');
      _.delay(function() { Listie.Account.el.addClass('current'); }, 250);
    },
    
    show : function(id) {
      var list = Listie.Lists.get(id)
      Listie.currentList.set(list.attributes) // So we don't lose bindings
    }
  });
})();