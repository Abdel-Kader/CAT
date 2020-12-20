import { store } from './store/store'
import { Provider } from 'react-redux'
import MainRoute from './router/mainRoute'

function App() {
  return (
    <Provider store={store}>
      <MainRoute/>
    </Provider>
  );
}

export default App;
