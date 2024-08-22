import { execSync } from 'node:child_process';

const commands = /** @type {const} */ ([
	'git fetch --all',
	'git reset --hard origin/main',
	'pnpm install',
	'pnpm build',
	'git add .',
	`git commit -m "build: ${new Date().toISOString()}"`,
	'git push'
]);

for (const command of commands) {
	execSync(command, { stdio: command === 'pnpm build' ? 'inherit' : 'pipe' });
}
