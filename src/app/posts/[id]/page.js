import { getPostById } from '../../services/api';

// Exportamos essa função para que o Next.js saiba qual parâmetro (id) usar na página
// e para evitar cache de dados para cada ID diferente.
export const dynamicParams = true;

export default async function PostDetailsPage({ params }) {
  // Pega o ID do post a partir dos parâmetros da URL
  const { id } = params;

  // Busca o post na API
  const post = await getPostById(id);

  // Se o post não for encontrado, exibe uma mensagem de erro
  if (!post) {
    return (
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold text-red-600">Postagem não encontrada.</h1>
        <p className="text-gray-500 mt-2">Parece que este post não existe ou foi excluído.</p>
      </div>
    );
  }

  // Se o post for encontrado, exibe seus detalhes
  const authorUsername = post.author?.username || 'Autor Desconhecido';

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="text-gray-500 text-sm mb-4">
        <span>Por: {authorUsername} em </span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="ml-4 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
          {post.category}
        </span>
      </div>
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-auto rounded-lg shadow-md mb-6"
        />
      )}
      <div className="prose prose-lg max-w-none text-gray-800">
        <p>{post.content}</p>
      </div>
      {post.tags.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span key={index} className="bg-gray-200 text-gray-800 text-sm font-medium px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}