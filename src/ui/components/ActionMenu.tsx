import { AddOnSDKAPI } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
import React, { useState } from "react";
// import { ActionGroup } from "../util/types";
import { items } from "../util/constants";
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

export default function ActionMenu({ addOnSDKApi }: { addOnSDKApi: AddOnSDKAPI }) {
	const addActionToGroup = useStore((state) => state.addActionToGroup);
	const modifyActionGroup = useStore((state) => state.modifyActionGroup);
	const actionGroup = useStore((state) => state.actionGroup);
	const gotoMenu = useStore((state) => state.gotoMenu);

    const [selected, setSelected] = useState<string>("0");

	function addItem() {
		if (!actionGroup) return;
		// setList();
		addActionToGroup(
			{
				...items[1],
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
				<div
					style={
						{
							"--border-radius": `8px`,
						} as React.CSSProperties
					}
					className={
						"text-sm ring-1 ring-slate-300 shadow-lg font-medium relative w-fit h-fit hover:bg-gray-100/90 px-3 py-1 place-items-center rounded-[--border-radius] bg-white p-3 text-black dark:bg-black dark:text-white"
					}
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
					<span>Run</span>
				</div>
			</div>
			<div className="flex-1 overflow-y-auto space-y-4 p-4">
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId="actionMenu">
						{(provided) => (
							<div {...provided.droppableProps} ref={provided.innerRef}>
								{actionGroup?.actions.map((act, index) => (
									<Draggable key={act.uniqueId} draggableId={act.uniqueId} index={index}>
										{(provided) => (
											<div
												ref={provided.innerRef}
												className="flex items-center justify-between bg-slate-100 rounded-md p-3"
												{...provided.draggableProps}
											>
												<div className="flex items-center gap-3">
													<div className="">{index + 1}.</div>
													<div className="rounded-full p-2">{items[act.id].icon}</div>
													<div>{items[act.id].title}</div>
													<div {...provided.dragHandleProps}><HandleIcon className="h-5 w-5 py-5" /></div>
												</div>
											</div>
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
							<button className="flex items-center justify-center bg-slate-100 rounded-lg p-1" onClick={addItem}>
								<PlusIcon className="w-4 h-4" />
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56">
							<DropdownMenuLabel>Panel Position</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuRadioGroup value={selected} onValueChange={setSelected}>
                                {items.map((i) => (
                                    <DropdownMenuRadioItem value={i.id.toString()} key={i.id}>{i.title}</DropdownMenuRadioItem>
                                ))}
							</DropdownMenuRadioGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			<button className="absolute bottom-2 left-2 w-fit h-fit p-1 z-50 ring-1 ring-slate-300 shadow-lg rounded-md" onClick={gotoMenu}>
				Back
			</button>
		</>
	);
}

function HandleIcon(props: React.HTMLAttributes<SVGElement>) {
	return (
		<svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.16666 0C0.519526 0 -4.88758e-06 0.447917 -4.88758e-06 1C-4.88758e-06 1.55208 0.519526 2 1.16666 2C1.81076 2 2.33333 1.55208 2.33333 1C2.33333 0.447917 1.81076 0 1.16666 0ZM5.83333 0C5.18619 0 4.66666 0.447917 4.66666 1C4.66666 1.55208 5.18619 2 5.83333 2C6.47743 2 7 1.55208 7 1C7 0.447917 6.47743 0 5.83333 0ZM1.16666 4C0.519526 4 -4.88758e-06 4.44792 -4.88758e-06 5C-4.88758e-06 5.55208 0.519526 6 1.16666 6C1.81076 6 2.33333 5.55208 2.33333 5C2.33333 4.44792 1.81076 4 1.16666 4ZM5.83333 4C5.18619 4 4.66666 4.44792 4.66666 5C4.66666 5.55208 5.18619 6 5.83333 6C6.47743 6 7 5.55208 7 5C7 4.44792 6.47743 4 5.83333 4ZM1.16666 8C0.519526 8 -4.88758e-06 8.44792 -4.88758e-06 9C-4.88758e-06 9.55208 0.519526 10 1.16666 10C1.81076 10 2.33333 9.55208 2.33333 9C2.33333 8.44792 1.81076 8 1.16666 8ZM5.83333 8C5.18619 8 4.66666 8.44792 4.66666 9C4.66666 9.55208 5.18619 10 5.83333 10C6.47743 10 7 9.55208 7 9C7 8.44792 6.47743 8 5.83333 8Z" fill="#2E3436"/>
</svg>

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
