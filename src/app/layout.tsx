import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/app/providers";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Ecommerce",
	description: "Proyecto M4 Frontend Henry",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (

		
		<html lang="en">
		<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
			<div className="flex flex-col min-h-screen">
				<Providers>
					<Navbar />
						<main className="flex-grow">
							{children}
						</main>
					<Footer />
				</Providers>
			</div>
		</body>
		</html>
	);
}
