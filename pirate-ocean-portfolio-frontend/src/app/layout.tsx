import type { Metadata } from 'next';
import { Cinzel, Inter } from 'next/font/google';
import './globals.css';

// Display font — used for headings, logo, island names
const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['400', '600', '700'],
  display: 'swap',
});

// Body font — used for all UI text, labels, descriptions
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "The Developer's Voyage",
  description:
    'An immersive 3D portfolio experience. Navigate a pirate world to discover projects, skills, and career journey.',
  keywords: ['portfolio', '3D', 'developer', 'Three.js', 'interactive', 'pirate'],
  openGraph: {
    title: "The Developer's Voyage",
    description: 'An immersive 3D portfolio experience.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
