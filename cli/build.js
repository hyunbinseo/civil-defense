// @ts-check

import { execSync } from 'node:child_process';
import { generateSgSendRequest } from 'sendgrid-send';
import sendgrid from '../.env.sendgrid.json' assert { type: 'json' };

let success = true;

try {
	execSync('git fetch --all');
	execSync('git reset --hard origin/main');
	execSync('npm install');
	execSync('npm run build', { stdio: 'inherit' });
	execSync('git add .');
	execSync(`git commit -m "build: ${new Date().toISOString()}"`);
} catch {
	success = false;
} finally {
	await fetch(
		generateSgSendRequest(
			{
				...sendgrid.body,
				subject: `[civil-defense] ${new Date().toISOString()}`,
				content: [{ type: 'text/plain', value: `Build ${success ? 'succeeded' : 'failed'}.` }]
			},
			sendgrid.key
		)
	);
}
