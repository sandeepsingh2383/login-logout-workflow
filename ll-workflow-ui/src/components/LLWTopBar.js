import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import LLWTopNav from "./LLWTopNav";
import LLWButton from "./ui/LLWButton";
import { loginStatus } from '../core/constants';

@withRouter
@inject("store")
@observer
export default class LLWTopBar extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.store.appState;
	}

	authenticate(e) {
		if (this.store.currentLoginStatus === loginStatus.loggedOut) {
			this.props.history.push('/login');
		} else {
			this.store.logout();
		}
		
	}

	render() {
		const { currentLoginStatus } = this.store;
		return (
			<div className="topbar">
				<LLWTopNav location={this.props.location} />
				<LLWButton
					onClick={this.authenticate.bind(this)}
					title={currentLoginStatus === loginStatus.loggedIn ? "Log out" : "Sign in"}
				/>
			</div>
		);
	}
}
