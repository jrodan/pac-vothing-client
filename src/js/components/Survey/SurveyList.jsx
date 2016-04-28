import React from 'react';
import Reflux from 'reflux';

import AuthStore from '../../stores/AuthStore';
import Actions from '../../actions/Actions';
import Survey from './Survey.jsx';

import props from '../../config.js';

import jquery from "jquery";
var $ = jquery;

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
			task = props.path.surveylist;
		}
		
		/* TODO check if submitData is set */
		
		var caller = this;
		
		var loadRequest = $.ajax({
		    type: 'GET',
		    url: task,
		    contentType: "application/json",
		    beforeSend: function (request)
            {
                request.setRequestHeader("Vothing-Token", jwt);
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
			rows.push(""+<Survey survey={surveys[i]} key={surveys[i].voteId}/>);
		}
      return (
	      <div className="surveys">
	        <div>{rows}</div>
	      </div>
	    );
  }
});

module.exports = { SurveyList };