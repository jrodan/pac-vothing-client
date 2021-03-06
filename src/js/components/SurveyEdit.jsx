import React from "react";
import {Clearfix, Button, FormGroup, FormControl, ControlLabel, Col} from "react-bootstrap";
import RequestHelper from "../util/RequestHelper.js";

var SurveyEdit = React.createClass({
    getInitialState: function () {
        return {
            name: '',
            options: [],
            optionsKeys: 100,
            id: this.props.params.surveyId || 0,
            editMode: (this.props.params.surveyId && this.props.params.surveyId > 0 ? true : false)
        };
    },
    componentDidMount: function () {
        // load survey
        this.loadSurvey();
    },
    componentWillUpdate: function() {
        // remove old information
        var editMode = (this.props.params.surveyId && this.props.params.surveyId > 0 ? true : false)
        if(!editMode && this.state.editMode) {
            this.setState({
                survey: "",
                options: [],
                name: "",
                id: 0,
                editMode: editMode,
                error: "",
                success: ""
            });
        }
    },
    loadSurvey: function () {
        RequestHelper.getSurvey(this, this.state.id);
    },
    setSurvey: function (survey, successMessage, errorMessage) {
        // TODO use reflux for this callback
        if (survey) {

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
                options: survey.surveyOptionsRemote,
                name: survey.name,
                id: survey.id,
                editMode: true,
                error: error,
                success: success,
                successMessage: successMessage,
                errorMessage: errorMessage
            });
        } 
    },
    handleNameChange: function (e) {
        this.setState({name: e.target.value});
    },
    handleOptionChange: function (e) {
        var options = this.state.options;
        var index = parseInt(e.target.name.replace("input_", ""));
        var option = options[index];
        option.name = e.target.value;
        options[index] = option;
        this.setState({options: options});
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var name = this.state.name.trim();
        if (!name) {
            return;
        }
        var requestData = {
            id: this.state.id,
            name: name,
            surveyOptionsRemote: this.state.options
        }
        if(!this.state.id || this.state.id == 0) {
            RequestHelper.addSurvey(this, requestData);
        } else {
            RequestHelper.updateSurvey(this, requestData);
        }
        // TODO: send request to the server
        //this.setState({author: '', text: ''});
    },
    addOption: function (event) {
        var nameSurvey = this.state.name;
        var key = this.state.optionsKeys++;
        var options = this.state.options;
        options.push({
            id: 0,
            name: null, 
            createDate: "1462648006000",
            modifiedDate: "1462648006000",
            userPermissions: [],
            surveyOptionRatings: [],
            objectKey: parseInt(Math.random()*100000, 10)
        });
        this.setState({
            name: nameSurvey,
            options: options
        });
    },
    removeOption: function (option) {
        var options = this.state.options;
        var index = options.indexOf(option);
        options.splice(index, 1);
        this.setState({options: options});
    },
    render: function () {
        var options = this.state.options;
        var error = this.state.error;
        var success = this.state.success;
        var message = "";

        if(error) {
            message = (
                <div className='alert alert-danger'>
                    { this.state.errorMessage }
                </div>
            );
        }

        if(success) {
            message = (
                <div className='alert alert-success'>
                    { this.state.successMessage }
                </div>
            );
        }

        return (
            <div className="surveyedit">

                {message}

                <form onSubmit={this.handleSubmit}>

                    <FormGroup controlId="formControlsText">
                        <ControlLabel>Survey Name</ControlLabel>
                        <FormControl type="text" placeholder="Enter name" onChange={this.handleNameChange}
                                     value={this.state.name}/>
                    </FormGroup>
                    <ControlLabel>Survey Options</ControlLabel>
                    <FormGroup controlId="formControlsOptions" className="">
                        <Button type="button" bsStyle="success" onClick={ this.addOption.bind(null,this) }>Add
                            Option</Button>
                    </FormGroup>
                    <FormGroup controlId="formControlsOptions" className="surveyoptions">

                        {options.map(function (option, index) {
                            var key = (option.id != null && option.id != 0) ? option.id : index;
                            var ref = "input_" + index;
                            return (
                                <div className="surveyoption" key={key}>
                                    <Col xs={9} md={9} className="col">
                                        <FormControl type="text" name={ref} value={option.name}
                                                     onChange={this.handleOptionChange} ref={ref}
                                                     placeholder="Enter description"/>
                                    </Col>
                                    <Col xs={3} md={3} className="col">
                                        <Button type="button" bsStyle="link"
                                                onClick={ this.removeOption.bind(null,option) }
                                                bsSize="small">remove</Button>
                                    </Col>
                                </div>
                            )
                        }.bind(this))}
                        <Clearfix></Clearfix>
                    </FormGroup>

                    <FormGroup controlId="formControlsOptionsAdd" className="submitform">
                        <Button type="submit" onClick={this.handleSubmit}>Submit</Button>
                    </FormGroup>

                </form>
            </div>
        );
    }

});

module.exports = SurveyEdit;