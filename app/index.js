import React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
// import "bootstrap/dist/css/bootstrap.min.css";
import TronWeb from "tronweb";

import Root from "./containers/Root";
import { configureStore, history } from "./store/configureStore";
import "./app.global.css";

const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.trongrid.io");
const solidityNode = new HttpProvider("https://api.trongrid.io");
// const eventServer = 'https://api.trongrid.io/';
// const privateKey = 'da14...9f0d0';

const tronWeb = (window.tronWeb = new TronWeb(
	fullNode,
	solidityNode
	// eventServer,
	// privateKey
));
const store = configureStore({
	auth: JSON.parse(localStorage.getItem("user")) || {}
});

render(
	<AppContainer>
		<Root store={store} history={history} />
	</AppContainer>,
	document.getElementById("root")
);

if (module.hot) {
	module.hot.accept("./containers/Root", () => {
		// eslint-disable-next-line global-require
		const NextRoot = require("./containers/Root").default;
		render(
			<AppContainer>
				<NextRoot store={store} history={history} />
			</AppContainer>,
			document.getElementById("root")
		);
	});
}
