import("./styles/main.scss");
import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "mobx-react";

import App from "./components/App";
import stores from "./stores/stores";

const renderApp = Component => {
	render(
			<Router>
				<Provider store={stores}>
					<App />
				</Provider>
			</Router>,
		document.getElementById("root")
	);
};

renderApp(App);

if (module.hot) {
	module.hot.accept(() => renderApp(App));
}
