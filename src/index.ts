import { Hono } from 'hono';

const app = new Hono();

const baseUrl = 'https://ame-x.net';

app.all('*', (c) => c.text('Test'));

export default {
	async fetch(request, env, ctx): Promise<Response> {
		return app.fetch(request, env, ctx);
	},
} satisfies ExportedHandler<Env>;
