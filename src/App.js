import logo from './logo.svg';
import './App.css';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <img 
      src="https://i.pcmag.com/imagery/articles/01IfO3rzJU9LtgrgITcoFRK-1..1618233694.png"
      alt="new"
      height='200px'
      />
      <br/>
      <h4>Analyse Chat Transcripts with Azure Text Analytics</h4>
      <br/>
     <Home />
    </div>
  );
}

export default App;
