import { CssBaseline, Typography } from "@mui/material";
import React from "react";
import bg from  "./imgs/home-pg.jpg";
import LoginForm from "../Form/LoginForm";

const homeBody = {
    backgroundImage: `url(${bg})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
	height: '100vh',
};


export default function Main() {
	return ( 
		<>
			<CssBaseline/>
			<div style={homeBody} id='home'>
				<div style={{height: '72px'}}/>
				<div style={{ display: 'flex',
					justifyContent: 'space-around', 
					alignItems: 'flex-end'}} >
					<div style={{ marginRight:'8px' }}>
						<Typography variant="h2" color='blanchedalmond' sx={{ mb : 1 }}>HCMUS XR System</Typography>
						<Typography variant="h5" color='blanchedalmond' sx={{ my : 2 }}> Login Page</Typography> 
						{/* <Typography variant="h5" color='blanchedalmond' sx={{ my : 2 }}> Ứng dụng hệ thống Faceid login</Typography> */}
					</div>
					<div style={{ marginRight:'8px' }}>
						<LoginForm/>
					</div>
				</div>
			</div>
		</>
	);
};
