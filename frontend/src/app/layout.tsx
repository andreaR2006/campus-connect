import '../styles/globals.css';

export const metadata={
  title: 'Campus Connect',
  description: 'Plateforme de communication pour les membres du campus universitaire.',

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return(
    <html lang="fr">
      <body className="bg-gray-100">
        {children}
      </body>
    </html>
  );
}