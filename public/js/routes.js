(function() {
  Router = Backbone.Controller.extend({
    routes : {
      ''            : 'currentList',
      '!/'          : 'currentList',
      '!/browse'    : 'browse',
      '!/account'   : 'account',
      '!/lists/:id' : 'show',
      '!/sign-out'  : 'signOut'
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
      // if (id === Listie.currentList.get('id')) return false;
      var list = Listie.Lists.get(id);
      return Listie.currentList.set(list.attributes); // So we don't lose event bindings
    },
    
    signOut : function() {
      Listie.User.signOut();
    }
  });
})();