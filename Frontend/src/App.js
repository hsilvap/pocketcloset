import './App.css'
import { StoreProvider } from './context/store'
import PocketClosetRouter from './pages/Routes'
import CssBaseline from '@material-ui/core/CssBaseline'

function App () {
  return (
    <StoreProvider>
      <CssBaseline />
      <PocketClosetRouter />
    </StoreProvider>
  )
}

export default App
