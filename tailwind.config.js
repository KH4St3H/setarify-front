const { blackA, violet } = require("@radix-ui/colors");

// module.exports = {
//   content: ["./src/App.js"],
// 	theme: {
// 		extend: {
// 			colors: {
// 				...blackA,
// 				...violet,
// 			},
// 		},
// 	},
//   plugins: [],
// }
 
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/components/**/*.js", "./node_modules/flowbite/**/*.js"],
	theme: {
		extend: {
		},
	},
	plugins: [
		require('flowbite/plugin')
	],
};
