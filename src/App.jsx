import './App.css'
import {TrelloProvider} from "./contexts/trello.context.jsx";
import Trello from "./pages/Trello.jsx";
function App() {
  return (
      <TrelloProvider>
        <Trello/>
      </TrelloProvider>
  )
}

export default App
