import { useState } from 'react';
import { useRouter } from 'next/router'; // Se estiver usando Next.js

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [usuarios, setUsuarios] = useState([]);

  const router = useRouter();

  // Função de login
  const handleLogin = async () => {
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('https://odontoforense-backend-1.onrender.com/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      const text = await response.text();
      console.log('Resposta crua do servidor:', text);

      try {
        const data = JSON.parse(text);

        if (!response.ok) {
          throw new Error(data.message || 'Erro ao fazer login');
        }

        if (data.token) {
          localStorage.setItem('token', data.token);
          console.log('Login bem-sucedido. Redirecionando...');
          router.replace('/main');
        } else {
          throw new Error('Token não encontrado na resposta do servidor');
        }

      } catch (jsonErr) {
        throw new Error('Resposta não era JSON válido:\n' + text);
      }

    } catch (err) {
      console.error('Erro de login:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };

  // Função para buscar usuários após login
  const buscarUsuarios = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token não encontrado. Faça login primeiro.');
      return;
    }

    try {
      const response = await fetch('https://odontoforense-backend-1.onrender.com/api/user/login', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const erro = await response.json();
        throw new Error(erro.message || 'Erro ao buscar usuários');
      }

      const data = await response.json();
      console.log('Usuários:', data);
      setUsuarios(data); // Atualiza o estado se quiser exibir os usuários

    } catch (err) {
      console.error('Erro ao buscar usuários:', err);
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <button onClick={handleLogin} disabled={isLoading}>
        {isLoading ? 'Entrando...' : 'Entrar'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <hr />

      <button onClick={buscarUsuarios}>
        Buscar usuários (após login)
      </button>

      <ul>
        {usuarios.map((user) => (
          <li key={user._id}>{user.nome} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}
