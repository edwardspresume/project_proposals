import svelte from '@astrojs/svelte';
import vercel from '@astrojs/vercel/serverless';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    integrations: [svelte()],
    output: 'server',
    adapter: vercel(),
});
