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
            id: this.props.survey.id || 0,
            name: this.props.survey.name || '',
            options: this.props.survey.surveyOptions || [],
            createDate: this.props.survey.createDate || '',
            modifiedDate: this.props.survey.modifiedDate || '',
            author: this.props.survey.user.foreName + ' ' + this.props.survey.user.name || '',
            row: this.props.row || 0,
            hasEditPermission: PermissionHelper.hasUserEditSurveyPermission(this.props.survey),
            hasDeletePermission: PermissionHelper.hasUserDeleteSurveyPermission(this.props.survey),
            isUserVoted: this.props.survey.userVoted,
            error: false,
            success: false
        };
    },
    vote: function(e) {
        var isUserVoted = this.props.survey.isUserVoted; // TODO change this to state
        if(!isUserVoted) {
            var optionId = e.target.id;
            RequestHelper.addSurveyOptionVote(this, optionId);
        }
    },
    onVoted: function(message) {
        this.setState({
            isUserVoted: true,
            success: true,
            error: false,
            successMessage: message
        });
    },
    onError: function(message) {
        this.setState({
            success: false,
            error: true,
            errorMessage: message
        });
    },
    render: function () {

        var marker = this.state.row % 2 == 0 ? "info" : "default";
        var options = this.state.options;
        var actions = null;
        var editButton = '';
        var deleteButton = '';
        var editLink = "#survey/edit/" + this.state.id;
        var deleteLink = "#survey/delete/" + this.state.id;
        var footer = this.state.author + " - created: " + dateFormat(this.state.createDate, props.dateformatDefault);
        var isUserVoted = this.state.userVoted;
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

        if(!isUserVoted) {
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

                <Panel header={this.state.name} footer={footer} bsStyle={marker}>

                    <ListGroup fill>
                        {options.map(function (option, index) {
                            return (
                                <ListGroupItem onClick={this.vote} key={index} id={option.id}>
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