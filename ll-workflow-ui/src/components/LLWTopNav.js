import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import LLWActiveLink from "./ui/LLWActiveLink";
import { loginStatus } from '../core/constants';

@withRouter
@inject("store")
@observer
export default class LLWTopNav extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.store.appState;
	}

	render() {
		const { currentLoginStatus, authenticating } = this.store;
		return (
			<nav>
				<LLWActiveLink activeOnlyWhenExact={true} to="/">Home</LLWActiveLink>
				{currentLoginStatus === loginStatus.loggedIn && <LLWActiveLink to="/admin">Admin</LLWActiveLink>}
			</nav>
		);
	}
}
