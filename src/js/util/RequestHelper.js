import React from 'react';
import props from '../config.js';
import AuthStore from '../stores/AuthStore.js';
import jquery from "jquery";
var $ = jquery;

var RequestHelper = React.createClass({
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
                caller.setSurvey(localCaller.convertResponseToSurvey(jqXHR.responseText), "error"); // TODO 
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
                //caller.error = true;
                caller.setSurveys(localCaller.convertResponseToSurveys(jqXHR.responseText), "error"); // TODO 
            });
        },
        addSurvey: function (caller, submitData) {
            this.updateSurvey(caller, submitData, true);    
        },
        updateSurvey: function (caller, submitData) {
            this.updateSurvey(caller, submitData, false);    
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