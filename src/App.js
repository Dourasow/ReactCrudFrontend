import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes, useMatch} from 'react-router-dom';
import EmployeeComponent from './Components/EmployeeComponent';
import HeaderComponent from './Components/HeaderComponent';
import FooterComponent from './Components/FooterComponent';
import CreateEmployeeComponent from './Components/CreateEmployeeComponent';
import UpdateEmployeeComponent from './Components/UpdateEmployeeComponent';
import ViewEmployeeComponent from './Components/ViewEmployeeComponent';

function App() {
  return (
    <div>
      <Router>
      <HeaderComponent />
        <div className="container">
          <Routes> 
            <Route exact path = '/' element = {<EmployeeComponent />} > </Route>
            <Route path = '/employees' element ={<EmployeeComponent />} > </Route>
            <Route path = "/add-employee/:id" element ={<CreateEmployeeComponent/>}></Route>
            <Route path="/view-employee/:id" element={<ViewEmployeeComponent />}></Route>
            {/* <EmployeeComponent /> */}
          </Routes>
        </div>
        <FooterComponent />
        </Router>
    </div>
   
  );
}

export default App;
