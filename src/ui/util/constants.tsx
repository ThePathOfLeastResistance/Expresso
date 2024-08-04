import React from "react";
import { Action } from "./types";

export const items: Omit<Action, 'uniqueId'>[] = [
	{ id: 1, title: "Post to Instagram", icon: <InstagramIcon className="w-5 h-5" /> },
	{ id: 2, title: "Send via email", icon: <InstagramIcon className="w-5 h-5" /> },
	{ id: 3, title: "Get feedback", icon: <ImageIcon className="w-5 h-5" /> },
	{ id: 4, title: "Get heatmap", icon: <LayersIcon className="w-5 h-5" /> },
	{ id: 5, title: "Generate description", icon: <LayersIcon className="w-5 h-5" /> },
	{ id: 6, title: "Generate tags", icon: <LayersIcon className="w-5 h-5" /> },
];

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


// function GmailIcon(props: React.HTMLAttributes<SVGElement>) {
// 	return (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
// 		<path fill-rule="evenodd" clip-rule="evenodd" d="M10.0812 4.83899C12.531 4.83899 14.517 6.82494 14.517 9.27474C14.517 10.2083 14.2286 11.0744 13.7361 11.789L16 14.0529L14.8594 15.1935L12.5955 12.9296C11.8809 13.4221 11.0148 13.7105 10.0812 13.7105C7.63144 13.7105 5.64549 11.7245 5.64549 9.27474C5.64549 6.82494 7.63144 4.83899 10.0812 4.83899ZM10.0812 6.45199C8.52228 6.45199 7.25849 7.71578 7.25849 9.27474C7.25849 10.8337 8.52228 12.0975 10.0812 12.0975C11.6402 12.0975 12.904 10.8337 12.904 9.27474C12.904 7.71578 11.6402 6.45199 10.0812 6.45199ZM4.85428 8.87145C4.84415 9.00455 4.83899 9.13904 4.83899 9.27474C4.83899 9.69113 4.88754 10.0962 4.97928 10.4845L0 10.4845V8.87149L4.85428 8.87145ZM3.226 0V8.06499H0.806499V0H3.226ZM6.45199 3.226L6.45189 5.49201C5.73624 6.17882 5.21508 7.06675 4.97928 8.06493L4.03249 8.06499V3.226H6.45199ZM9.67799 1.613L9.67797 4.04777C8.79163 4.1152 7.9669 4.40304 7.25847 4.8566L7.25849 1.613H9.67799ZM12.904 2.4195L12.904 4.85661C12.1956 4.40305 11.3709 4.11521 10.4845 4.04778L10.4845 2.4195H12.904Z" fill="black"/>
// 		</svg>)  