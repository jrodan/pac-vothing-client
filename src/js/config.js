var serverBase = "http://macci:8081";

var props = {
	server : {
		base: serverBase
	},
	path : {
		login: serverBase+"/vothing-core/vothing/security/login",
		logout: serverBase+"/vothing-core/vothing/security/logout",
		votelist: serverBase+"/vothing-core/restricted/vote/list",
		votelist: serverBase+"/vothing-core/restricted/vote/list/",
		voteadd: serverBase+"/vothing-core/restricted/vote/add/",
		surveylist: serverBase+"/vothing-core/restricted/survey/list",
	},
	user : {
		defaultemail: "default@vothing.com",
		defaultpassword: "123"
	}
};

module.exports = props;