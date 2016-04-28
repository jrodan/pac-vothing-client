var serverBase = "http://macci:8081/";

var props = {
	server : {
		base: serverBase
	},
	path : {
		login: "/vothing-core/vothing/security/login",
		logout: "/vothing-core/vothing/security/logout",
		votelist: "/vothing-core/restricted/vote/list",
		votelist: "/vothing-core/restricted/vote/list/",
		voteadd: "/vothing-core/restricted/vote/add/",
		surveylist: "/vothing-core/restricted/survey/list",
	},
	user : {
		defaultemail: "default@vothing.com",
		defaultpassword: "123"
	}
};

module.exports = props;