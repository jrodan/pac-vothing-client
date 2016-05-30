import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, hashHistory, IndexRoute} from "react-router";
import Master from "./pages/Master.jsx";
import SurveyList from "./components/SurveyList.jsx";
import SurveyEdit from "./components/SurveyEdit.jsx";
import SurveyDelete from "./components/SurveyDelete.jsx";

var App = React.createClass({
    render: function () {
        return (<div>{this.props.children}</div>);
    }
});

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <Route component={Master}>
                <IndexRoute component={SurveyList}/>
                <Route path="survey/list" component={SurveyList}/>
                <Route path="survey/list/latest" component={SurveyList}/>
                <Route path="survey/add" component={SurveyEdit}/>
                <Route path="survey/deleted/:deleted" component={SurveyDelete}/>
                <Route path="survey/delete/:surveyId" component={SurveyDelete}/>
                <Route path="survey/edit/:surveyId" component={SurveyEdit}/>
            </Route>
        </Route>

    </Router>
    , document.getElementById('app')
);

/*<Route path="*" component={ErrorPage}/>*/