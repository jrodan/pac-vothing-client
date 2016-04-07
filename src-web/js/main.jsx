import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import routes from './routes.jsx';

/* call router */
Router.run(routes, Router.HistoryLocation, (Root) => {
  ReactDOM.render(<Root/>, document.getElementById('app'));
});

