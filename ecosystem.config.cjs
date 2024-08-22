/* If an error is thrown in this file, instance(s) are not launched.

[PM2] Spawning PM2 daemon with ~
[PM2] PM2 Successfully daemonized
[PM2][ERROR] File ecosystem.config.cjs malformated
Error: System time-zone is not UTC. (Current: Asia/Seoul)
*/

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { defineApp } = require('pm2-ecosystem');

module.exports = {
	apps: [
		defineApp({
			name: 'civil-defense',
			script: [
				'git fetch --all',
				'git reset --hard origin/main',
				'pnpm install',
				'node --run build',
				'git add .',
				'git commit -m "build: `TZ=UTC date +\'%Y-%m-%dT%H:%M:%SZ\'`"',
				'git push'
			].join(' && '),
			time: true,
			autorestart: false,
			cron: '00 03 * * WED'
		})
	]
};
