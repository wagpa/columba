import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite'
import { socketDevServer } from "./server/socket-server";

export default defineConfig({
	server: {
		port: 3000,
	},
	preview: {
		port: 3000,
	},
	plugins: [
		sveltekit(),
		Icons({
			compiler: 'svelte',
		}),
		socketDevServer,
	],
});
