import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { Button } from '@mui/material';
import { HashLink } from 'react-router-hash-link';
import { useSelector, useDispatch } from 'react-redux';
import 'boxicons';

import './NavBar.css';
import './hamburger-menu.css';
import { remove } from '../../redux/userSlice';
import { removeUserLocal } from '../../Utils/Common';

const NavData = [
	{
		title: 'Home',
		path: '/#',
		className: 'nav-text',
	},
	{
		title: 'About',
		path: '/#about',
		className: 'nav-text',
	},
	{
		title: 'Contact',
		path: '/#contact',
		className: 'nav-text',
	},
	{
		title: 'FAQ',
		path: '/#faq',
		className: 'nav-text',
	},
];

const sideData = [
	{
		title: 'Home',
		path: '/user',
		className: 'side-text',
		icons: 'home-alt',
	},
	// {
	// 	title: 'Transfer',
	// 	path: '/user/transfer',
	// 	className: 'side-text',
	// 	icons: 'transfer-alt',
	// },
	{
		title: 'Setting',
		path: '/user/setting',
		className: 'side-text',
		icons: 'cog',
	},
];

export default function NavBar() {
	const [menuActive, setMenuActive] = useState(false);
	const toggleMenu = () => setMenuActive(!menuActive);

	const [side, setSideBar] = useState(false);
	const toggleSideBar = () => setSideBar(!side);
	const openSideBar = () => {
		setSideBar(true);
		setMenuActive(true);
	};
	const closeSideBar = () => {
		setSideBar(false);
		setMenuActive(false);
	};

	const loggedIn = useSelector((state) => state.user.loggedIn);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const onLogout = () => { 
		removeUserLocal();
		dispatch(remove());
		navigate('/');
	};


	return (
		<>
			<CssBaseline />
			<div className="navbar">
				{loggedIn ? (
					<div className="bars-icon" onClick={toggleSideBar}>
						<div
							className={
								menuActive ? 'container active' : 'container'
							}
							onClick={toggleMenu}
						>
							<div className="menu">
								<span className="line one" />
								<span className="line two" />
								<span className="line three" />
							</div>
						</div>
					</div>
				) : null}

				<Link to="/" className="nav-logo">
					HCMUS-XR
				</Link>

				{/* <Switch onChange={toggleLogin} /> */}

				{!loggedIn ? (
					<nav>
						<ul className="navbar-items">
							{NavData.map((item, index) => {
								return (
									<li key={index} className={item.className}>
										<HashLink smooth to={item.path}>
											{item.title}
										</HashLink>
									</li>
								);
							})}
						</ul>
					</nav>
				) : null}

				{loggedIn ? (
					<Button
						style={{ color: 'blanchedalmond' }}
						variant="outlined"
						sx={{ mx: 2, borderColor: 'blanchedalmond' }}
						startIcon={
							<box-icon name="log-out" color="blanchedalmond" />
						}
						component={Link}
						to='/'
						onClick={onLogout}
					>
						Logout
					</Button>
				) : null}
			</div>

			{loggedIn ? (
				<div className={side ? 'side-bar' : 'side-bar close'}>
					<ul
						style={{ paddingInlineStart: '0px' }}
						onMouseOver={openSideBar}
						onMouseOut={closeSideBar}
					>
						{sideData.map((item, index) => {
							return (
								<li key={index} className={item.className}>
									<Link to={item.path}>
										<box-icon
											name={item.icons}
											className="icon"
										/>
										<span className="text">
											{item.title}
										</span>
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
			) : null}
		</>
	);
}

