import React from 'react';
import Reflux from 'reflux';
import Dockbar from '../components/Dockbar.jsx';
import AuthStore from '../stores/AuthStore.js';
import Login from '../components/Login.jsx';

var Master = React.createClass({
  mixins: [Reflux.ListenerMixin],
  onStatusChange: function(status) {
      this.setState({
          currentStatus: status
      });
  },
  componentDidMount: function() {
      this.listenTo(AuthStore, this.onStatusChange);
  },
  render () {
    if(AuthStore.loggedIn()){
      return (
        <div>
          <Dockbar />
          <div className="container">
            <div className="content row">
              <div className="col-sm-4 col-lg-12 col-md-6">
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="">
          <Login />
        </div>
      );
    }
  }

});

module.exports = Master;