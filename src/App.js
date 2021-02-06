import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import Routes from './routes';
import { AuthProvider } from './Context/authContext';

function App() {
  return (
    <div className="App">
      <AuthProvider>
          <Routes/>
      </AuthProvider>
    </div>
  );
}

export default App;
