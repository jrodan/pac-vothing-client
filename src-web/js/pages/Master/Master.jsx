import React from 'react';
import Router from 'react-router';
import style from './style.scss';

//import AuthStatus from '../../components/AuthStatus';
import Dockbar from '../../components/Dockbar';

var RouteHandler = Router.RouteHandler;

var Master = React.createClass({
  render () {
    return (
      <div className={ style.this }>
        <Dockbar />
        <div className="container">
	        <div className="content row">
		        <div className="col-sm-4 col-lg-12 col-md-6">
		        	<RouteHandler/>
		        </div>
		    </div>
		 </div>
      </div>
    );
  }
});

module.exports = Master;