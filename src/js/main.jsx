import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Master from './pages/Master';
import Login from './pages/Login';
import AuthStore from './stores/AuthStore';

import SurveyList from './components/Survey';
import SurveyEdit from './components/Survey';
import LoginRequired from './util/RouteHelpers';

var App = React.createClass({
  render: function() {
    return (<div>{this.props.children}</div>);
  }
});

function requireAuth(nextState, replace) {
  if(!AuthStore.loggedIn()){
    replace({
      pathname: 'login',
      state: { nextPathname: nextState.location.pathname }
    })
  } 
}

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<Route component={Login} path="login"/>
		    	<IndexRoute component={Master} onEnter={requireAuth}>
			    	<Route path="surveys-all" component={SurveyList}/>
			    	<Route path="surveys-latest" component={SurveyList}/>
			    	<Route path="survey-add" component={SurveyEdit}/>
		    	</IndexRoute>
	  	</Route>
  	</Router>
	,document.getElementById('app')
);