import React from 'react';
import Reflux from 'reflux';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Button, Grid, Row, Col } from 'react-bootstrap';

import AuthStore from '../stores/AuthStore.js';
import Actions from '../actions/Actions.js';

import props from '../config.js';

var Login = React.createClass({
  mixins: [
    Reflux.connect(AuthStore, Actions),
    Reflux.ListenerMixin
  ],
  componentDidMount () {
    this.listenTo(AuthStore, this._onAuthChange);
  },
  _onAuthChange(auth) {
    this.setState(auth);
  },
  _handleSubmit(event) {
    event.preventDefault();

    Actions.login(
      ReactDOM.findDOMNode(this.refs.email).value,
      ReactDOM.findDOMNode(this.refs.password).value
    );
  },
  render() {
    var errorMessage;
    if (this.state.error) {
      errorMessage = (
        <div className='state-error' style={{ paddingBottom: 16 }}>
          { this.state.error }
        </div>
      );
    }

    var formContent;
    if (!this.state.user) {
      formContent = (
          <div>
            { errorMessage }
            <fieldset className="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" ref="email" defaultValue="default@vothing.com" />
            </fieldset>
            <fieldset className="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" ref="password" defaultValue="123" />
            </fieldset>

            <Button type="submit" className="btn btn-primary" onClick={ this.handleLogout }>Log In</Button>
          </div>
      );
    }
    return (
      <Grid>
        <Row className="show-grid">
          <Col xsHidden md={4}></Col>
          <Col xs={12} md={4}>
            <form onSubmit={this._handleSubmit}>
                { formContent }
              </form>
          </Col>
          <Col xsHidden md={4}></Col>
        </Row>
      </Grid>
    );
  }
});


module.exports = Login;