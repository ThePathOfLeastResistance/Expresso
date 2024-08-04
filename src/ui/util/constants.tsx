import React from "react";
import { Action } from "./types";

export const items: Omit<Action, 'uniqueId'>[] = [
	{ id: 0, title: "Auto watermark", icon: <InstagramIcon className="w-5 h-5" /> },
	{ id: 1, title: "Send via email", icon: <GmailIcon className="w-5 h-5" /> },
	{ id: 2, title: "Get feedback", icon: <ImageIcon className="w-5 h-5" /> },
	{ id: 3, title: "Get heatmap", icon: <HeatIcon className="w-5 h-5" /> },
	{ id: 4, title: "Generate description", icon: <AIIcon className="w-5 h-5" /> },
	{ id: 5, title: "Generate tags", icon: <LayersIcon className="w-5 h-5" /> },
	{ id: 6, title: "Sync with Calendar", icon: <CalIcon className="w-5 h-5" /> }
];

export const isInput: { value: boolean, label: string, placeholder: string }[] = [
	{
		value: true,
		label: "Watermark text",
		placeholder: "Copyright 2024"
	},
	{
		value: true,
		label: "Email address",
		placeholder: "test@gmail.com"
	},
	{
		value: false,
		label: "",
		placeholder: ""
	},
	{
		value: false,
		label: "",
		placeholder: ""
	},
	{
		value: false,
		label: "",
		placeholder: ""
	},
	{
		value: false,
		label: "",
		placeholder: ""
	},
	{
		value: false,
		label: "",
		placeholder: ""
	},
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


function HeatIcon(props: React.HTMLAttributes<SVGElement>) {
	return (
	  <svg
		width="16"
		height="16"
		viewBox="0 0 16 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	  >
		<path
		  fill-rule="evenodd"
		  clip-rule="evenodd"
		  d="M10.0812 4.83899C12.531 4.83899 14.517 6.82494 14.517 9.27474C14.517 10.2083 14.2286 11.0744 13.7361 11.789L16 14.0529L14.8594 15.1935L12.5955 12.9296C11.8809 13.4221 11.0148 13.7105 10.0812 13.7105C7.63144 13.7105 5.64549 11.7245 5.64549 9.27474C5.64549 6.82494 7.63144 4.83899 10.0812 4.83899ZM10.0812 6.45199C8.52228 6.45199 7.25849 7.71578 7.25849 9.27474C7.25849 10.8337 8.52228 12.0975 10.0812 12.0975C11.6402 12.0975 12.904 10.8337 12.904 9.27474C12.904 7.71578 11.6402 6.45199 10.0812 6.45199ZM4.85428 8.87145C4.84415 9.00455 4.83899 9.13904 4.83899 9.27474C4.83899 9.69113 4.88754 10.0962 4.97928 10.4845L0 10.4845V8.87149L4.85428 8.87145ZM3.226 0V8.06499H0.806499V0H3.226ZM6.45199 3.226L6.45189 5.49201C5.73624 6.17882 5.21508 7.06675 4.97928 8.06493L4.03249 8.06499V3.226H6.45199ZM9.67799 1.613L9.67797 4.04777C8.79163 4.1152 7.9669 4.40304 7.25847 4.8566L7.25849 1.613H9.67799ZM12.904 2.4195L12.904 4.85661C12.1956 4.40305 11.3709 4.11521 10.4845 4.04778L10.4845 2.4195H12.904Z"
		  fill="black"
		/>
	  </svg>
	);
  }
  
  function AIIcon(props: React.HTMLAttributes<SVGElement>) {
	return (
	  <svg
		width="14"
		height="14"
		viewBox="0 0 14 14"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	  >
		<path
		  fill-rule="evenodd"
		  clip-rule="evenodd"
		  d="M11.6667 2.33333V11.6667H2.33333V2.33333H11.6667ZM6.2617 4.66667H5.35273L3.62702 9.33333H4.44706L4.77287 8.42104H6.83867L7.15749 9.33333H8.02693L6.2617 4.66667ZM9.48258 4.66667H8.66584V9.33333H9.48258V4.66667ZM5.80033 5.44962L6.61387 7.77777H4.99971L5.80033 5.44962ZM12.4444 9.33333H14V10.8889H12.4444V9.33333ZM3.11111 12.4444H4.66667V14H3.11111V12.4444ZM6.22222 12.4444H7.77778V14H6.22222V12.4444ZM3.11111 0H4.66667V1.55556H3.11111V0ZM9.33333 12.4444H10.8889V14H9.33333V12.4444ZM6.22222 0H7.77778V1.55556H6.22222V0ZM9.33333 0H10.8889V1.55556H9.33333V0ZM12.4444 6.22222H14V7.77778H12.4444V6.22222ZM0 9.33333H1.55556V10.8889H0V9.33333ZM12.4444 3.11111H14V4.66667H12.4444V3.11111ZM0 6.22222H1.55556V7.77778H0V6.22222ZM0 3.11111H1.55556V4.66667H0V3.11111Z"
		  fill="black"
		/>
	  </svg>
	);
  }
  
  function CalIcon(props: React.HTMLAttributes<SVGElement>) {
	return (
	  <svg
		width="15"
		height="15"
		viewBox="0 0 15 15"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	  >
		<g clip-path="url(#clip0_1_35)">
		  <path
			d="M11.4474 3.55263H3.55263V11.4474H11.4474V3.55263Z"
			fill="white"
		  />
		  <path
			d="M11.4474 15L15 11.4474L13.2237 11.1443L11.4474 11.4474L11.1232 13.0722L11.4474 15Z"
			fill="#EA4335"
		  />
		  <path
			d="M0 11.4474V13.8158C0 14.4701 0.529934 15 1.18421 15H3.55263L3.91739 13.2237L3.55263 11.4474L1.61714 11.1443L0 11.4474Z"
			fill="#188038"
		  />
		  <path
			d="M15 3.55263V1.18421C15 0.529934 14.4701 0 13.8158 0H11.4474C11.2312 0.881007 11.1232 1.52936 11.1232 1.94506C11.1232 2.36076 11.2312 2.89662 11.4474 3.55263C12.2331 3.77763 12.8252 3.89012 13.2237 3.89012C13.6222 3.89012 14.2143 3.77763 15 3.55263Z"
			fill="#1967D2"
		  />
		  <path d="M15 3.55263H11.4474V11.4474H15V3.55263Z" fill="#FBBC04" />
		  <path d="M11.4474 11.4474H3.55263V15H11.4474V11.4474Z" fill="#34A853" />
		  <path
			d="M11.4474 0H1.18421C0.529934 0 0 0.529934 0 1.18421V11.4474H3.55263V3.55263H11.4474V0Z"
			fill="#4285F4"
		  />
		  <path
			d="M5.17204 9.67697C4.87697 9.47763 4.6727 9.18651 4.56118 8.80164L5.24605 8.51941C5.30822 8.75625 5.41678 8.9398 5.57171 9.07006C5.72566 9.20033 5.91316 9.26447 6.13224 9.26447C6.35625 9.26447 6.54868 9.19638 6.70954 9.06019C6.87039 8.92401 6.95132 8.75033 6.95132 8.54013C6.95132 8.325 6.86645 8.14934 6.69671 8.01316C6.52697 7.87697 6.31382 7.80888 6.05921 7.80888H5.66349V7.13092H6.01875C6.23783 7.13092 6.42237 7.07171 6.57237 6.95329C6.72237 6.83487 6.79737 6.67302 6.79737 6.46677C6.79737 6.28322 6.73026 6.13717 6.59605 6.02763C6.46184 5.91809 6.29211 5.86283 6.08586 5.86283C5.88454 5.86283 5.72467 5.91612 5.60625 6.02368C5.48791 6.13153 5.39893 6.26771 5.3477 6.41941L4.66974 6.13717C4.75954 5.88256 4.92434 5.65756 5.16612 5.46316C5.40789 5.26875 5.71678 5.17105 6.09178 5.17105C6.36908 5.17105 6.61875 5.22434 6.8398 5.33191C7.06086 5.43947 7.23454 5.58849 7.35987 5.77796C7.4852 5.96842 7.54737 6.18158 7.54737 6.41842C7.54737 6.6602 7.48914 6.86447 7.3727 7.03224C7.25625 7.2 7.11316 7.32829 6.94342 7.41809V7.45855C7.16259 7.54891 7.35297 7.69733 7.49408 7.88783C7.63717 8.08026 7.70921 8.31019 7.70921 8.57862C7.70921 8.84704 7.64112 9.08684 7.50493 9.29704C7.36875 9.50724 7.18026 9.67302 6.94145 9.79342C6.70164 9.91381 6.43224 9.97501 6.13322 9.97501C5.78684 9.97598 5.4671 9.87631 5.17204 9.67697ZM9.37895 6.27829L8.62697 6.82204L8.25099 6.25164L9.6 5.27862H10.1171V9.86842H9.37895V6.27829Z"
			fill="#4285F4"
		  />
		</g>
		<defs>
		  <clipPath id="clip0_1_35">
			<rect width="15" height="15" fill="white" />
		  </clipPath>
		</defs>
	  </svg>
	);
  }
  
  function GmailIcon(props: React.HTMLAttributes<SVGElement>) {
	return (
	  <svg
		width="21"
		height="15"
		viewBox="0 0 21 15"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	  >
		<path
		  d="M4.5627 15V7.09874L0 3.59325V13.3307C0 14.4436 0.556427 15 1.66928 15"
		  fill="#4285F4"
		/>
		<path
		  d="M4.34013 7.0431L10.0157 11.3276L15.6912 7.0431V1.59012L10.0157 5.8746L4.34013 1.59012"
		  fill="#EA4335"
		/>
		<path
		  d="M15.4687 15V7.09874L20.0314 3.59325V13.3307C20.0314 14.4436 19.4749 15 18.3621 15"
		  fill="#34A853"
		/>
		<path
		  d="M0 3.70454L4.5627 7.21003V1.75704L2.89342 0.477262C1.39107 -0.691234 0 0.477262 0 1.92397"
		  fill="#C5221F"
		/>
		<path
		  d="M20.0314 3.70454L15.4687 7.21003V1.75704L17.1379 0.477262C18.6403 -0.691234 20.0314 0.477262 20.0314 1.92397"
		  fill="#FBBC04"
		/>
	  </svg>
	);
  }
  
  function NotIcon(props: React.HTMLAttributes<SVGElement>) {
	return (
	  <svg
		width="14"
		height="15"
		viewBox="0 0 14 15"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	  >
		<path
		  fill-rule="evenodd"
		  clip-rule="evenodd"
		  d="M8.25 12C8.25 12.8284 7.57843 13.5 6.75 13.5C5.92157 13.5 5.25 12.8284 5.25 12H8.25ZM6.75 0C3.8475 0 1.5 2.685 1.5 6V7.7175L0 12H3.75C3.75 13.6569 5.09315 15 6.75 15C8.40685 15 9.75 13.6569 9.75 12H13.5L12 7.7175V6.2175C12 3.375 10.3425 0.7725 7.9125 0.2175C7.53526 0.0980908 7.14489 0.0250535 6.75 0ZM2.115 10.5L2.9175 8.25L3 7.9725V6C3 3.5175 4.68 1.5 6.75 1.5C7.02048 1.49956 7.28999 1.53231 7.5525 1.5975C9.2325 2.01 10.5 3.9825 10.5 6.18V7.9725L10.5825 8.2125L11.385 10.5H2.115Z"
		  fill="black"
		/>
	  </svg>
	);
  }
  
function DownIcon(props: React.HTMLAttributes<SVGElement>) {
	return (
		<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M11.9297 2V22" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
		<path d="M19 16L14 21.1599C13.7437 21.4336 13.434 21.6519 13.0899 21.801C12.7459 21.9502 12.375 22.0271 12 22.0271C11.625 22.0271 11.2541 21.9502 10.9101 21.801C10.566 21.6519 10.2563 21.4336 10 21.1599L5 16" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
	);
}

