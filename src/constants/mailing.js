export const SMTP_HOST = process.env.SMTP_HOST ?? 'smtp.ethereal.email';
export const SMTP_PORT = Number(process.env.SMTP_PORT ?? 587);
export const SMTP_SECURE =
  process.env.SMTP_SECURE === undefined
    ? false
    : process.env.SMTP_SECURE !== 'false';
export const SMTP_USER = process.env.SMTP_USER ?? 'dortha52@ethereal.email';
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD ?? 'wvbEjmw8EvfXR4GCbP';
