import React from 'react';
import Reflux from 'reflux';

import AuthStore from '../../stores/AuthStore';
import Actions from '../../actions/Actions';

import props from '../../config.js';

import jquery from "jquery";
var $ = jquery;

var Survey = React.createClass({
  render() {
      return (
        <div className="survey">
        	{ this.props.survey.voteId } - 
        	{ this.props.survey.user } - 
        	{ this.props.survey.rating }<br/>
        </div>
      );
  }

});

module.exports = { Survey };