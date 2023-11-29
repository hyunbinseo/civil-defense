import { sendEmail } from 'new-request/dist/email/send-grid/v3';
import { execSync } from 'node:child_process';
import sendGrid from './email.json' assert { type: 'json' };

const startedAt = new Date().toISOString();
let isSuccessful = false;

try {
	for (const command of [
		'git fetch --all',
		'git reset --hard origin/main',
		'pnpm install',
		'pnpm build',
		'git add .',
		`git commit -m "build: ${startedAt}"`,
		'git push'
	]) {
		execSync(command);
	}
	isSuccessful = true;
} finally {
	await sendEmail(
		{
			personalizations: [{ to: sendGrid.to.map((email) => ({ email })) }],
			subject: `[civil-defense] ${startedAt}`,
			content: [{ type: 'text/plain', value: `Build ${isSuccessful ? 'succeeded' : 'failed'}.` }]
		},
		{ apiKey: sendGrid.apiKey, from: { email: sendGrid.from } }
	);
	process.exit(0);
}
