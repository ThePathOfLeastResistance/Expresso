import React, { useState } from "react";
import { isInput, items } from "../util/constants";
import { useStore } from "../util/stores";
import { DraggableProvided } from "react-beautiful-dnd";

export default function DragItem({
    provided,
    act,
    index
}: {
    provided: DraggableProvided,
    act: { id: number, uniqueId: string },
    index: number
}) {
    const [active, setActive] = useState<boolean>(false);
    const [value, setValue] = useState<string>(isInput[act.id].placeholder);

	const modifyActionGroup = useStore((state) => state.modifyActionGroup);
	const actionGroup = useStore((state) => state.actionGroup);

    function deleteItem(uniqueId: string) {
        if (!actionGroup) return;

        const newItems = actionGroup.actions.filter((ac) => ac.uniqueId !== uniqueId);

        modifyActionGroup(actionGroup.id, newItems);
    }

	return (
		<div
			ref={provided.innerRef}
			className="drag-item flex flex-col items-center justify-between bg-slate-100 rounded-md p-3 my-2 transitions-all"
			{...provided.draggableProps}
		>
			<div className={"flex flex-row items-center gap-3 w-full " + (isInput[act.id].value && "cursor-pointer")} onClick={() => setActive(a => !a)}>
				<div>{index + 1}.</div>
				<div className="rounded-full p-2">{items[act.id].icon}</div>
				<div className="flex-1">{items[act.id].title}</div>
				<div {...provided.dragHandleProps}>
					<HandleIcon className="h-5 w-5" />
				</div>
				<button onClick={() => deleteItem(act.uniqueId)}>
					<TrashIcon className="h-5 w-5" />
				</button>
			</div>
			<div className="w-full" id={act.uniqueId}></div>
            {isInput[act.id].value && (
                <div className={"flex flex-row w-full justify-between items-center " + (!active && "hidden")}>
                    <label htmlFor={act.uniqueId+"inp"} className="text-xs text-center">{isInput[act.id].label}</label>
                    <input id={act.uniqueId+"inp"} className="px-1 rounded-md" value={value} onChange={(e) => setValue(e.target.value)} />
                </div>
            )}
		</div>
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

function HandleIcon(props: React.HTMLAttributes<SVGElement>) {
	return (
		<svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path
				d="M1.16666 0C0.519526 0 -4.88758e-06 0.447917 -4.88758e-06 1C-4.88758e-06 1.55208 0.519526 2 1.16666 2C1.81076 2 2.33333 1.55208 2.33333 1C2.33333 0.447917 1.81076 0 1.16666 0ZM5.83333 0C5.18619 0 4.66666 0.447917 4.66666 1C4.66666 1.55208 5.18619 2 5.83333 2C6.47743 2 7 1.55208 7 1C7 0.447917 6.47743 0 5.83333 0ZM1.16666 4C0.519526 4 -4.88758e-06 4.44792 -4.88758e-06 5C-4.88758e-06 5.55208 0.519526 6 1.16666 6C1.81076 6 2.33333 5.55208 2.33333 5C2.33333 4.44792 1.81076 4 1.16666 4ZM5.83333 4C5.18619 4 4.66666 4.44792 4.66666 5C4.66666 5.55208 5.18619 6 5.83333 6C6.47743 6 7 5.55208 7 5C7 4.44792 6.47743 4 5.83333 4ZM1.16666 8C0.519526 8 -4.88758e-06 8.44792 -4.88758e-06 9C-4.88758e-06 9.55208 0.519526 10 1.16666 10C1.81076 10 2.33333 9.55208 2.33333 9C2.33333 8.44792 1.81076 8 1.16666 8ZM5.83333 8C5.18619 8 4.66666 8.44792 4.66666 9C4.66666 9.55208 5.18619 10 5.83333 10C6.47743 10 7 9.55208 7 9C7 8.44792 6.47743 8 5.83333 8Z"
				fill="#2E3436"
			/>
		</svg>
	);
}