import logo from './logo.svg';
import { Gameboard } from './peg/Game'
import { createBoard } from './peg/Board'
import './App.css';

function App() {
  return (<>
    <Gameboard board={createBoard()}/>
    </>
  );
}

export default App;
