import React from 'react';
import Reflux from 'reflux';
import props from '../config.js';

import jquery from "jquery";
var $ = jquery;
import { Clearfix, Button, Panel, DropdownButton, MenuItem } from 'react-bootstrap';

var Survey = React.createClass({
  getInitialState: function() {
    return {
      id: this.props.survey.id || 0,
      name: this.props.survey.name || '',
      options: [],
      createDate: this.props.survey.createDate || '',
      modifiedDate: this.props.survey.modifiedDate || '',
      author: this.props.survey.user.foreName + ' ' + this.props.survey.user.name || '',
      row: this.props.row || 0
    };
  },
  render: function() {
  	  var marker = this.state.row % 2 == 0 ? "info" : "default";

      return (
        <div className="survey">
        	<Panel header={ this.state.name } bsStyle={marker}>
     			
     			{ console.log(this.props.survey)  }
	        	
	        	Author: { this.state.name } - Create Date: { this.state.createDate } - Modified Date: { this.state.modifiedDate }

	        	<DropdownButton bsStyle={marker} title='Actions' id={this.state.row} >
			      <MenuItem eventKey="1">Edit</MenuItem>
			      <MenuItem eventKey="2">Delete</MenuItem>
			    </DropdownButton>

        	</Panel>

        </div>
      );
  }

});

module.exports = Survey;