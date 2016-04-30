import React from 'react';
import Reflux from 'reflux';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import Dockbar from '../components/Dockbar.jsx';
import AuthStore from '../stores/AuthStore.js';
import Login from '../components/Login.jsx';

var Master = React.createClass({
  mixins: [Reflux.ListenerMixin],
  onStatusChange: function(status) {
      this.setState({
          currentStatus: status
      });
  },
  componentDidMount: function() {
      this.listenTo(AuthStore, this.onStatusChange);
  },
  render () {
    if(AuthStore.loggedIn()){
      return (
        <div>
          <Dockbar />
          <Grid>
            <Row className="show-grid">
              <Col xsHidden md={3}></Col>
              <Col xs={12} md={6}>
                {this.props.children}
              </Col>
              <Col xsHidden md={3}></Col>
            </Row>
          </Grid>
        </div>
      );
    } else {
      return (
        <div className="">
          <Login />
        </div>
      );
    }
  }

});

module.exports = Master;