import React from "react";
import { BrowserRouter, Routes, Route, } from "react-router-dom";

import NavBar from "../NavBar/NavBar";
import FullPage from "../Home/fullPage";

// import LoginForm from "../Form/LoginForm"
import Register from "../Form/RegisterForm/Register"
import Transfer from "../User/Transfer";
import BankForm from "../User/Transfer/BankForm";
import EWallet from "../User/Transfer/E-wallet";
import Footer from "../Footer/Footer";
import UserHome from "../User/UserHome";

export default function App() {
  return (
    <div>
        <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route path="/" element={<FullPage/>}/>
                <Route path='/user' element={<UserHome/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="user/transfer" element={<Transfer/>}/>
                <Route path="user/transfer/bank" element={<BankForm/>}/>
                <Route path="user/transfer/e-wallet" element={<EWallet/>}/>
            </Routes> 
        </BrowserRouter >
    </div>
  );
}
