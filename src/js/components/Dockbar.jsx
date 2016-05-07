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
  handleLogout(event) {
  	Actions.logout();
  	//this.setState();
  	this.forceUpdate();
  },
  render() {
  	return (
  		<nav className="navbar navbar-default dockbar">
  			<div className="container-fluid">
  			
	  			<div className="collapse navbar-collapse" id="navbar-collapse-1">
	      			<ul className="nav navbar-nav">
	      				<li>
	      					<img style={{maxWidth : '50px'}} src="img/vothing-small.png"/>
	      				</li>
	      				<li>
	      					<Link activeClassName="active" to="survey/list">Home</Link>
	      				</li>
	      				<li>
	      					<Link activeClassName="active" to="survey/list/latest">Latest Surveys</Link>
	      				</li>
	      				<li>
	      					<Link activeClassName="active" to="survey/add">Add Survey</Link>
	      				</li>
			        </ul>
			        
			        <ul className="nav navbar-nav navbar-right">
	      				<li>
	      					<p className="username navbar-text">{ this.state.user.forename }</p>
	      				</li>
	      				<li>
	      					<a href="#" onClick={ this.handleLogout.bind(null,this) } className="login">logout</a>
	      				</li>
			        </ul>
		        </div>
		     </div>
	    </nav>
    );
  }
});


module.exports = Dockbar;