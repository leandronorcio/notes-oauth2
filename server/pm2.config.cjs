module.exports = {
  apps: [
    {
      name: 'notes-api',
      script: 'npm',
      args: 'start',
      interpreter: 'none',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    },
  ],
};
