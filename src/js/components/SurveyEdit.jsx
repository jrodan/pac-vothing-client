import React from "react";
import {Clearfix, Button, FormGroup, FormControl, ControlLabel, Col} from "react-bootstrap";
import RequestHelper from "../util/RequestHelper.js";

var SurveyEdit = React.createClass({
    getInitialState: function () {
        return {
            name: '',
            options: [],
            optionsKeys: 100,
            id: this.props.params.surveyId,
            editMode: (this.props.params.surveyId && this.props.params.surveyId > 0 ? true : false)
        };
    },
    componentDidMount: function () {
        this.loadSurvey();
    },
    loadSurvey: function () {
        RequestHelper.getSurvey(this, this.state.id);
    },
    setSurvey: function (survey) {
        if (survey) {
            this.setState({
                survey: survey,
                options: survey.surveyOptions,
                name: survey.name,
                id: survey.id,
                editMode: true
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
        /*e.preventDefault();
         var name = this.state.author.trim();
         var text = this.state.text.trim();
         if (!text || !author) {
         return;
         }
         // TODO: send request to the server
         this.setState({author: '', text: ''});
         */
    },
    addOption: function (event) {
        var nameSurvey = this.state.name;
        var key = this.state.optionsKeys++;
        var options = this.state.options;
        options.push({name: null, key: key});
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

        console.log(this.state.survey);

        return (
            <div className="surveyedit">
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
                            var ref = "input_" + index;
                            return (
                                <div className="surveyoption" key={option.id}>
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
                        <Button type="submit">Submit</Button>
                    </FormGroup>

                </form>
            </div>
        );
    }

});

module.exports = SurveyEdit;