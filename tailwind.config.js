/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: ['alert-warning', 'alert-success', 'alert-error', 'alert-info'],
	theme: {
		extend: {}
	},
	daisyui: {
		themes: ['corporate', 'dark']
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')]
};
