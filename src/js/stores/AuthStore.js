import Reflux from 'reflux';
import Actions from '../actions/Actions';

import props from '../config.js';

import jquery from "jquery";
var $ = jquery;

var AuthStore = Reflux.createStore({
    listenables: Actions,

    init () {
        // pull cached token if one exists
        this.jwt = localStorage.getItem('jwt');

        this.claims = this.parseJwt();
        this.error = false;
        this.loading = false;
        this.user = null;
    },

    getState () {
        return {
            loading: this.loading,
            error: this.error,
            user: this.userFromClaims(),
            loggedIn: this.loggedIn()
        };
    },

    getJwt() {
        if (this.loggedIn()) {
            return this.jwt;
        }
        return null;
    },

    userFromClaims () {
        var user = null;
        if (this.claims) {
            user = this.claims.user;
        }
        return user;
    },

    loggedIn () {
        // helper
        return this.claims !== null;
    },

    changed () {
        this.trigger(this.getState());
    },

    onLogin (email, password) {
        this.loading = true;
        this.changed();

        // validate email and password
        // TODO 

        var credentials = {
            email: email,
            password: password
        };

        var loginRequest = $.ajax({
            type: 'POST',
            url: props.path.login,
            contentType: "application/json",
            data: JSON.stringify(credentials),
            dataType: "json"
        });

        loginRequest.done(function (response, textStatus, jqXHR) {
            console.log("done -2: " + response);
            Actions.login.completed(response);
        });

        loginRequest.fail(function (jqXHR, textStatus) {
            console.log("fail -3 : " + jqXHR.status);
            this.error = true;
            //this.errormessage = "";
            if (jqXHR.status == 401) {
                // TODO 
                console.log("permission denied");
            }
        });

    },

    onLoginCompleted (authResponse) {

        if (authResponse) {

            this.jwt = authResponse.jwt;
            this.claims = this.parseJwt();
            this.error = false;
            localStorage.setItem('jwt', this.jwt);

        } else {
            this.error = 'Username or password invalid.';
        }

        this.loading = false;
        this.changed();
    },

    onLogout () {
        console.log("AuthStore: logout triggered");
        // clear it all
        this.jwt = null;
        this.claims = null;
        this.error = false;
        this.loading = false;
        localStorage.removeItem('jwt');
    },

    parseJwt () {
        if (this.jwt === null) {
            return null;
        }
        return JSON.parse(atob(this.jwt.split('.')[1]));
    }

});

module.exports = AuthStore;