import React from 'react';
import AuthStore from '../stores/AuthStore.js';

var PermissionHelper = React.createClass({
  statics: {
    hasUserEditSurveyPermission: function(survey) {
    	return this.hasUserPermission("SURVEY_UPDATE", survey.usersPermissions);
    },
    hasUserDeleteSurveyPermission: function(survey) {
    	return this.hasUserPermission("SURVEY_DELETE", survey.usersPermissions);
    },
    hasUserEditSurveyOptionRatingPermission: function(surveyOptionRating) {
    	return this.hasUserPermission("SURVEYOPTIONRATING_UPDATE", surveyOptionRating.usersPermissions);
    },
    hasUserEditSurveyOptionRatingPermission: function(surveyOptionRating) {
    	return this.hasUserPermission("SURVEYOPTIONRATING_DELETE", surveyOptionRating.usersPermissions);	
    }, 
    hasUserPermission: function(permission, permissionList) {
    	var hasUserPermission = false;
    	if(AuthStore.loggedIn()) {
    		var user = AuthStore.userFromClaims();
    		if(user && permissionList) {
    			for(var i in permissionList) {
    				if(permissionList[i] == "ADMIN" || permissionList[i] == permission) {
    					hasUserPermission = true;
    					break;	
    				}
    			}
    		}
    	}
    	return hasUserPermission;
    }
  },
  render: function() {
  }

});

module.exports = PermissionHelper;