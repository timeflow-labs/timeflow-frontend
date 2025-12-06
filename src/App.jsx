import { useCallback, useEffect, useState } from 'react'
import Dashboard from './Dashboard'
import Focusmode from './Focusmode'
import Schedules from './Schedules'
import Settings from './Settings'
import SignIn from './SignIn'
import SignUp from './SignUp'
import './App.css'

const PROTECTED_SCREENS = new Set([
  'dashboard',
  'focusmode',
  'schedules',
  'settings',
])

function App() {
  const [currentScreen, setCurrentScreen] = useState('signIn')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const showSignIn = useCallback(() => {
    setIsAuthenticated(false)
    setCurrentScreen('signIn')
  }, [])

  const showSignUp = useCallback(() => {
    setIsAuthenticated(false)
    setCurrentScreen('signUp')
  }, [])

  const completeSignIn = useCallback(() => {
    setIsAuthenticated(true)
    setCurrentScreen('dashboard')
  }, [])

  const navigateProtected = useCallback((destination) => {
    setCurrentScreen(destination)
  }, [])

  useEffect(() => {
    if (!isAuthenticated && PROTECTED_SCREENS.has(currentScreen)) {
      setCurrentScreen('signIn')
    }
  }, [currentScreen, isAuthenticated])

  let renderedScreen = null

  switch (currentScreen) {
    case 'signIn':
      renderedScreen = (
        <SignIn onSignIn={completeSignIn} onGoToSignUp={showSignUp} />
      )
      break
    case 'signUp':
      renderedScreen = <SignUp onGoToSignIn={showSignIn} />
      break
    case 'dashboard':
      renderedScreen = <Dashboard onNavigate={navigateProtected} />
      break
    case 'focusmode':
      renderedScreen = <Focusmode onNavigate={navigateProtected} />
      break
    case 'schedules':
      renderedScreen = <Schedules onNavigate={navigateProtected} />
      break
    case 'settings':
      renderedScreen = <Settings onNavigate={navigateProtected} />
      break
    default:
      renderedScreen = (
        <SignIn onSignIn={completeSignIn} onGoToSignUp={showSignUp} />
      )
      break
  }

  return <div className="app-root">{renderedScreen}</div>
}

export default App
