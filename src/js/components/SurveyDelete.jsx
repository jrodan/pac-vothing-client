import React from "react";
import {Clearfix, Button, FormGroup, FormControl, ControlLabel, Col} from "react-bootstrap";
import RequestHelper from "../util/RequestHelper.js";

var SurveyDelete = React.createClass({
    getInitialState: function () {
        return {
            id: this.props.params.surveyId || 0,
            deleted: (this.props.params.deleted == "deleted" ? true : false)
        };
    },
    componentDidMount: function () {
        // if delete mode try to delete first and then load if any error occured
        if(this.state.id && this.state.id != 0 && !this.state.deleted) {
            RequestHelper.deleteSurvey(this, this.state.id);
        } 
    },
    setDeleteResult: function(id, deleted) {
        // TODO use reflux for this callback
        this.setState({
            id: id || 0,
            deleted: deleted
        });
    },
    render: function () {
        var messageClass = "alert-danger";
        var message = "Could not delete Survey due to an problem";
        if(this.state.deleted) {
            messageClass="alert-success";
            message = "Successfully deleted Survey.";
        }
        return (
            <div className="SurveyDelete {messageClass}">
                {message}
            </div>
        );
    }

});

module.exports = SurveyDelete;