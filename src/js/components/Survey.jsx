import React from 'react';
import Reflux from 'reflux';
import props from '../config.js';

import PermissionHelper from '../util/PermissionHelper.js';

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
      row: this.props.row || 0,
      hasEditPermission: PermissionHelper.hasUserEditSurveyPermission(this.props.survey),
      hasDeletePermission: PermissionHelper.hasUserDeleteSurveyPermission(this.props.survey)
    };
  },
  render: function() {
  	  var marker = this.state.row % 2 == 0 ? "info" : "default";
      var actions = '';
      var editButton = '';
      var deleteButton = '';

      if(this.state.hasEditPermission) {
        editButton = <MenuItem eventKey="1">Edit</MenuItem>;
      }
      if(this.state.hasDeletePermission) {
        deleteButton = <MenuItem eventKey="2">Delete</MenuItem>;
      }

      if(this.state.hasEditPermission || this.state.hasDeletePermission) {
        actions = (
            <DropdownButton bsStyle={marker} title='Actions' id={this.state.row} >
               {editButton} 
               {deleteButton}
            </DropdownButton>
          );
      }

      return (
        <div className="survey">
        	<Panel header={ this.state.name } bsStyle={marker}>
     			
          { console.log(this.props.survey)  }
	        	
	        	Author: { this.state.author } - Create Date: { this.state.createDate } - Modified Date: { this.state.modifiedDate }

            { actions }
	        
        	</Panel>

        </div>
      );
  }

});

module.exports = Survey;