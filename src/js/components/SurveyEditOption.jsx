import React from "react";
import {Button, FormControl, Col} from "react-bootstrap";
import jquery from "jquery";
var $ = jquery;

var SurveyEditOption = React.createClass({
    getInitialState: function () {
        return {
            name: this.props.name,
            id: this.props.id,
            index: this.props.index,
            editMode: (this.props.id && this.props.id > 0 ? true : false)
        };
    },
    handleNameChange: function (e) {
        this.setState({name: e.target.value});
    },
    render: function () {
        var option = this.state.option;
        var ref = input_ + this.state.index;

        console.log(this.state.survey);

        return (
            <div className="surveyoption">

                <div className="surveyoption" key={option.id}>
                    <Col xs={9} md={9} className="col">
                        <FormControl type="text" name=value={option.name} onChange={this.handleOptionChange} ref={ref}
                                     placeholder="Enter description"/>
                    </Col>
                    <Col xs={3} md={3} className="col">
                        <Button type="button" bsStyle="link" onClick={ this.removeOption.bind(null,option) }
                                bsSize="small">remove</Button>
                    </Col>
                </div>

            </div>
        );
    }

});

module.exports = SurveyEditOption;