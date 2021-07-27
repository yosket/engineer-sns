module.exports = {
  reactStrictMode: true,

  env: {
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
    GA_TRACKING_ID: process.env.GA_TRACKING_ID || '',
  },
}
