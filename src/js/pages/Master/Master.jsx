import React from 'react';
import style from './style.scss';
import Dockbar from '../../components/Dockbar';

var Master = React.createClass({
  render () {
    return (
      <div className={ style.this }>
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
  }
});

module.exports = Master;