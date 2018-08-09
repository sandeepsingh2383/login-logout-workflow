import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Redirect } from "react-router-dom";
import { loginStatus, loginStatusMessages } from '../core/constants';

@inject("store")
@observer
export default class LLWAdmin extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.store.appState;
	}

	render() {
		return (
			<div className="row justify-content-center">
				{this.store.currentLoginStatus === loginStatus.loggedIn && <h4>This is admin section, only logged in users can visit this page</h4>}
				{this.store.currentLoginStatus !== loginStatus.loggedIn && <Redirect
					to={{
						pathname: "/login",
						state: { from: this.props.location }
					}}
				/>}
			</div>
		);
	}
}
