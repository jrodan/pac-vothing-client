var React = require('react');
import Router from 'react-router';
var Route = Router.Route;
var Redirect = Router.Redirect;
var DefaultRoute = Router.DefaultRoute;

import Master from './pages/Master';
import Home from './pages/Home';
import Login from './pages/Login';

import SurveyList from './components/Survey';
import { LoginRequired } from './util/RouteHelpers';

module.exports = (
  <Route path="/">
    <Route handler={Login} path="login" name="Login"/>
    <Route handler={LoginRequired}>
    	<Route name="SurveyList" path="/allsurveys" handler={SurveyList}/>
      /*<Route handler={Master}>
        <DefaultRoute handler={Home} name="Home"/>
      </Route>*/
    </Route>
  </Route>
);