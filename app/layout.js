import "./globals.css";
import 'katex/dist/katex.min.css';

export const metadata = {
	title: "Skoolution",
	description:
		"Skoolution La plateforme qui s'adapte à vos besoins pour améliorer vos notes",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className="scroll-smooth">
			<body className={`font-inter antialiased`}>{children}</body>
		</html>
	);
}
