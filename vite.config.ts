import { sveltekit } from '@sveltejs/kit/vite';
import { generateSgSendRequest } from 'sendgrid-send';
import { defineConfig } from 'vite';
import sendgrid from './.env.sendgrid.json' assert { type: 'json' };

export default defineConfig({
	plugins: [
		sveltekit(),
		{
			name: 'Build End Notification',
			buildEnd: async (error) => {
				const message = !error
					? `git add . && git commit -m "data: build @${Date.now()}"`
					: error.message;

				const response = await fetch(
					generateSgSendRequest(
						{
							...sendgrid.body,
							subject: `[${process.env.npm_package_name}] Build ${!error ? 'Success' : 'Fail'}`,
							content: [{ type: 'text/html', value: `<pre>${message}</pre>` }]
						},
						sendgrid.key
					)
				);

				// Reference https://docs.sendgrid.com/api-reference/mail-send/mail-send
				if (!response.ok) console.error(await response.json());
			}
		}
	]
});
