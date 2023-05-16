import { sveltekit } from '@sveltejs/kit/vite';
import { generateSgSendRequest } from 'sendgrid-send';
import { defineConfig } from 'vite';
import sendgrid from './.env.sendgrid.json' assert { type: 'json' };

export default defineConfig(({ command }) => ({
	plugins: [
		sveltekit(),
		{
			name: 'Build End Notification',
			buildEnd: async (error) => {
				if (command !== 'build') return;

				const now = new Date();

				const subject = `[${process.env.npm_package_name}] ${now.toISOString()}`;

				const message = !error
					? `git commit -m "data: build @${now.getTime()}"`
					: error.message || 'Build failed with no error message.';

				const response = await fetch(
					generateSgSendRequest(
						{
							...sendgrid.body,
							subject,
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
}));
