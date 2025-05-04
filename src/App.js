import './App.css';

import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import {LoginPage} from './Components/LoginPage'
import { HomePage } from './Components/HomePage';
import { CYBS_SOAP } from './CYBS Payment Page/CYBS_SOAP_Integration';
import { CYBS_REST } from './CYBS Payment Page/CYBS_REST_Integration';
import { MPGS_REST } from './MPGS Payment Page/MPGS_REST_Integration';
import { WIBMO_REST } from './WIBMO Payment Page/WIBMO_REST_Integration';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path = '/' element={<LoginPage/>}/>
          <Route path = '/homepage' element={<HomePage/>}/>
          <Route path = '/cybs_soap' element={<CYBS_SOAP/>}/>
          <Route path='/cybs_rest' element={<CYBS_REST/>}/>
          <Route path='/mpgs' element={<MPGS_REST/>}/>
          <Route path='/wibmo' element={<WIBMO_REST/>}/>
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
