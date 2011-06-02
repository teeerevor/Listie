(function() {
  Router = Backbone.Router.extend({
    routes : {
      ''            : 'newList',      
      '/'           : 'newList',
      '/browse'     : 'browse',
      '/account'    : 'account',
      '/lists/:id'  : 'show',
      '/sign-out'   : 'signOut'
    },
    
    newList : function() {
      Listie.Creator.open('new');
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
      var list = Listie.Lists.get(id);
      console.log('opening ' + id + ' and got : ' + list);
      Listie.Creator.open(list);
      $('section.current').removeClass('current');
      return _.delay(function() { Listie.Creator.el.addClass('current'); }, 250);      
    },
    
    signOut : function() {
      Listie.User.signOut();
    }
  });
})();