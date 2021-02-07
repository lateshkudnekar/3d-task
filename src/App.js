import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import Routes from './routes';
import { AuthProvider } from './Context/authContext';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
function App() {
  const options = {
    position: positions.BOTTOM_CENTER,
    timeout: 3000,
    offset: '30px',
    transition: transitions.SCALE
  }
  return (
    <div className="App">
      <AuthProvider>
        <AlertProvider template={AlertTemplate} {...options}>
          <Routes/>
        </AlertProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
