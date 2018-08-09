    import React, { Component } from "react";
    import { inject, observer } from "mobx-react";
    import { Redirect } from "react-router-dom";
    import { loginStatus, loginStatusMessages } from '../core/constants';
    import LLWButton from './ui/LLWButton';
    import { FormErrors } from './ui/FormErrors';

    @inject("store")
    @observer
    export default class LLWLogin extends Component {
        constructor(props) {
            super(props);
            this.store = this.props.store.appState;
            this.state = {
                username: '',
                password: '',
                formErrors: {username: '', password: ''},
                usernameValid: false,
                passwordValid: false,
                formValid: false
              };
        }
        loginForm;
        handleInputChange(e) {
            const name = e.target.name;
            const value = e.target.value;
            this.setState({[name]: value}, () => { this.validateField(name, value) });
        }
        validateField(fieldName, value) {
          let fieldValidationErrors = this.state.formErrors;
          let usernameValid = this.state.usernameValid;
          let passwordValid = this.state.passwordValid;
          switch(fieldName) {
            case 'username':
                usernameValid = value.match(/^[^\^\/\\,.]*$/i);
                fieldValidationErrors.username = usernameValid ? '' : ' is invalid. Following characters are not allowed ^/,.';
                break;
            case 'password':
                passwordValid = value.length > 4;
                fieldValidationErrors.password = passwordValid ? '': ' is too short.';
                break;
          }
          this.setState({formErrors: fieldValidationErrors,
                usernameValid: usernameValid,
                passwordValid: passwordValid
            }, this.validateForm);
        }

        validateForm() {
          this.setState({formValid: this.state.usernameValid && this.state.passwordValid});
        }

        handleLogin(e) {
            e.preventDefault();
            this.store.login(this.state.username, this.state.password);
        }

        cancelLogin() {
            this.props.history.goBack();
        }

        render() {
            return (
                <form>
                    <div className="row justify-content-center">
                        <div className="col-sm-8 space-bottom">
                            <div className="alert-danger">
                                <h5>{this.store.loginError}</h5>
                            </div>
                        </div>
                        <div className="col-sm-8 space-bottom">
                            <input type="text" className="form-control" placeholder="Enter Username"
                                onChange={this.handleInputChange.bind(this)}
                                name="username"/>
                        </div>
                        <div className="col-sm-8 space-bottom">
                            <input type="password" className="form-control" placeholder="Enter Password"
                                onChange={this.handleInputChange.bind(this)}
                                name="password"/>
                        </div>
                        <div className="col-sm-8">
                            <input type="submit" className="space-right btn btn-default"
                                onClick={this.handleLogin.bind(this)} value="Login"
                                disabled={!this.state.formValid || this.state.currentLoginStatus === loginStatus.loggingIn}/>
                            <LLWButton className="btn btn-default"
                                onClick={this.cancelLogin.bind(this)}
                                title="Cancel" />
                        </div>
                        
                        <div className="col-sm-8">
                            <div className="alert-danger">
                                <FormErrors formErrors={this.state.formErrors} />
                            </div>
                        </div>
                    </div>
                    {this.store.currentLoginStatus === loginStatus.loggedIn &&
                        <Redirect to="/" />}
                </form>
            );
        }
    }
