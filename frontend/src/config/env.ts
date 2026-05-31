export const env = {
  apiBaseUrl: (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(
    /\/$/,
    '',
  ) || 'http://localhost:7777',
  appName: (import.meta.env.VITE_APP_NAME as string | undefined) || 'PayrollPro',
}
