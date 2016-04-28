import React from 'react';

import AuthStore from '../stores/AuthStore';

var LoginRequired = React.createClass({
  statics: {
    willTransitionTo: function (transition, params, query, callback) {
      if(!AuthStore.loggedIn()){
        // go over to login page
        //transition.redirect('login', null, { redirect: transition.path });
        //transition.redirect('/login', {}, { 'nextPath': transition.path });
        transition.redirect('login');
      }
      callback();
    }
  },
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

module.exports = { LoginRequired };