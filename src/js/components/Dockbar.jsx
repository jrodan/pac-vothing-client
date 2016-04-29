import React from 'react';
import { browserHistory, Link } from 'react-router';
import Reflux from 'reflux';

import AuthStore from '../stores/AuthStore.js';
import Actions from '../actions/Actions.js';

var Dockbar = React.createClass({
	mixins: [
    Reflux.connect(AuthStore, Actions),
    Reflux.ListenerMixin
  ],
  componentWillMount () {
    this.setState(AuthStore.getState());
  },
  componentDidMount () {
    this.listenTo(AuthStore, this.onAuthChange);
  },
  onAuthChange(auth) {
    this.setState(auth);
  },
  handleLogout() {
  	Actions.logout();
  	this.setState();
  },
  render() {
  	return (
  		<nav className="navbar navbar-default dockbar">
  			<div className="container-fluid">
  			
	  			<div className="navbar-header">
			      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1" aria-expanded="false">
			        <span className="src-only">Toggle navigation</span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			      </button>
			      <a className="navbar-brand" href="#">Dockbar</a>
			    </div>
	  		
	  			<div className="collapse navbar-collapse" id="navbar-collapse-1">
	      			<ul className="nav navbar-nav">
	      				<li>
	      					<Link activeClassName="active" to="surveysall">Home</Link>
	      				</li>
	      				<li>
	      					<Link activeClassName="active" to="surveyslatest">Latest Surveys</Link>
	      				</li>
	      				<li>
	      					<Link activeClassName="active" to="surveyadd">Add Survey</Link>
	      				</li>
			        </ul>
			        
			        <ul className="nav navbar-nav navbar-right">
	      				<li>
	      					<p className="username navbar-text">{ this.state.user.forename }</p>
	      				</li>
	      				<li>
	      					<a href="#" onClick={ this.handleLogout.bind(this) } className="login">Log Out</a>
	      				</li>
			        </ul>
		        </div>
		     </div>
	    </nav>
    );
  }
});


module.exports = Dockbar;