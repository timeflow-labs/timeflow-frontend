import { useCallback, useEffect, useState } from 'react'
import Dashboard from './Dashboard'
import Focusmode from './Focusmode'
import Schedules from './Schedules'
import Settings from './Settings'
import SignIn from './SignIn'
import SignUp from './SignUp'
import { setApiUserId } from './api'
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
  const [currentUser, setCurrentUser] = useState(null)

  const showSignIn = useCallback(() => {
    setIsAuthenticated(false)
    setCurrentUser(null)
    setApiUserId(null)
    setCurrentScreen('signIn')
  }, [])

  const showSignUp = useCallback(() => {
    setIsAuthenticated(false)
    setCurrentUser(null)
    setApiUserId(null)
    setCurrentScreen('signUp')
  }, [])

  const completeSignIn = useCallback((user) => {
    setCurrentUser(user)
    setApiUserId(user.id)
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
      renderedScreen = (
        <Dashboard
          onNavigate={navigateProtected}
          currentUser={currentUser}
        />
      )
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
