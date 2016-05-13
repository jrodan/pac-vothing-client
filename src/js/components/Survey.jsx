import React from "react";
import props from "../config.js";
import {ListGroup, ListGroupItem, Panel, DropdownButton, MenuItem} from "react-bootstrap";
import PermissionHelper from "../util/PermissionHelper.js";
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
            hasDeletePermission: PermissionHelper.hasUserDeleteSurveyPermission(this.props.survey)
        };
    },
    render: function () {

        var marker = this.state.row % 2 == 0 ? "info" : "default";
        var options = this.state.options;
        var actions = null;
        var editButton = '';
        var deleteButton = '';
        var editLink = "#survey/edit/" + this.state.id;
        var footer = this.state.author + " - created: " + dateFormat(this.state.createDate, props.dateformatDefault);

        if (this.state.hasEditPermission) {
            editButton = <MenuItem eventKey="1" href={editLink}>Edit</MenuItem>;
        }
        if (this.state.hasDeletePermission) {
            deleteButton = <MenuItem eventKey="2">Delete</MenuItem>;
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
                <Panel header={this.state.name} footer={footer} bsStyle={marker}>

                    <ListGroup fill>
                        {options.map(function (option, index) {
                            return (
                                <ListGroupItem key={option.id}>
                                    <div className="surveyoption" key={option.key}>
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