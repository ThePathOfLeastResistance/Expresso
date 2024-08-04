import React from "react";
import { DocumentSandboxApi } from "../../models/DocumentSandboxApi";
import "./App.css";
import "./output.css";

import { AddOnSDKAPI } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

import { base64_image } from "./temp";

function blobToBase64(blob: Blob) {
	return new Promise((resolve, _) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result);
		reader.readAsDataURL(blob);
	});
}

const App = ({ addOnUISdk, sandboxProxy }: { addOnUISdk: AddOnSDKAPI; sandboxProxy: DocumentSandboxApi }) => {
	// function handleClick() {
	// 	sandboxProxy.createRectangle();
	// }

	async function handleGen() {
		const response = await addOnUISdk.app.document.createRenditions({
			range: addOnUISdk.constants.Range.currentPage,
			format: addOnUISdk.constants.RenditionFormat.png,
		});
		console.log("response", response[0].blob);
		console.log("img", await blobToBase64(response[0].blob));
	}

	async function getFeedback(base64Image: string) {
		const form = new FormData();
		form.append('image', base64Image)
		const response = await fetch("https://localhost:5436/saliency", {
			method: "POST",
			body: form
		});
		const data = await response.json();
		return data['feedback'];
	}

	return (
		<div className="flex flex-col w-full h-full">
			{/* <Button size="m" onClick={handleClick}>
                Create Rectangle
            </Button> */}
			{/* <button className="rounded-full bg-blue-400 mx-4 py-1" onClick={handleGen}>Generate</button>
            <button className="h-12 w-12 border border-red-500">t</button> */}
			<div className="flex items-center justify-between border-b px-4 py-3">
				<h3 className="text-lg font-medium" onClick={async () => {
					console.log(await getFeedback(base64_image));
				}}>Run Procedure</h3>
				<button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-1 ring-slate-300 disabled:pointer-events-none disabled:opacity-50 bg-white text-black hover:bg-gray-100/90 h-10 px-3">
					Run
				</button>
			</div>
			{/* <div className="flex-1 overflow-y-auto px-4 py-6"> */}
			<div className="flex-1 overflow-y-auto space-y-4 p-4">
				<div className="flex items-center justify-between bg-slate-100 rounded-md p-3 cursor-grab">
					<div className="flex items-center gap-3">
						<div className="bg-muted rounded-full p-2">
							<InstagramIcon className="w-5 h-5" />
						</div>
						<div>Post to Instagram</div>
					</div>
					{/* <Button variant="ghost" size="icon">
						<PlusIcon className="w-4 h-4" />
						<span className="sr-only">Add</span>
					</Button> */}
				</div>
				<div className="flex items-center justify-between bg-slate-100 rounded-md p-3 cursor-grab">
					<div className="flex items-center gap-3">
						<div className="bg-muted rounded-full p-2">
							<ImageIcon className="w-5 h-5" />
						</div>
						<div>Generate Image</div>
					</div>
					{/* <button variant="ghost" size="icon">
						<PlusIcon className="w-4 h-4" />
						<span className="sr-only">Add</span>
					</button> */}
				</div>
				<div className="flex items-center justify-between bg-slate-100 rounded-md p-3 cursor-grab">
					<div className="flex items-center gap-3">
						<div className="bg-muted rounded-full p-2">
							<LayersIcon className="w-5 h-5" />
						</div>
						<div>Generate Samples</div>
					</div>
					{/* <button>
						<PlusIcon className="w-4 h-4" />
						<span className="sr-only">Add</span>
					</button> */}
				</div>
                <div className="flex justify-center items-center">
                    <button className="flex items-center justify-center bg-slate-100 rounded-lg p-1">
                        <PlusIcon className="w-4 h-4" />
                    </button>
                </div>
			</div>
		</div>
	);
};

function ImageIcon(props: React.HTMLAttributes<SVGElement>) {
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
			<rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
			<circle cx="9" cy="9" r="2" />
			<path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
		</svg>
	);
}

function InstagramIcon(props: React.HTMLAttributes<SVGElement>) {
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
			<rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
			<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
			<line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
		</svg>
	);
}

function LayersIcon(props: React.HTMLAttributes<SVGElement>) {
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
			<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
			<path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
			<path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
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

export default App;
