import type { AddOnSDKAPI } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
import React from "react";
import { useStore } from "../util/stores";
import { items } from "../util/constants";

export default function MainMenu({ addOnSDKApi }: { addOnSDKApi: AddOnSDKAPI }) {
	const list = useStore((state) => state.actionGroups);
	const setAction = useStore((state) => state.setActionGroup);

	// const [list, setList] = useState<ActionGroup[]>([]);

	return (
		<>
			<div className="flex items-center justify-between border-b px-4 py-3">
				<h3 className="text-lg font-medium">Expresso Menu</h3>
			</div>
			<div className="flex-1 overflow-y-auto space-y-4 p-4">
				<div className="relative">
					<h1 className="text-center peer w-fit ml-auto mr-auto">List of Automations</h1>
					<div
						role="tooltip"
						className="absolute inset-0 left-1/2 transform -translate-x-1/2 top-[calc(100%+8px)] w-fit h-fit text-nowrap hidden peer-hover:block peer-hover:opacity-100 z-10 px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 dark:bg-gray-700 before:content-[''] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:-translate-y-full before:border-8 before:border-[color:transparent_transparent_black_transparent]"
					>
						Select an automation
					</div>
				</div>
				{list.map((item) => (
					<button
						key={item.id}
						className="w-full border hover:border-black rounded-lg shadow-lg flex flex-col justify-center p-3 cursor-pointer"
						onClick={() => setAction(item)}
					>
						<div className="flex flex-row my-2">
							{item.actions.slice(0, 5).map((action, index) => (
								<h3 key={index} className="border border-black w-12 h-12 flex items-center justify-center p-1">
									{items[action.id].icon}
								</h3>
							))}

							{item.actions.length > 5 && (
								<span className="flex justify-center items-center ml-1">...</span>
							)}
						</div>
						<h3>{item.label}</h3>
					</button>
				))}
			</div>
		</>
	);
}
