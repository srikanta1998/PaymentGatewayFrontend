import './App.css';

import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import {LoginPage} from './Components/LoginPage'
import { HomePage } from './Components/HomePage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path = '/' element={<LoginPage/>}/>
          <Route path = '/homepage' element={<HomePage/>}/>
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
