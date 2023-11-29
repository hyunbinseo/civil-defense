import { SendGridSendEmail3 } from 'new-request';
import { execSync } from 'node:child_process';
import sendGrid from './email.json' assert { type: 'json' };

const startedAt = new Date().toISOString();
let isSuccessful = false;

const commands = /** @type {const} */ ([
	'git fetch --all',
	'git reset --hard origin/main',
	'pnpm install',
	'pnpm build',
	'git add .',
	`git commit -m "build: ${startedAt}"`,
	'git push'
]);

try {
	for (const command of commands) {
		execSync(command, { stdio: command === 'pnpm build' ? 'inherit' : 'pipe' });
	}
	isSuccessful = true;
} finally {
	await SendGridSendEmail3(
		{
			personalizations: [{ to: sendGrid.to.map((email) => ({ email })) }],
			subject: `[civil-defense] ${startedAt}`,
			content: [{ type: 'text/plain', value: `Build ${isSuccessful ? 'succeeded' : 'failed'}.` }]
		},
		{ apiKey: sendGrid.apiKey, from: { email: sendGrid.from } }
	);
	process.exit(0);
}
