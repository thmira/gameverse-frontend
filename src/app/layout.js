import './globals.css';
import { Inter } from 'next/font/google';
import Header from './components/Header'; // <-- Importe o componente Header

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'GameVerse', // <-- Título do blog
  description: 'Últimas notícias do mundo dos games!', // <-- Descrição do blog
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Header /> {/* <-- Adicione o Header aqui */}
        <div className="container mx-auto p-4">
          {children} {/* <-- Este é o conteúdo da página atual */}
        </div>
      </body>
    </html>
  );
}