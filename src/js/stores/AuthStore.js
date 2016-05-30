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
        this.errorMessage = '';
        this.loading = false;
        this.user = null;
    },

    getState () {
        return {
            loading: this.loading,
            error: this.error,
            user: this.userFromClaims(),
            loggedIn: this.loggedIn(),
            errorMessage: this.errorMessage
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
        var caller = this;

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

        loginRequest.done(function (response, textStatus, jqXHR) {;
            Actions.login.completed(response);
        });

        loginRequest.fail(function (jqXHR, textStatus) {
            
            caller.error = true;

            console.log("error: " + textStatus + " " + jqXHR);        

            if (jqXHR.status == 401) {
                caller.errorMessage = 'You are not allowed to sign in because of missing permissions.'
            } else if (jqXHR.status == 0) {
                caller.errorMessage = 'There is a general error with the Server. Please contact an Administrator.'
            } else {
                console.log("failed to connect: " + jqXHR.status);
                caller.errorMessage = 'There is a general error with the Server. Please contact an Administrator.'
            }

            caller.loading = false;
            caller.changed();

        });

    },

    onLoginCompleted (authResponse) {

        if (authResponse) {

            this.jwt = authResponse.jwt;
            this.claims = this.parseJwt();
            localStorage.setItem('jwt', this.jwt);
            this.error = false;
            this.errorMessage = '';

        } else {
            this.error = true,
            this.errorMessage = 'Username or password invalid.'
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
        this.errorMessage = '';
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