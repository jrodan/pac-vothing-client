import React from 'react';
import Reflux from 'reflux';
import { Clearfix, Button, FormGroup, FormControl, Checkbox, ButtonToolbar, ControlLabel, Row, Col } from 'react-bootstrap';
import props from '../config.js';
import AuthStore from '../stores/AuthStore.js';
import jquery from "jquery";
var $ = jquery;

var SurveyEdit = React.createClass({
  getInitialState: function() {
    return {
      name: '',
      options: [],
      optionsKeys: 100,
      id: this.props.params.surveyId,
      editMode: (this.props.params.surveyId && this.props.params.surveyId > 0 ? true : false)
    };
  },
  componentDidMount: function() {
      this.loadSurvey();
  },
  loadSurvey: function() {
    
    var jwt = AuthStore.getJwt();
    var id = this.state.id;

    if(!jwt || id == 0){
      return;
    }
      
    var caller = this;
    
    var loadRequest = $.ajax({
        type: 'GET',
        url: props.path.surveyget + "/" + id,
        contentType: "application/json",
        beforeSend: function (request)
            {
                request.setRequestHeader("Vothing-Token", jwt);
            },
        dataType: "json"
      });
      
      loadRequest.done(function(response, textStatus, jqXHR) {
        var surveyResponse = JSON.parse(jqXHR.responseText);
        if(surveyResponse) {
          caller.setState({
            survey: surveyResponse,
            options: surveyResponse.surveyOptions,
            name: surveyResponse.name,
            id: surveyResponse.id,
            editMode: true
          });
        }
      });
      
      loadRequest.fail(function(jqXHR, textStatus) {
        console.log("fail: "+jqXHR.status);
        //caller.error = true;
      }); 
    
    },
  handleNameChange: function(e) {
    this.setState({name: e.target.value});
  },
  handleOptionChange: function(e) {
    // var options = this.state.options;
    // var option = options[index];
    // option.name = e.target.value;
    // options[index] = option;
    // this.setState({options: options});
    // TODO 
  },
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

      console.log(this.state.survey);

      return (
        <div className="surveyedit">
        	<form onSubmit={this.handleSubmit}>
        		
            <FormGroup controlId="formControlsText">
              <ControlLabel>Survey Name</ControlLabel>
              <FormControl type="text" placeholder="Enter name" onChange={this.handleNameChange} value={this.state.name}/>
            </FormGroup>
            <ControlLabel>Survey Options</ControlLabel>
            <FormGroup controlId="formControlsOptions" className="">
              <Button type="button" bsStyle="success" onClick={ this.addOption.bind(null,this) }>Add Option</Button>
            </FormGroup>
            <FormGroup controlId="formControlsOptions" className="surveyoptions">
                
              {options.map(function (option, index) {
                 var ref = "input_" + index;
                   return (
                        <div className="surveyoption" key={option.id}>
                          <Col xs={9} md={9} className="col">
                            <FormControl type="text" name={ref} value={option.name} onChange={this.handleOptionChange} ref={ref} placeholder="Enter description" />
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