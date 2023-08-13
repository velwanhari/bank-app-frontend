import React from 'react';
import Navbar from './Navbar';
import Login from './Login';
import Registration from './Registration';
import CreateAccount from './CreateAccount';
import TranAmount from './TranAmount';
import AccountList from './Accountlist';

import { BrowserRouter,Route,Routes,Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
        <BrowserRouter>
              <Navbar/>
               <Link to="/login">Login</Link><br/>
              <Link to="/Registration">Registration</Link><br />
              <Link to="/TranAmount">TranAmount</Link><br />
              <Link to="/AccountList">list</Link><br />
              
              
          <Routes>
            <Route path="/Login" element={<Login/>}></Route>
            <Route path="/Registration" element={<Registration/>}></Route>
            <Route path="/TranAmount" element={<TranAmount/>}></Route>
            <Route path="/CreateAccount" element={<CreateAccount/>}></Route>
            <Route path="/AccountList" element={<AccountList/>}></Route>

          </Routes>
        </BrowserRouter>
    </div>
  )
}



