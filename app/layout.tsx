import type { Metadata } from "next";
import localFont from "next/font/local"
import "./globals.css";

const robotoCondensed = localFont({
  src: [
    {
      path: './fonts/RobotoCondensed-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: './fonts/RobotoCondensed-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: './fonts/RobotoCondensed-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/RobotoCondensed-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/RobotoCondensed-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/RobotoCondensed-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/RobotoCondensed-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/RobotoCondensed-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: './fonts/RobotoCondensed-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
  ],
  variable: "--font-roboto-condensed",
})

export const metadata: Metadata = {
  title: "Just DIY It",
  description: "For all you DIY enthusiast!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={robotoCondensed.variable}>
        {children}
      </body>
    </html>
  );
}
