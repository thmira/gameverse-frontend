import PostCard from './components/PostCard'; // Importa o novo componente
import { getPosts } from './services/api'; // <-- Vamos criar esse arquivo em breve!

export const dynamic = 'force-dynamic'; // Força a requisição a ser feita a cada visita

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen p-4 md:p-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Últimas Notícias de Games</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.length > 0 ? (
          posts.map(post => (
            <PostCard key={post._id} post={post} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">Nenhuma postagem encontrada.</p>
        )}
      </div>
    </main>
  );
}