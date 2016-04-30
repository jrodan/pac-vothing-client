import React from 'react';
import Reflux from 'reflux';
import props from '../config.js';

import jquery from "jquery";
var $ = jquery;

var Survey = React.createClass({
  render: function() {
      return (
        <div className="survey">
        	{ this.props.survey.voteId } - 
        	{ this.props.survey.user } - 
        	{ this.props.survey.rating }<br/>
        </div>
      );
  }

});

module.exports = Survey;