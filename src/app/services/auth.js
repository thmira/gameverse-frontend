// O nome da chave no localStorage
const TOKEN_KEY = 'jwtToken';

// Salva o token no localStorage
export const setToken = (token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

// Obtém o token do localStorage
export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

// Remove o token do localStorage
export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
  }
};

// Verifica se o usuário está autenticado
export const isAuthenticated = () => {
  const token = getToken();
  // Uma verificação simples apenas para checar se o token existe
  return !!token;
};