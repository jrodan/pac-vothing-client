var serverBase = "http://127.0.0.1:8081";

var props = {
	server : {
		base: serverBase
	},
	path : {
		login: serverBase+"/vothing-core/vothing/security/login",
		logout: serverBase+"/vothing-core/vothing/security/logout",
		votelist: serverBase+"/vothing-core/restricted/vote/list",
		votelist: serverBase+"/vothing-core/restricted/vote/list",
		voteadd: serverBase+"/vothing-core/restricted/vote/add/",
		surveylist: serverBase+"/vothing-core/restricted/survey/list",
		surveyget: serverBase+"/vothing-core/restricted/survey/get"
	},
	user : {
		defaultemail: "default@vothing.com",
		defaultpassword: "123"
	}, 
	dateformatDefault: "dd.mm.yyyy h:MM TT"
};

module.exports = props;