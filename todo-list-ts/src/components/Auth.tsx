import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import style from './Auth.module.css'

export function Auth() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const { signUp, signIn } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const { error } = isSignUp 
        ? await signUp(email, password)
        : await signIn(email, password)

      if (error) {
        setMessage(error)
      } else if (isSignUp) {
        setMessage('Conta criada com sucesso! Você já pode fazer login.')
        setIsSignUp(false)
        setEmail('')
        setPassword('')
      }
    } catch (error) {
      setMessage('Ocorreu um erro inesperado')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={style.container}>
      <div className={style.authBox}>
        <h2 className={style.title}>
          {isSignUp ? 'Criar Conta' : 'Entrar'}
        </h2>
        
        <form onSubmit={handleSubmit} className={style.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={style.input}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={style.input}
            minLength={6}
          />
          
          <button 
            type="submit" 
            disabled={loading}
            className={style.submitButton}
          >
            {loading ? 'Carregando...' : (isSignUp ? 'Criar Conta' : 'Entrar')}
          </button>
        </form>

        {message && (
          <p className={`${style.message} ${message.includes('sucesso') ? style.success : style.error}`}>
            {message}
          </p>
        )}

        <button
          onClick={() => {
            setIsSignUp(!isSignUp)
            setMessage('')
            setEmail('')
            setPassword('')
          }}
          className={style.toggleButton}
        >
          {isSignUp ? 'Já tem uma conta? Entrar' : 'Não tem conta? Criar uma'}
        </button>
      </div>
    </div>
  )
}