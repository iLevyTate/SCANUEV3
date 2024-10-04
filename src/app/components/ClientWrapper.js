// src/app/components/ClientWrapper.js
'use client'; // Marks as Client Component

import { ThemeProvider } from '@material-tailwind/react';

export default function ClientWrapper({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
