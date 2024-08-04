import type { AddOnSDKAPI } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
import React from "react";
import { useStore } from "../util/stores";
import { items } from "../util/constants";
import { nanoid } from "nanoid";
import EditLabel from "./EditLabel";
import Logo from "./Logo";

export default function MainMenu({ addOnSDKApi }: { addOnSDKApi: AddOnSDKAPI }) {
	const list = useStore((state) => state.actionGroups);
	const setAction = useStore((state) => state.setActionGroup);
    const addActionGroup = useStore((state) => state.addActionGroup);
    const deleteActionGroup = useStore((state) => state.deleteActionGroup);

	function createActionGroup() {
        addActionGroup({
            id: nanoid(),
            label: "New action group",
            actions: []
        });
    }

	return (
		<>
			<div className="flex items-center justify-between border-b px-4 py-3">
                <div className="flex flex-row">
                    <Logo className="h-6 w-6 mr-2" />
                    <h3 className="text-lg font-medium">Expresso Menu</h3>
                </div>
			</div>
			<div className="flex flex-col flex-1 overflow-y-auto space-y-4 p-4">
				<div className="relative">
					<h1 className="text-center peer w-fit ml-auto mr-auto">List of Action Groups</h1>
					<div
						role="tooltip"
						className="absolute inset-0 left-1/2 transform -translate-x-1/2 top-[calc(100%+8px)] w-fit h-fit text-nowrap hidden peer-hover:block peer-hover:opacity-100 z-10 px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 before:content-[''] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:-translate-y-full before:border-8 before:border-[color:transparent_transparent_black_transparent]"
					>
						Select an automated action group
					</div>
				</div>
				{list.map((item) => (
					<button
						key={item.id}
						className="relative w-full border hover:border-black rounded-lg shadow-lg flex flex-col justify-center p-3"
                        onClick={() => setAction(item)}
					>
                        <button className="absolute top-1 right-1 cursor-grab" onClick={(ev) => ev.stopPropagation()} onDoubleClick={() => deleteActionGroup(item.id)}>
                            <TrashIcon className="w-3 h-3" />
                        </button>
						<div className="flex flex-row my-2 cursor-pointer">
							{item.actions.slice(0, 5).map((action, index) => (
								<h3 key={index} className="border border-black w-12 h-12 flex items-center justify-center p-1">
									{items[action.id].icon}
								</h3>
							))}

							{item.actions.length > 5 && (
								<span className="flex justify-center items-center ml-1">...</span>
							)}
						</div>
						<EditLabel id={item.id}>{item.label}</EditLabel>
					</button>
				))}
                <button className="py-auto p-2 hover:bg-slate-100 self-center m-2 ring-1 ring-slate-300 rounded-lg" onClick={createActionGroup}>Create new action group</button>
			</div>
		</>
	);
}


function TrashIcon(props: React.HTMLAttributes<SVGElement>) {
	return (
		<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path
				d="M7 10L11 14M11 10L7 14M1 4H17M13 4L12.7294 3.18807C12.4671 2.40125 12.3359 2.00784 12.0927 1.71698C11.8779 1.46013 11.6021 1.26132 11.2905 1.13878C10.9376 1 10.523 1 9.6936 1H8.3064C7.477 1 7.0624 1 6.70951 1.13878C6.39792 1.26132 6.12208 1.46013 5.90729 1.71698C5.66405 2.00784 5.53292 2.40125 5.27064 3.18807L5 4M15 4V14.2C15 15.8802 15 16.7202 14.673 17.362C14.3854 17.9265 13.9265 18.3854 13.362 18.673C12.7202 19 11.8802 19 10.2 19H7.8C6.11984 19 5.27976 19 4.63803 18.673C4.07354 18.3854 3.6146 17.9265 3.32698 17.362C3 16.7202 3 15.8802 3 14.2V4"
				stroke="black"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
}
