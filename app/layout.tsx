import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import AgeGate from '@/components/ui/AgeGate';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import CartDrawer from '@/components/ui/CartDrawer';

const inter = Inter({ subsets: ['latin'], variable: '--font-body' });
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: "Don Peper — L'Art du Rhum Infusé",
  description:
    "Rhums arrangés artisanaux aux fruits. Fraise, raisin, myrtille, ananas et plus encore. Infusion naturelle, édition limitée.",
  keywords: ['rhum', 'rhum arrangé', 'artisanal', 'fruit', 'infusion', 'don peper'],
  openGraph: {
    title: "Don Peper — L'Art du Rhum Infusé",
    description: 'Rhums arrangés artisanaux aux fruits. Édition limitée.',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Don Peper',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${cormorant.variable} noise`}>
      <body className="bg-dp-bg text-dp-ink min-h-screen antialiased">
        <AgeGate />
        <Navbar />
        <CartDrawer />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
