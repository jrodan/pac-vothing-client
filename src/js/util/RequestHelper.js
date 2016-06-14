import React from 'react';
import props from '../config.js';
import AuthStore from '../stores/AuthStore.js';
import jquery from "jquery";
// import Router from "react-router";
// import SurveyStore from "../stores/SurveyStore.js";
// import Actions from '../actions/Actions';
// import Reflux from 'reflux';
var $ = jquery;

var RequestHelper = React.createClass({
    // mixins: [
    //     Reflux.connect(SurveyStore, Actions),
    //     Reflux.ListenerMixin
    // ],
    statics: {
        convertResponseToSurvey: function(response) {
            var survey = '';
            var responseParsed = null;
            try {
                responseParsed = JSON.parse(response);
            } catch(e) {
                // TODO 
            }
            if (response && responseParsed) {
                    survey = responseParsed;
                }
            return survey;
        },
        convertResponseToSurveys: function(response) {
            var surveys = [];
            var responseParsed = null;
            try {
                responseParsed = JSON.parse(response);
            } catch(e) {
                // TODO 
            }
            if (response && responseParsed) {
                    surveys = responseParsed;
                }
            return surveys;
        },
        getSurvey: function (caller, id) {

            var jwt = AuthStore.getJwt();

            if (!jwt || id == 0) {
                return;
            }

            var loadRequest = $.ajax({
                type: 'GET',
                url: props.path.surveyget + "/" + id,
                contentType: "application/json",
                beforeSend: function (request) {
                    request.setRequestHeader("Vothing-Token", jwt);
                },
                dataType: "json"
            });

            var localCaller = this;

            loadRequest.done(function (response, textStatus, jqXHR) {
                caller.setSurvey(localCaller.convertResponseToSurvey(jqXHR.responseText));
            });

            loadRequest.fail(function (jqXHR, textStatus) {
                console.log("fail: " + jqXHR.status);
                var error = "There is a general error with the Server. Please contact an Administrator.";
                if(jqXHR.status == 403) {
                    error = "You have no permission to access the Survey List. Please contact an Administrator.";
                }
                caller.setSurvey(localCaller.convertResponseToSurvey(jqXHR.responseText), error); // TODO 
                //caller.error = true;
            });

        },
        getSurveys: function (caller, task, submitData) {
            var jwt = AuthStore.getJwt();

            if (!jwt) {
                return;
            }

            if (!task || task == "") {
                task = props.path.surveylist;
            }

            /* TODO check if submitData is set */

            var loadRequest = $.ajax({
                type: 'GET',
                url: task,
                contentType: "application/json",
                beforeSend: function (request) {
                    request.setRequestHeader("Vothing-Token", jwt);
                },
                data: JSON.stringify(submitData),
                dataType: "json"
            });

            var localCaller = this;

            loadRequest.done(function (response, textStatus, jqXHR) {
                caller.setSurveys(localCaller.convertResponseToSurveys(jqXHR.responseText));
            });

            loadRequest.fail(function (jqXHR, textStatus) {
                console.log("fail: " + jqXHR.status);
                var error = "There is a general error with the Server. Please contact an Administrator.";
                if(jqXHR.status == 403) {
                    error = "You have no permission to access the Survey List. Please contact an Administrator.";
                }
                caller.setSurveys(localCaller.convertResponseToSurveys(jqXHR.responseText), error); // TODO 
                //caller.error = true;
            });
        },
        addSurvey: function (caller, submitData) {
            this.updateSurvey(caller, submitData, true);    
        },
        updateSurvey: function (caller, submitData) {
            this.updateSurvey(caller, submitData, false);    
        },
        deleteSurvey: function (caller, surveyId) {
            var jwt = AuthStore.getJwt();

            if (!jwt) {
                return;
            }

            var url = props.path.surveydelete;

            /* TODO check if submitData is set */

            var loadRequest = $.ajax({
                type: 'PUT',
                url: url + "/"+surveyId,
                contentType: "application/json",
                beforeSend: function (request) {
                    request.setRequestHeader("Vothing-Token", jwt);
                },
                dataType: "json"
            });

            var localCaller = this;

            loadRequest.done(function (response, textStatus, jqXHR) {
                //caller.setSurvey(null, "", "Survey was successfully deleted."); // TODO 
                // Router.push("#/survey/add"); // TODO pass state
                caller.setDeleteResult(null, true);
            });

            loadRequest.fail(function (jqXHR, textStatus) {
                //console.log("fail: " + jqXHR.status);
                //caller.error = true;
                //caller.setSurvey(null, "Survey with surveyId "+surveyId+" could not be deleted."); // TODO 
                caller.setDeleteResult(surveyId, false);
            });
            //this.updateSurvey(caller, submitData, true);    
        },
        addSurveyOptionVote: function (caller, surveyOptionId) {
            var jwt = AuthStore.getJwt();

            if (!jwt) {
                return;
            }

            var url = props.path.surveyoptionvoteadd;

            /* TODO check if submitData is set */

            // TODO 
            // Actions.surveyOptionAdded();
            // Actions.surveyOptionAdded.completed();

            var localCaller = this;

            var loadRequest = $.ajax({
                type: 'GET',
                url: url + "/" + surveyOptionId,
                contentType: "application/json",
                beforeSend: function (request) {
                    request.setRequestHeader("Vothing-Token", jwt);
                },
                dataType: "json"
            });

            // TODO call reflux action and not caller method
            loadRequest.done(function (response, textStatus, jqXHR) {
                caller.setSurvey(localCaller.convertResponseToSurvey(jqXHR.responseText), "Vote was successfully counted", ""); // TODO 
            });

            loadRequest.fail(function (jqXHR, textStatus) {
                caller.setSurvey(localCaller.convertResponseToSurvey(jqXHR.responseText), "", "Vote could not be counted due to an internal Server Problem."); // TODO 
            });
        },
        updateSurvey: function (caller, submitData, addMode) {
            var jwt = AuthStore.getJwt();

            if (!jwt) {
                return;
            }

            console.log("updateSurvey: "+JSON.stringify(submitData));

            var url = props.path.surveyedit;

            if(addMode) {
                url = props.path.surveyadd;
            }

            /* TODO check if submitData is set */

            var loadRequest = $.ajax({
                type: 'POST',
                url: url,
                contentType: "application/json",
                beforeSend: function (request) {
                    request.setRequestHeader("Vothing-Token", jwt);
                },
                data: JSON.stringify(submitData),
                dataType: "json"
            });

            var localCaller = this;

            loadRequest.done(function (response, textStatus, jqXHR) {
                caller.setSurvey(localCaller.convertResponseToSurvey(jqXHR.responseText), "success"); // TODO 
            });

            loadRequest.fail(function (jqXHR, textStatus) {
                console.log("fail: " + jqXHR.status);
                //caller.error = true;
                caller.setSurvey(localCaller.convertResponseToSurvey(jqXHR.responseText), "error"); // TODO 
            });
        }
    },
    render: function () {
    }
});

module.exports = RequestHelper;