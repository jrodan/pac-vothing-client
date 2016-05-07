import React from 'react';
import Reflux from 'reflux';
import { Clearfix, Button, FormGroup, FormControl, Checkbox, ButtonToolbar, ControlLabel, Row, Col } from 'react-bootstrap';
import props from '../config.js';
import jquery from "jquery";
var $ = jquery;

var SurveyEdit = React.createClass({
  getInitialState: function() {
    return {
      name: '',
      options: [],
      optionsKeys: 100
    };
  },
  /*handleAuthorChange: function(e) {
    this.setState({name: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },*/
  handleSubmit: function(e) {
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
  addOption: function(event) {
    var nameSurvey = this.state.name;
    var key = this.state.optionsKeys++;
    var options = this.state.options;
    options.push({name: null, key: key});
    this.setState({
      name: nameSurvey,
      options : options
    });
  },
  removeOption: function(option) {
    var options = this.state.options;
    var index = options.indexOf(option);
    options.splice(index, 1);
    this.setState({options : options});
  },
  render: function() {
      var options = this.state.options;
      return (
        <div className="surveyedit">
        	<form onSubmit={this.handleSubmit}>
        		
            <FormGroup controlId="formControlsText">
              <ControlLabel>Survey Name</ControlLabel>
              <FormControl type="text" placeholder="Enter name" value={this.state.name}/>
            </FormGroup>
            <ControlLabel>Survey Options</ControlLabel>
            <FormGroup controlId="formControlsOptions" className="">
              <Button type="button" bsStyle="success" onClick={ this.addOption.bind(null,this) }>Add Option</Button>
            </FormGroup>
            <FormGroup controlId="formControlsOptions" className="surveyoptions">
                
              {options.map(function (option, index) {
                 var ref = "input_" + index;
                   return (
                        <div className="surveyoption" key={option.key}>
                          <Col xs={9} md={9} className="col">
                            <FormControl type="text" name={ref} value={option.name} ref={ref} placeholder="Enter description" />
                          </Col>
                          <Col xs={3} md={3} className="col">
                            <Button type="button" bsStyle="link" onClick={ this.removeOption.bind(null,option) } bsSize="small">remove</Button>
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