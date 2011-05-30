(function() {
  User = Backbone.Model.extend({
    url : '/users',
    
    signIn : function(name) {
      var self = this;
      $.ajax({
        url       : '/sign-in',
        type      : 'post',
        data      : { name: name },
        dataType  : 'json',
        success   : function(attributes) {
          self.set(attributes);
          self.trigger('signin:success');
        }
      });
    },
    
    signOut : function() {
      var self = this;
      $.ajax({
        url       : '/sign-out',
        type      : 'get',
        dataType  : 'json',
        success   : function() {
          self.set({ id: undefined, name: undefined, lists: [] });
          self.trigger('signout:success');
        }
      });      
    }
  });
  
  
  AccountManager = Backbone.View.extend({
    el      : $('#account'),
    events  : {
      'submit form:first' : 'signIn',
      'submit form:last'  : 'signUp'
    },
    
    initialize : function() {
      Listie.User.bind('signin:success',  function() { location.hash = '!/'; });
      Listie.User.bind('signout:success', function() { location.hash = '!/'; });      
    },
    
    signIn : function(event) {
      event.preventDefault();
      Listie.User.signIn(this.el.find('#sign-in :text').val());
    },
    
    signUp : function(event) {
      event.preventDefault();
      Listie.User.save(
        { name : this.el.find('#sign-up :text').val() },
        { success: function() { Listie.User.trigger('signin:success'); } }
      );
    }
  });
})();