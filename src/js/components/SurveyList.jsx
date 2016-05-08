import React from "react";
import jquery from "jquery";
import RequestHelper from "../util/RequestHelper.js";
import Survey from "./Survey.jsx";
var $ = jquery;

var SurveyList = React.createClass({
    getInitialState: function () {
        return {
            surveys: {}
        };
    },
    componentDidMount: function () {
        this.loadSurveys();
    },
    loadSurveys: function (task, submitData) {
        RequestHelper.getSurveys(this, task, submitData);
    },
    setSurveys: function (surveys) {
        if (surveys) {
            this.setState({
                surveys: surveys
            });
        }
    },
    render: function () {
        var rows = [];
        var surveys = this.state.surveys;

        for (var i = 0; i < surveys.length; i++) {
            rows.push(<Survey survey={surveys[i]} key={surveys[i].id} row={i}/>);
        }
        return (
            <div className="surveys">
                <div>{rows}</div>
            </div>
        );
    }
});

module.exports = SurveyList;