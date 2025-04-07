import { execSync } from 'node:child_process';

const commands = /** @type {const} */ ([
	'git fetch --all',
	'git reset --hard origin/main',
	'pnpm install',
	'node --run build',
	'node --run format:build',
	'git add .',
	`git commit -m "build: ${new Date().toISOString()}"`,
	'git push',
	'node --run deploy'
]);

for (const command of commands) {
	execSync(command, { stdio: command === 'node --run build' ? 'inherit' : 'pipe' });
}
