var serverBase = "http://127.0.0.1:8081";

var props = {
    server: {
        base: serverBase
    },
    path: {
        login: serverBase + "/vothing-remote/vothing/security/login",
        logout: serverBase + "/vothing-remote/vothing/security/logout",
        surveylist: serverBase + "/vothing-remote/restricted/survey/list",
        surveydelete: serverBase + "/vothing-remote/restricted/survey/delete",
        surveyadd: serverBase + "/vothing-remote/restricted/survey/add",
        surveyedit: serverBase + "/vothing-remote/restricted/survey/update",
        surveylist: serverBase + "/vothing-remote/restricted/survey/list",
        surveyget: serverBase + "/vothing-remote/restricted/survey/get",
        surveyoptionvoteadd: serverBase + "/vothing-remote/restricted/surveyoptionrating/add"
    },
    user: {
        defaultemail: "default@vothing.com",
        defaultpassword: "123"
    },
    dateformatDefault: "dd.mm.yyyy h:MM TT"
};

module.exports = props;