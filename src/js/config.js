var serverBase = "http://127.0.0.1:8081";

var props = {
    server: {
        base: serverBase
    },
    path: {
        login: serverBase + "/vothing-core/vothing/security/login",
        logout: serverBase + "/vothing-core/vothing/security/logout",
        surveylist: serverBase + "/vothing-core/restricted/survey/list",
        surveydelete: serverBase + "/vothing-core/restricted/survey/delete",
        surveyadd: serverBase + "/vothing-core/restricted/survey/add",
        surveyedit: serverBase + "/vothing-core/restricted/survey/update",
        surveylist: serverBase + "/vothing-core/restricted/survey/list",
        surveyget: serverBase + "/vothing-core/restricted/survey/get"
    },
    user: {
        defaultemail: "default@vothing.com",
        defaultpassword: "123"
    },
    dateformatDefault: "dd.mm.yyyy h:MM TT"
};

module.exports = props;