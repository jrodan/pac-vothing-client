import React from "react";
import props from "../config.js";
import {ListGroup, ListGroupItem, Panel, DropdownButton, MenuItem} from "react-bootstrap";
import PermissionHelper from "../util/PermissionHelper.js";
import RequestHelper from "../util/RequestHelper.js";
import jquery from "jquery";
var dateFormat = require('dateformat');

var $ = jquery;

var Survey = React.createClass({
    getInitialState: function () {
        return {
            survey: this.props.survey || [],
            row: this.props.row || 0,
            hasEditPermission: PermissionHelper.hasUserEditSurveyPermission(this.props.survey),
            hasDeletePermission: PermissionHelper.hasUserDeleteSurveyPermission(this.props.survey),
            error: false,
            success: false
        };
    },
    setSurvey: function(survey, successMessage, errorMessage) {

        var success = successMessage || successMessage != "" ? true : false;
        var error = errorMessage || errorMessage != "" ? true : false;

        this.setState({
            survey: survey,
            row: this.state.row,
            hasEditPermission: PermissionHelper.hasUserEditSurveyPermission(survey),
            hasDeletePermission: PermissionHelper.hasUserDeleteSurveyPermission(survey),
            error: error,
            success: success,
            successMessage: successMessage,
            errorMessage: errorMessage
        });
    },
    vote: function(e) {
        var userVoted = this.state.survey.userVoted; // TODO change this to state
        if(!userVoted) {
            var optionId = e.target.id;
            RequestHelper.addSurveyOptionVote(this, optionId);
        }
    },
    render: function () {

        var marker = this.state.row % 2 == 0 ? "info" : "default";
        var options = this.state.survey.surveyOptions;
        var actions = null;
        var editButton = '';
        var deleteButton = '';
        var editLink = "#survey/edit/" + this.state.survey.id;
        var deleteLink = "#survey/delete/" + this.state.survey.id;
        var footer = this.state.author + " - created: " + dateFormat(this.state.survey.createDate, props.dateformatDefault);
        var userVoted = this.state.survey.userVoted;
        var voteLink = "";
        var votedMarker = "disabled";

        var error = this.state.error;
        var errorMessage = ""; //this.state.errorMessage;
        var success = this.state.success;
        var successMessage = ""; //this.state.successMessage;

        if(error) {
            errorMessage = (
                <div className='alert alert-danger'>
                    { this.state.errorMessage }
                </div>
            );
        }

        if(success) {
            successMessage = (
                <div className='alert alert-success'>
                    { this.state.successMessage }
                </div>
            );
        }

        if(!userVoted) {
            voteLink = "javascript:this.vote();";
            votedMarker = "";
        }

        if (this.state.hasEditPermission) {
            editButton = <MenuItem eventKey="1" href={editLink}>Edit</MenuItem>;
        }
        if (this.state.hasDeletePermission) {
            deleteButton = <MenuItem eventKey="2" href={deleteLink}>Delete</MenuItem>;
        }

        if (this.state.hasEditPermission || this.state.hasDeletePermission) {
            actions = (
                <ListGroupItem>
                    <DropdownButton bsStyle={marker} title='Actions' id={this.state.row}>
                        {editButton}
                        {deleteButton}
                    </DropdownButton>
                </ListGroupItem>
            );
        }

        return (
            <div className="survey">

                {errorMessage}
                {successMessage}

                <Panel header={this.state.survey.name} footer={footer} bsStyle={marker}>

                    <ListGroup fill>
                        {options.map(function (option, index) {
                            return (
                                <ListGroupItem onClick={this.vote} key={index} id={option.id} disabled={votedMarker}>
                                    <div className="surveyoption" key={option.key} id={option.id}>
                                        {index + 1}. {option.name}
                                    </div>
                                </ListGroupItem>
                            )
                        }.bind(this))}
                        
                        {actions}

                    </ListGroup>

                </Panel>
            </div>
        );
    }

});

module.exports = Survey;