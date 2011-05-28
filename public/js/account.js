(function() {
  AccountManager = Backbone.View.extend({
    el      : $('#account'),
    events  : {
      'submit form:first' : 'signIn',
      'submit form:last'  : 'signUp'
    },
    
    signIn : function(event) {
      
    },
    
    signUp : function(event) {
      event.preventDefault();
      var self = this;
      $.ajax({
        url       : '/users',
        type      : 'post',
        data      : { name: self.el.find('#sign-up :text').val() },
        dataType  : 'json',
        success   : function(attributes) {
          location.hash = '!/';
        }
      })
    }
  });
})();