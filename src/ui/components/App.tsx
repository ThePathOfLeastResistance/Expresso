// To support: theme="express" scale="medium" color="light"
// import these spectrum web components modules:
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/express/theme-light.js";

// To learn more about using "swc-react" visit:
// https://opensource.adobe.com/spectrum-web-components/using-swc-react/
import { Button } from "@swc-react/button";
import { Theme } from "@swc-react/theme";
import React from "react";
import { DocumentSandboxApi } from "../../models/DocumentSandboxApi";
import "./App.css";

import { AddOnSDKAPI } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

function blobToBase64(blob: Blob) {
	return new Promise((resolve, _) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result);
		reader.readAsDataURL(blob);
	});
}

const App = ({ addOnUISdk, sandboxProxy }: { addOnUISdk: AddOnSDKAPI; sandboxProxy: DocumentSandboxApi }) => {
	function handleClick() {
		sandboxProxy.createRectangle();
	}

	async function handleGen() {
		const response = await addOnUISdk.app.document.createRenditions({
			range: addOnUISdk.constants.Range.currentPage,
			format: addOnUISdk.constants.RenditionFormat.png,
		});
		console.log("response", response[0].blob);
        console.log("img", await blobToBase64(response[0].blob));
	}

	return (
		// Please note that the below "<Theme>" component does not react to theme changes in Express.
		// You may use "addOnUISdk.app.ui.theme" to get the current theme and react accordingly.
		<Theme theme="express" scale="medium" color="light">
			<div className="container">
				<Button size="m" onClick={handleClick}>
					Create Rectangle
				</Button>
				<Button size="m" onClick={handleGen}>
					Generate
				</Button>
			</div>
		</Theme>
	);
};

export default App;
