module.exports = {
  apps : [{
    name: 'dev-planetexpress',
		script: 'quasar',
    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'dev --api=dev',
    instances: 1,
    autorestart: true,
    watch: true,
    max_memory_restart: '1G',
    env: {
			api: 'dev',
    },
  },
  {
    name: 'prod-planetexpress',
		script: 'node serve.js',
    instances: 2,
    autorestart: true,
    watch: true,
    max_memory_restart: '1G',
    env: {
			api: 'prod',
    },
  }]
};

    // "dev": "cross-env api=dev pm2 start ecosystem.config.js",
