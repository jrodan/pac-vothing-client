import React from 'react';
import Reflux from 'reflux';

import AuthStore from '../stores/AuthStore.js';
import Actions from '../actions/Actions.js';

import props from '../config.js';

import jquery from "jquery";
var $ = jquery;

var SurveyEdit = React.createClass({
  /*getInitialState: function() {
    return {name: ''};
  },
  handleAuthorChange: function(e) {
    this.setState({name: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },*/
  handleSubmit: function(e) {
    /*e.preventDefault();
    var name = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    // TODO: send request to the server
    this.setState({author: '', text: ''});
    */
  },
  render: function() {
      return (
        <div className="surveyedit">
        	<form onSubmit={this.handleSubmit}>
        		<input name="name" type="text" value="" value={this.state.name}/>
        		<input name="add" type="submit"/>
        	</form>
        </div>
      );
  }
  
});

module.exports = { SurveyEdit };