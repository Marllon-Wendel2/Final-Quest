'use client';

import { useState } from 'react';
import { login, register } from '../../api/auth';
import { User } from '../../api/client';

interface AuthFormProps {
  onLogin: (user: User) => void;
}

export default function AuthForm({ onLogin }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const user = await login(email, password);
        onLogin(user);
      } else {
        const user = await register({ name, email, password });
        onLogin(user);
      }
    } catch (err) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      setError(
        axiosError.response?.data?.message || 'Erro ao conectar ao servidor'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rpg-card">
      <h2 className="rpg-title">
        {isLogin ? 'LOGIN' : 'REGISTER'}
      </h2>

      <div className="rpg-toggle-group">
        <button
          type="button"
          onClick={() => setIsLogin(true)}
          className={`rpg-toggle-btn ${isLogin ? 'active' : ''}`}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setIsLogin(false)}
          className={`rpg-toggle-btn ${!isLogin ? 'active' : ''}`}
        >
          Cadastro
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="rpg-field">
            <label className="rpg-label">
              Aventurer Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={!isLogin}
              className="rpg-input"
              placeholder="Ex: Sir Lancelot"
            />
          </div>
        )}

        <div className="rpg-field">
          <label className="rpg-label">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rpg-input"
            placeholder="aventureiro@quest.com"
          />
        </div>

        <div className="rpg-field" style={{ marginBottom: '1.5rem' }}>
          <label className="rpg-label">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="rpg-input"
            placeholder="Minimo 6 caracteres"
          />
        </div>

        {error && (
          <div className="rpg-error">
            <span className="icon-ghost" style={{ fontSize: '1rem' }} />
            <span className="rpg-error-text">{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="rpg-submit-btn"
        >
          <span className="icon-key" style={{ fontSize: '1rem' }} />
          {loading ? 'AGUARDE...' : isLogin ? 'ENTRAR' : 'CADASTRAR'}
        </button>
      </form>
    </div>
  );
}
