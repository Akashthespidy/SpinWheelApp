import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Reservation from './components/Reservation';
import axios from 'axios';
import { useEffect } from 'react';
import ReservationForm from './components/ReservationForm';

function App() {

  return (
    <div className="App mx-5 mt-3">
      <ReservationForm/>
    </div>
  );
}

export default App;
