const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Playfair Display Variable', ...defaultTheme.fontFamily.sans],
				georgia: ['Noto Serif Georgian Variable', ...defaultTheme.fontFamily.sans]
			},
			colors: {
				'black-brown': 'hsl(300, 3%, 12%)',
				ivory: 'hsl(60, 100%, 97%)',
				'ivory-transparent': 'hsla(60, 100%, 97%, 0.1)',
				'black-brown-dark': 'hsla(300, 3%, 9%, 1)'
			}, 
			backgroundImage: {
				'binding': "url('/src/assets/binding-dark.png')"
			},
			spacing: {
				'base-width': "min(100% - 3rem, 65ch)"
			}
		},
	},
	plugins: [],
}
