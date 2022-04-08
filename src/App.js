import logo from './logo.svg'
import './App.css'
import Landing from './pages/Landing/Landing'
import { StoreProvider } from './context/store'

function App () {
  return (
    <StoreProvider>
      <Landing />
    </StoreProvider>
  )
}

export default App
