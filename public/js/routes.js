(function() {
  Router = Backbone.Controller.extend({
    routes : {
      ''          : 'newList',
      '!/'        : 'newList',
      '!/browse'  : 'browse',
      '!/account' : 'account'
    },
    
    newList : function() {
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
    }
  });
})();