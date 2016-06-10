import React from "react";
import props from "../config.js";
import {ListGroup, ListGroupItem, Panel, DropdownButton, MenuItem} from "react-bootstrap";
import PermissionHelper from "../util/PermissionHelper.js";
import RequestHelper from "../util/RequestHelper.js";
import jquery from "jquery";
var dateFormat = require('dateformat');

var $ = jquery;

var SurveyOption = React.createClass({
    getInitialState: function () {
        return {
            surveyOption: this.props.surveyOption,
            parentVotes: this.props.survey.votes,
            index: this.props.index,
            userVoted: this.props.survey.userVoted,
            votedMarker: this.props.survey.votedMarker,
            error: false,
            success: false
        };
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({
            surveyOption: nextProps.surveyOption,
            parentVotes: nextProps.survey.votes,
            index: nextProps.index,
            userVoted: nextProps.survey.userVoted,
            votedMarker: nextProps.survey.votedMarker,
            error: false,
            success: false
        });
    },
    vote: function(e) {
        var userVoted = this.state.userVoted; 
        if(!userVoted) {
            var optionId = e.target.id;
            RequestHelper.addSurveyOptionVote(this.props.parent, optionId);
            
        }
    },
    render: function () {

        var parentVotes = this.state.parentVotes;
        var votes = this.state.surveyOption.surveyOptionRatings.length;
        var userVotedThisOption = this.state.surveyOption.userVotedThisOption;
        var userVoted = this.state.userVoted;
        var percent = "";
        var votedMarker = "disabled";
        var style = {};

        if(userVotedThisOption) {
            style = {
                fontWeight: 'bold'
            };
        }

        if(!userVoted) {
            votedMarker = "";
        }

        if(this.state.userVoted) {
            percent = votes > 0 ? (votes / parentVotes * 100)+"%" : "0%";
            percent = "(" + percent + ")";
        }

        return (
            <ListGroupItem onClick={this.vote} key={this.state.index} id={this.state.surveyOption.id} disabled={votedMarker}>
                <div className="surveyoption" style={style} key={this.state.surveyOption.key} id={this.state.surveyOption.id}>
                    {this.state.index + 1}. {percent} {this.state.surveyOption.name}
                </div>
            </ListGroupItem>
        )

    }

});

module.exports = SurveyOption;