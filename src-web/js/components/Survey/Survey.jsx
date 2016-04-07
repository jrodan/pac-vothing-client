import React from 'react';
import Router from 'react-router';
import Reflux from 'reflux';

import AuthStore from '../../stores/AuthStore';
import AuthActions from '../../actions/AuthActions';

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

module.exports = Survey;

var SurveyList = React.createClass({
	
	getInitialState : function() {
	    return {
	      surveys : {}
	    };
	  },
  
	componentDidMount: function() {
	  this.loadSurveys();
	},
	
	loadSurveys: function(task, submitData) {
		
		var jwt = AuthStore.getJwt();
		
		if(!jwt){
			return;
		}
			
		if(!task || task == "") {
			task = props.path.voteslist;
		}
		
		// TODO check if submitData is set
		
		var caller = this;
		
		var loadRequest = $.ajax({
		    type: 'GET',
		    url: task,
		    contentType: "application/json",
		    headers: {
		    	"votToken": jwt  
		    },
		    data: JSON.stringify(submitData),
		    dataType: "json"
		  });
		  
		  loadRequest.done(function(response, textStatus, jqXHR) {
		  	var surveysResponse = JSON.parse(jqXHR.responseText);
		  	if(surveysResponse) {
		  		caller.setState({
		  			surveys: surveysResponse
		  		});
		  	}
		  });
		  
		  loadRequest.fail(function(jqXHR, textStatus) {
		  	console.log("fail: "+jqXHR.status);
		  	//caller.error = true;
		  });
	  
	  },
  
  render: function() {
  		var rows = [];
		var surveys = this.state.surveys;

		for (var i = 0; i < surveys.length; i++) {
			rows.push(<Survey survey={surveys[i]} key={surveys[i].voteId}/>);
		}
      return (
	      <div className="surveys">
	        <div>{rows}</div>
	      </div>
	    );
  }
});


module.exports = SurveyList;