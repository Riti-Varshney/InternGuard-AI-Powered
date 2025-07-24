import { DataProvider } from './Context/data.js';
import "./globals.css";
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <DataProvider>
          {children}
        </DataProvider>
      </body>
    </html>
  );
}
