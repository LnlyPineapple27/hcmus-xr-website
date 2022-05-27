import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CssBaseline, ListItemSecondaryAction } from "@material-ui/core";
import { Button, Switch } from '@mui/material';
import './NavBar.css';
import { HashLink } from 'react-router-hash-link';
import 'boxicons';
import './hamburger-menu.css';

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

const sideData= [
	{
		title: 'Home',
		path: '/user',
		className: 'side-text',
        icons: 'home-alt'
	},
	{
		title: 'Transfer',
		path: '/user/transfer',
		className: 'side-text',
        icons: 'transfer-alt'
	},
	{
		title: 'Setting',
		path: '/user/setting',
		className: 'side-text',
        icons: 'cog'
	},
];

function NavBar() {
    const [isLogin, setLogin] = useState(false);
    const toggleLogin = () => setLogin(!isLogin);
    
    const [side, setSideBar] = useState(false);
    const toggleSideBar = () => setSideBar(!side);

    const [menuActive, setMenuActive] = useState(false);
    const toggleMenu = () => setMenuActive(!menuActive);

    return (
        <>
            <CssBaseline/>
            <div className='navbar'>
                {isLogin ? 
                <div className='bars-icon' onClick={toggleSideBar}>
                    <div className={menuActive ? 'container active' : 'container'} 
                        onClick={toggleMenu}>
                        <div className="menu">
                            <span className="line one"/>
                            <span className="line two"/>
                            <span className="line three"/>
                        </div>
                    </div>
                </div> : null}

                <Link to='/' className='nav-logo'>
                    E-PAYMENT
                </Link>

                <Switch onChange={toggleLogin}/>

                {!isLogin ? 
                <nav>
                    <ul className='navbar-items'>
                    {NavData.map((item, index) => {
                        return (
                            <li key={index} className={item.className}>
                                <HashLink smooth to={item.path}>
                                    {item.title}
                                </HashLink>
                            </li>
                        )
                    })}
                    </ul>
                </nav> : null}

                {isLogin ? 
                <Button style={{ color: 'blanchedalmond' }}
                        variant="outlined"
                        sx={{ mx: 2, 
                            borderColor: 'blanchedalmond' }}
                        component={Link} to='/'
                        startIcon={<box-icon name='log-out' color='blanchedalmond'/>} >
                    Logout
                </Button> : null}
            </div>

            {isLogin ? 
            <div className={side ? 'side-bar' : 'side-bar close'} >
                <ul className='side-menu-items'>
                {sideData.map((item, index) => {
                    return (
                        <li key={index} className={item.className}>
                            <Link to={item.path}>
                                <box-icon name={item.icons} 
                                className='icon'/>
                                <span className='text'>{item.title}</span>
                            </Link> 
                        </li>
                    )
                })}
                </ul>
            </div> : null}
        </>
    );
}

export default NavBar