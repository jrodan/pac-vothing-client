import React from 'react';
import props from '../config.js';
import AuthStore from '../stores/AuthStore.js';
import jquery from "jquery";
var $ = jquery;

var RequestHelper = React.createClass({
    statics: {
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

            loadRequest.done(function (response, textStatus, jqXHR) {
                var surveyResponse = JSON.parse(jqXHR.responseText);
                if (surveyResponse) {
                    caller.setSurvey(surveyResponse);
                }
            });

            loadRequest.fail(function (jqXHR, textStatus) {
                console.log("fail: " + jqXHR.status);
                // TODO 
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

            loadRequest.done(function (response, textStatus, jqXHR) {
                var surveysResponse = JSON.parse(jqXHR.responseText);
                if (surveysResponse) {
                    caller.setSurveys(surveysResponse);
                }
            });

            loadRequest.fail(function (jqXHR, textStatus) {
                console.log("fail: " + jqXHR.status);
                //caller.error = true;
            });
        }
    },
    render: function () {
    }
});

module.exports = RequestHelper;