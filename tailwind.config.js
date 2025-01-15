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
	content: ["./src/App.js", "./src/components/auth.js"],
	theme: {
		extend: {
		},
	},
	plugins: [],
};
