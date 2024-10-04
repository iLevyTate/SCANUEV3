// src/app/layout.js
import './globals.css'; // Corrected import path
import ClientWrapper from './components/ClientWrapper';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
