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
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/components/**/*.js"],
	theme: {
		extend: {
		},
	},
	plugins: [
	],
};
