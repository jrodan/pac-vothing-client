import React from 'react';

import AuthStore from '../stores/AuthStore';

var RequestHelper = React.createClass({
  statics: {
    setHeader(xhr) {
      xhr.setRequestHeader('Vothing-Token', AuthStore.getJwt());
    }
  }

});

module.exports = RequestHelper;