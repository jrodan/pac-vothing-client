import Reflux from 'reflux';

export default Reflux.createActions({
    login: {children: ['completed', 'failed']},
    logout: {},
    surveyListUpdated: {children: ['completed', 'failed']},
    surveyUpdated: {children: ['completed', 'failed']},
    surveyAdded: {children: ['completed', 'failed']},
    surveyDeleted: {children: ['completed', 'failed']},
    surveyOptionAdded: {children: ['completed', 'failed']}
});