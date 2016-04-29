import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

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
	    	<Route component={Master} >
	    		<IndexRoute component={SurveyList}/>
		    	<Route path="surveysall" component={SurveyList}/>
				<Route path="surveyslatest" component={SurveyList}/>
				<Route path="surveyadd" component={SurveyEdit}/>
	    	</Route>
	  	</Route>

  	</Router>
	,document.getElementById('app')
);

/*<Route path="*" component={ErrorPage}/>*/