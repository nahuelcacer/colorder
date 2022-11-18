import { Provider } from "react-redux"
import BuscarCliente from "./components/BuscarCliente";
import store from "./redux/store.js";
function App() {
 
  return(
    <Provider store={store}>
      <BuscarCliente></BuscarCliente>
    </Provider>

    
  )
}

export default App;
