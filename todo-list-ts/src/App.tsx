import { AuthProvider } from './contexts/AuthContext'
import { useAuth } from './contexts/AuthContext'
import { Auth } from './components/Auth'
import { Header } from './components/Header'
import { Main } from './components/Main'
import './global.css'

function AppContent() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        color: 'var(--gray-300)'
      }}>
        Carregando...
      </div>
    )
  }

  if (!user) {
    return <Auth />
  }

  return (
    <>
      <Header />
      <Main />
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App