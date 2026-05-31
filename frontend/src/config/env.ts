export const env = {
  apiBaseUrl: (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(
    /\/$/,
    '',
  ) || 'http://localhost:7777',
  appName: (import.meta.env.VITE_APP_NAME as string | undefined) || 'PayrollPro',
  useDemoAuth: import.meta.env.VITE_USE_DEMO_AUTH === 'true',
  demoEmail: (import.meta.env.VITE_DEMO_EMAIL as string | undefined) || 'admin@payrollpro.com',
  demoPassword: (import.meta.env.VITE_DEMO_PASSWORD as string | undefined) || 'admin123',
}
