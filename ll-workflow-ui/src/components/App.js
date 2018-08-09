import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from "react";
import { Route } from "react-router-dom";
import LazyRoute from "lazy-route";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { loginStatusMessages } from '../core/constants';
import LLWTopBar from "./LLWTopBar";

@withRouter
@inject("store")
@observer
export default class App extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.store.appState;
	}
	render() {
		return (
			<div className="container">
				<LLWTopBar history={this.props.history}/>
				<div className="row justify-content-center">
					<h4>Current Login Status - {loginStatusMessages['loginStatusMessage_' + this.store.currentLoginStatus]}</h4>
				</div>

				<Route
					exact
					path="/"
					render={props => (
						<LazyRoute {...props} component={import("./LLWHome")} />
					)}
				/>
				<Route
					exact
					path="/admin"
					render={props => (
						<LazyRoute {...props} component={import("./LLWAdmin")} />
					)}
				/>
				<Route
					exact
					path="/login"
					render={props => (
						<LazyRoute {...props} component={import("./LLWLogin")} />
					)}
				/>
			</div>
		);
	}
}
