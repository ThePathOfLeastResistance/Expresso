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

const App = ({ addOnUISdk, sandboxProxy }: { addOnUISdk: AddOnSDKAPI; sandboxProxy: DocumentSandboxApi }) => {
    const storage = addOnUISdk.instance.clientStorage;

	const list = useStore((state) => state.actionGroups);
	const setList = useStore((state) => state.setActionGroups);
    const actionGroup = useStore((state) => state.actionGroup);

	useEffect(() => {
		// Fetch for the data
	    storage.getItem("expressoList").then((i: ActionGroup[]) => {
            // (i as any) = undefined;
	        if (typeof i === 'undefined') {
	            setList([
	                {
	                    id: nanoid(),
	                    label: "Automation for Feedback",
	                    actions: [{
                            id: 0,
                            uniqueId: nanoid()
                        }]
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
				<ActionMenu addOnSDKApi={addOnUISdk} sandboxProxy={sandboxProxy} />
			)}
		</div>
	);
};

export default App;
