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
	      					<Link to="surveys-all">Home</Link>
	      				</li>
	      				<li>
	      					<Link to="surveys-latest">Latest Surveys</Link>
	      				</li>
	      				<li>
	      					<Link to="survey-add">Add Survey</Link>
	      				</li>
			        </ul>
			        
			        <ul className="nav navbar-nav navbar-right">
	      				<li>
	      					<p className="username navbar-text">{ this.state.user.forename }</p>
	      				</li>
	      				<li>
	      					<a href="#" onClick={ Actions.logout() } className="login">Log Out</a>
	      				</li>
			        </ul>
		        </div>
		     </div>
	    </nav>
    );
  }
});


module.exports = Dockbar;