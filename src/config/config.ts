const getAppConfig = () => ({
  port: process.env.PORT || 3000,
  database: {
    url: process.env.DATABASE_URL,
  },
  swagger: {
    title: 'Restaurant Management API',
    description: 'API documentation for Restaurant Management System',
    version: '1.0',
  },
});

export default getAppConfig;
