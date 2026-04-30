import Navbar from '@/components/layout/Navbar';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Footer from '@/components/layout/Footer';
export const metadata = {
  title: 'Tile Gallery | Discover Your Perfect Aesthetic',
  description: 'A premium collection of artistic tiles for modern interiors.',
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className="antialiased min-h-screen flex flex-col">
        <Navbar/>
        <main className="flex-grow">{children}</main>
        <Footer/>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
