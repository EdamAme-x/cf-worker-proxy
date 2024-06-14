import { Context, Hono } from 'hono';

const app = new Hono();

const baseUrl = 'https://ame-x.net';

app.all('*', async (c: Context) => {
	const urlObj = new URL(c.req.url);
	const pathNameAndQuery = `${urlObj.pathname}${urlObj.search}`;
	const method = c.req.method;
	const headers = c.req.raw.headers;
	const body = c.req.raw.body;
	const buildedUrl = `${baseUrl}${pathNameAndQuery}`;
	const response = await fetch(buildedUrl, {
		method,
		headers,
		body,
	});

	const redirectDetect = response.headers.get('Location');
	if (redirectDetect && redirectDetect.includes(baseUrl)) {
		response.headers.set('Location', redirectDetect.replace(baseUrl, ''));
	}

	return response as unknown as Response;
});

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const urlObj = new URL(request.url);
		console.log(`[LOG]:"${request.method}":"${new Date().getTime()}":"${urlObj.pathname}${urlObj.search}"`);
		return app.fetch(request, env, ctx);
	},
} satisfies ExportedHandler<Env>;
