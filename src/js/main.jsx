import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Master from './pages/Master.jsx';
import Login from './components/Login.jsx';
import AuthStore from './stores/AuthStore';
import SurveyList from './components/SurveyList.jsx';
import SurveyEdit from './components/SurveyEdit.jsx';

var App = React.createClass({
  render: function() {
    return (<div>{this.props.children}</div>);
  }
});

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<Route component={Login} path="login"/>
	    	<IndexRoute component={Master} >
		    	<Route path="surveys-all" component={SurveyList}/>
				<Route path="surveys-latest" component={SurveyList}/>
				<Route path="survey-add" component={SurveyEdit}/>
	    	</IndexRoute>
	  	</Route>

  	</Router>
	,document.getElementById('app')
);

/*<Route path="*" component={ErrorPage}/>*/