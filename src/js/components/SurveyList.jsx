import React from "react";
import jquery from "jquery";
import RequestHelper from "../util/RequestHelper.js";
import Survey from "./Survey.jsx";
var $ = jquery;

var SurveyList = React.createClass({
    getInitialState: function () {
        return {
            surveys: {},
            error: ""
        };
    },
    componentDidMount: function () {
        this.loadSurveys();
    },
    loadSurveys: function (task, submitData) {
        RequestHelper.getSurveys(this, task, submitData);
    },
    setSurveys: function (surveys, error) {
        this.setState({
            surveys: surveys,
            error: error
        });
    },
    render: function () {
        var rows = [];
        var surveys = this.state.surveys;
        var errorMessage = '';
        if (this.state.error) {
            errorMessage = (
                <div className='alert alert-danger' style={{ paddingBottom: 16, backgroundColor: "lightred" }}>
                    { this.state.error }
                </div>
            );
        }

        for (var i = 0; i < surveys.length; i++) {
            rows.push(<Survey survey={surveys[i]} key={surveys[i].id} row={i}/>);
        }
        return (
            <div className="surveys">
                { errorMessage }
                <div>{rows}</div>
            </div>
        );
    }
});

module.exports = SurveyList;