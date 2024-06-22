import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { Provider } from "react-redux";
// Importing store to state managing with redux, ill need to wrap my main application
// with the provider in order to use Redux.
import { store } from "./store";

async function main() {
	ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
		<Provider store={store}>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</Provider>,
	);
}

main();
