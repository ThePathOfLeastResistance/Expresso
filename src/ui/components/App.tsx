import React, { useEffect } from "react";
import { DocumentSandboxApi } from "../../models/DocumentSandboxApi";
import "./App.css";
import "./output.css";

import { AddOnSDKAPI } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
import ActionMenu from "./ActionMenu";
import MainMenu from "./MainMenu";
import type { ActionGroup } from "../util/types";
import { ActionGroupSchema } from "../util/types";
import { useStore } from "../util/stores";
import { z } from "zod";
import { nanoid } from "nanoid";

import { base64_image } from "./temp";

function blobToBase64(blob: Blob) {
	return new Promise((resolve, _) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result);
		reader.readAsDataURL(blob);
	});
}

const App = ({ addOnUISdk, sandboxProxy }: { addOnUISdk: AddOnSDKAPI; sandboxProxy: DocumentSandboxApi }) => {
    const storage = addOnUISdk.instance.clientStorage;

	const list = useStore((state) => state.actionGroups);
	const setList = useStore((state) => state.setActionGroups);
    const actionGroup = useStore((state) => state.actionGroup);

	async function handleGen() {
		const response = await addOnUISdk.app.document.createRenditions({
			range: addOnUISdk.constants.Range.currentPage,
			format: addOnUISdk.constants.RenditionFormat.png,
			// if range === specificPage
			// pageIds: [
			//     "7477a5e7-02b2-4b8d-9bf9-f09ef6f8b9fc",
			//     "d45ba3fc-a3df-4a87-80a5-655e5f8f0f96"
			// ]
		});
		console.log("response", response[0].blob);
		console.log("img", await blobToBase64(response[0].blob));
	}

    async function getFeedback(base64Image: string) {
		const form = new FormData();
		form.append('image', base64Image)
		const response = await fetch("https://localhost:5436/feedback", {
			method: "POST",
			body: form
		});
		const data = await response.json();
		return data['feedback'];
	}

	useEffect(() => {
		// Fetch for the data
	    storage.getItem("expressoList").then((i: ActionGroup[]) => {
	        if (typeof i === 'undefined') {
	            setList([
	                {
	                    list: ["a", "b", "c"],
	                    id: nanoid(),
	                    label: "Automation for Feedback",
	                    actions: []
	                },
	            ]);
	        } else {
	            const schema = z.array(ActionGroupSchema).parse(i);
	            setList(schema);
	        }
	    });
	}, []);

	useEffect(() => {
	    storage.setItem("expressoList", list);
	}, [list]);

	return (
		<div className="flex flex-col w-full h-full">
			{/* <ActionMenu /> */}
			{actionGroup === null ? (
				<MainMenu addOnSDKApi={addOnUISdk} />
			) : (
				<ActionMenu addOnSDKApi={addOnUISdk} />
			)}
		</div>
	);
};

export default App;
