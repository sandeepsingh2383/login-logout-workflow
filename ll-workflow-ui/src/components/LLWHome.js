import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { loginStatusMessages } from '../core/constants';

@withRouter
@inject("store")
@observer
export default class LLWHome extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.store.appState;
	}

	render() {
		return (
			<div className="home">
				<header>
					<div className="row justify-content-center">
						<div className="col-sm-10">
							<h1>Welcome to - Login Logout Workflow!</h1>
						</div>
					</div>
					<div className="row justify-content-center">
						<div className="col-sm-12">
							<ul>
								<li>There is an admin tab beside home on the top left</li>
								<li>It will be visible only for logged in users.</li>
								<li>If you directly hit the url http://localhost:3000/admin, it will redirect to login page</li>
							</ul>
						</div>
					</div>
				</header>
				<div className="row justify-content-center">
					<div className="col-sm-6">
						<h5>This is an application built using React, Mobx, ES6</h5>
					</div>
				</div>
			</div>
		);
	}
}
