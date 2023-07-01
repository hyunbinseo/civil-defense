module.exports = {
	apps: [
		{
			name: 'Build Minbangwi',
			script: './cli/build.js',
			time: true,
			autorestart: false,
			cron_restart: '00 12 * * WED'
		}
	]
};
