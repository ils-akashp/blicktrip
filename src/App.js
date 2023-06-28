import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import EventListing from './components/Events/EventListing';
import AddEvent from './components/Events/AddEvent';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
        <Routes>
          
      <Route exact path='/' element={<EventListing />}></Route>
      <Route exact path='/bookevent' element={<AddEvent />}></Route>
      </Routes>
      </Router>
  );
}

export default App;
