import React from "react";
import props from "../config.js";
import {ListGroup, ListGroupItem, Panel, DropdownButton, MenuItem} from "react-bootstrap";
import PermissionHelper from "../util/PermissionHelper.js";
import RequestHelper from "../util/RequestHelper.js";
import SurveyOption from "./SurveyOption.jsx";
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
    componentDidMount: function() {
        this.loadSurvey();
    },
    loadSurvey: function(){
        RequestHelper.getSurvey(this,this.state.survey.id);
    },
    setSurvey: function(survey, successMessage, errorMessage) {

        var success = false;
        if(successMessage) {
            success = true;
        }
        var error = false;
        if(errorMessage) {
            error = true;
        }

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
    render: function () {

        var marker = this.state.row % 2 == 0 ? "info" : "default";
        var options = this.state.survey.surveyOptionsRemote;
        var actions = null;
        var editButton = '';
        var deleteButton = '';
        var editLink = "#survey/edit/" + this.state.survey.id;
        var deleteLink = "#survey/delete/" + this.state.survey.id;
        var footer = this.state.survey.user.foreName + " " + this.state.survey.user.name + " - created: " + dateFormat(this.state.survey.createDate, props.dateformatDefault);
        var userVoted = this.state.survey.userVoted;
        var votes = this.state.survey.votes;
        var error = this.state.error;
        var errorMessage = ""; 
        var success = this.state.success;
        var successMessage = ""; 

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
                                <SurveyOption surveyOption={option} key={option.id} index={index} survey={this.state.survey} parent={this}/>
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