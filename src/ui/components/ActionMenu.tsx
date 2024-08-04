import { AddOnSDKAPI } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
import React, { useEffect, useState } from "react";
// import { ActionGroup } from "../util/types";
import { isInput, items } from "../util/constants";
import { useStore } from "../util/stores";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { nanoid } from "nanoid";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./Dropdown";
import DragItem from "./DragItem";
import { DocumentSandboxApi } from "../../models/DocumentSandboxApi";

const reorder = (
	list: {
		id: number;
		uniqueId: string;
	}[],
	startIndex: number,
	endIndex: number
): {
	id: number;
	uniqueId: string;
}[] => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

function blobToBase64(blob: Blob): Promise<any> {
	return new Promise((resolve, _) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result);
		reader.readAsDataURL(blob);
	});
}

export default function ActionMenu({ addOnSDKApi, sandboxProxy }: { addOnSDKApi: AddOnSDKAPI; sandboxProxy: DocumentSandboxApi }) {
	const addActionToGroup = useStore((state) => state.addActionToGroup);
	const modifyActionGroup = useStore((state) => state.modifyActionGroup);
	const actionGroup = useStore((state) => state.actionGroup);
	const gotoMenu = useStore((state) => state.gotoMenu);

	const [selected, setSelected] = useState<string | undefined>(undefined);
	const [page, setPage] = useState<[string, number]>(["currentPage", 0]);
	const [pages, setPages] = useState<string[]>([]);

	useEffect(() => {
		console.log("selected changed", selected, "Item", items[+(selected ?? 0)]);
		if (typeof selected !== "undefined") {
			addItem(Number(selected));
		}
	}, [selected]);

	useEffect(() => {
		sandboxProxy.getPageIds().then(setPages);
	}, []);

	function addItem(index: number) {
		if (!actionGroup) return;
		// setList();
		addActionToGroup(
			{
				...items[index],
				uniqueId: nanoid(),
			},
			actionGroup.id
		);
	}

	function onDragEnd(result: DropResult) {
		if (!result.destination || !actionGroup) {
			return;
		}

		const newItems = reorder(actionGroup.actions, result.source.index, result.destination.index);

		modifyActionGroup(actionGroup.id, newItems);
	}

	return (
		<>
			<div className="flex items-center justify-between border-b px-4 py-3">
				<h3 className="text-lg font-medium">Expresso</h3>
				<button
					id="runBtn"
					style={
						{
							"--border-radius": `8px`,
						} as React.CSSProperties
					}
					className={
						"disabled:opacity-50 disabled:cursor-not-allowed transition-opacity pointer text-sm ring-1 ring-slate-300 shadow-lg font-medium relative w-fit h-fit hover:bg-gray-100/90 px-3 py-1 place-items-center rounded-[--border-radius] bg-white p-3 text-black dark:bg-black dark:text-white"
					}
					onClick={async () => {
						const runBtn = document.getElementById("runBtn") as HTMLButtonElement;
						const runText = document.getElementById("runText") as HTMLSpanElement;
						runBtn.disabled = true;

						const length = actionGroup?.actions.length || 0;

						runText.textContent = "Run all 0/" + length;

						for (let i = 0; i < length; i++) {
							const act = actionGroup!.actions[i];
							let url = "";
							if (act.id === 1) {
								url = "email";
							} else if (act.id === 2) {
								url = "feedback";
							} else if (act.id === 3) {
								url = "heatmap";
							} else if (act.id === 4) {
								url = "description";
							} else if (act.id === 5) {
								url = "tags";
							} else if (act.id === 0) {
								const inp = document.getElementById(act.uniqueId + "inp") as HTMLInputElement;
								sandboxProxy.addWatermark(inp.value);
								runText.textContent = "Run all " + (i + 1) + "/" + length;
								continue;
							} else if (act.id === 6) {
                                url = "failure";
                            }
							if (url) {
								const reqUrl = "https://localhost:5436/" + url;
								const form = new FormData();

								async function handleGen(): Promise<any> {
									const response = await addOnSDKApi.app.document.createRenditions({
										range: page[0] === "currentPage" ? addOnSDKApi.constants.Range.currentPage : addOnSDKApi.constants.Range.specificPages,
										format: addOnSDKApi.constants.RenditionFormat.png,
                                        pageIds: page[0] === "currentPage" ? undefined : [page[0]]
									});
									const img = (await blobToBase64(response[0].blob)) as string;
									return img;
								}

								const img = (await handleGen()) as string;
								form.append("image", img);
                                if (act.id === 1) {
                                    form.append("to", (document.getElementById(act.uniqueId+"inp")! as HTMLInputElement).value);
                                }

								try {
									const response = await fetch(reqUrl, {
										method: "POST",
										body: form,
									});
									const text = (await response.json())["data"];
									if (text !== "OK") {
										const element = document.getElementById(act.uniqueId) as HTMLDivElement;
										element.innerHTML = '';
										const para = document.createElement("div");
										para.classList.add("bg-slate-100", "hp-style");
										para.innerHTML = text;
										// para.innerHTML = `<p class="bg-slate-100 hp-style">${text}</p>`;
										element.appendChild(para);
									}
								} catch {
									const element = document.getElementById(act.uniqueId) as HTMLDivElement;
									const para = document.createElement("div");
									para.classList.add("flex", "items-center", "justify-center", "text-red-500");
									para.innerHTML = "Failed";
									element.appendChild(para);
								}
								// TODO: display checkmark
							} else {
							}
							runText.textContent = "Run all " + (i + 1) + "/" + length;
						}
						runBtn.disabled = false;
						runText.textContent = "Run all";
					}}
				>
					<div
						style={
							{
								"--border-width": `1px`,
								"--border-radius": `8px`,
								"--shine-pulse-duration": `14s`,
								"--mask-linear-gradient": `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
								"--background-radial-gradient": `radial-gradient(transparent,transparent, ${[
									"#A07CFE",
									"#FE8FB5",
									"#FFBE7B",
								].join(",")},transparent,transparent)`,
							} as React.CSSProperties
						}
						className={`before:bg-shine-size before:absolute before:inset-0 before:aspect-square before:size-full before:rounded-[--border-radius] before:p-[--border-width] before:will-change-[background-position] before:content-[""] before:![-webkit-mask-composite:xor] before:![mask-composite:exclude] before:[background-image:--background-radial-gradient] before:[background-size:300%_300%] before:[mask:--mask-linear-gradient] motion-safe:before:animate-[shine-pulse_var(--shine-pulse-duration)_infinite_linear]`}
					></div>
					<span id="runText">Run all</span>
				</button>
			</div>
			<div className="w-full p-2">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<button className="flex items-center justify-center bg-slate-100 rounded-lg w-full py-1">Page: {page[1] === 0 ? "Current Page" : page[1]}</button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56 bg-white">
						<DropdownMenuLabel>Page to render</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuRadioGroup value={page[0] + "," + page[1]} onValueChange={(e) => setPage([e.split(",")[0], +e.split(",")[1]])}>
							<DropdownMenuRadioItem value={"currentPage,0"}>Current page</DropdownMenuRadioItem>
							{pages.map((id, idx) => (
								<DropdownMenuRadioItem value={id + "," + (idx+1)} key={id}>
									Page {idx + 1}
								</DropdownMenuRadioItem>
							))}
						</DropdownMenuRadioGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className="flex-1 overflow-y-auto space-y-4 p-4">
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId="actionMenu">
						{(provided) => (
							<div {...provided.droppableProps} ref={provided.innerRef}>
								{actionGroup?.actions.map((act, index) => (
									<Draggable key={act.uniqueId} draggableId={act.uniqueId} index={index}>
										{(provided, snapshot) => (
											<>
												<DragItem provided={provided} act={act} index={index} />
												{!snapshot.isDragging && (
													<div className="flex justify-center items-center" style={provided.draggableProps.style}>
														<DownIcon className="w-6 h-6" />
													</div>
												)}
											</>
										)}
									</Draggable>
								))}
							</div>
						)}
					</Droppable>
				</DragDropContext>
				<div className="flex justify-center items-center">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button className="flex items-center justify-center bg-slate-100 rounded-lg p-1">
								<PlusIcon className="w-4 h-4" />
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56 bg-white">
							<DropdownMenuLabel>Expresso actions</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuRadioGroup value={selected} onValueChange={setSelected}>
								{items.map((i) => (
									<DropdownMenuRadioItem value={i.id.toString()} key={i.id}>
										{i.title}
									</DropdownMenuRadioItem>
								))}
							</DropdownMenuRadioGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			<button className="absolute bottom-2 left-2 w-fit h-fit p-1 z-50 ring-1 ring-slate-300 shadow-lg rounded-md" onClick={gotoMenu}>
				<BackIcon className="h-5 w-5 p-5" />
			</button>
		</>
	);
}

function PlusIcon(props: React.HTMLAttributes<SVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M5 12h14" />
			<path d="M12 5v14" />
		</svg>
	);
}

function DownIcon(props: React.HTMLAttributes<SVGElement>) {
	return (
		<svg width="25" height="37" viewBox="0 0 25 37" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M12 1V36" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
			<path
				d="M24 25L15.7857 34.4173C15.3647 34.9168 14.8559 35.3152 14.2906 35.5873C13.7254 35.8597 13.1161 36 12.5 36C11.8839 36 11.2746 35.8597 10.7095 35.5873C10.1441 35.3152 9.63535 34.9168 9.21429 34.4173L1 25"
				stroke="black"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
}

function BackIcon(props: React.HTMLAttributes<SVGElement>) {
	return (
		<svg width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M10.125 22.9167H16.875C22.5 22.9167 24.75 20.8333 24.75 15.625V9.37499C24.75 4.16666 22.5 2.08333 16.875 2.08333H10.125C4.5 2.08333 2.25 4.16666 2.25 9.37499V15.625C2.25 20.8333 4.5 22.9167 10.125 22.9167Z"
				stroke="#292D32"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M10.125 16.021H15.66C17.5725 16.021 19.125 14.5835 19.125 12.8127C19.125 11.0419 17.5725 9.60439 15.66 9.60439H8.04377"
				stroke="#292D32"
				stroke-width="2"
				stroke-miterlimit="10"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M9.64125 11.2189L7.875 9.57304L9.64125 7.93762"
				stroke="#292D32"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
}
