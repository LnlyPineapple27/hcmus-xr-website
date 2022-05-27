import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import NavBar from '../Components/NavBar';
import FullPage from '../Components/Index';
import Register from '../Components/Form/RegisterPage';
import Transfer from '../Components/User/Transfer';
import BankForm from '../Components/User/Transfer/BankForm';
import EWallet from '../Components/User/Transfer/E-wallet';
import UserHome from '../Components/User/UserHome';

import ErrorPage from '../Utils/ErrorPage';

export default function App() {
	const loggedIn = useSelector((state) => state.user.loggedIn);

	return (
		<div>
			<BrowserRouter>
				<NavBar />
				<Routes>
					<Route
						path="/"
						element={
							!loggedIn ? <FullPage /> : <Navigate to="/user" />
						}
					/>
					<Route
						path="/register"
						element={
							!loggedIn ? <Register /> : <Navigate to="/user" />
						}
					/>
					<Route
						path="/user"
						element={loggedIn ? <UserHome /> : <Navigate to="/" />}
					/>
					<Route
						path="/user/transfer"
						element={loggedIn ? <Transfer /> : <Navigate to="/" />}
					/>
					<Route
						path="/user/transfer/bank"
						element={loggedIn ? <BankForm /> : <Navigate to="/" />}
					/>
					<Route
						path="/user/transfer/e-wallet"
						element={loggedIn ? <EWallet /> : <Navigate to="/" />}
					/>
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}
