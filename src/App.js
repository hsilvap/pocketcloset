import './App.css'
import { StoreProvider } from './context/store'
import PocketClosetRouter from './pages/Routes'

function App () {
  return (
    <StoreProvider>
      <PocketClosetRouter />
    </StoreProvider>
  )
}

export default App
