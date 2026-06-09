import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Script from 'next/script';
import Provider from '../context/Provider';
import SessionClientProvider from './session-client-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'UaiTay',
  description: 'Sistema de pedidos da UaiTay Comida Chinesa',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body
        style={{
          margin: 0,
          padding: 0,
        }}
        className={inter.className}
      >
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_API_MAPS_GOOGLE}&libraries=places`}
          strategy="beforeInteractive"
        />
        <SessionClientProvider>
          <ToastContainer />
          <Provider>{children}</Provider>
        </SessionClientProvider>
      </body>
    </html>
  );
}
