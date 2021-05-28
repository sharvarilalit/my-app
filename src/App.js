import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar'

function Welcome(){
  return <p>Wlcome To react js</p>
}


function App() {
  return (
    <div className="App">
      <Navbar />
     <h1>welcome</h1>
    </div>
  );
}

export default App;
