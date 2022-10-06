import logo from './logo.svg';
import { Tabuleiro } from './peg/Tabuleiro'
import { createTabuleiro } from './peg/Tab'
import './App.css';

function App() {
  /*
  <div className="App">
      
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    */
  return (<>
    
    <Tabuleiro tab={createTabuleiro()}></Tabuleiro>
    </>
  );
}

export default App;
