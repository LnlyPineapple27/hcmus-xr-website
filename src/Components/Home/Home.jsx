import { CssBaseline, Grid, Typography } from "@mui/material";
import React from "react";
import bg from  "./imgs/home-pg.jpg";
import LoginForm from "../Form/LoginForm/LoginForm";

const homeBody = {
    backgroundImage: `url(${bg})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
	height: '100vh',
};


export default function Home() {
	return ( 
		<>
			<CssBaseline/>
			<div style={homeBody} id='home'>
				<div style={{height: '72px'}}/>
				<Grid container 
					justifyContent='space-around' 
					// spacing={2} 
					alignItems='flex-end'>
					<Grid item xs={7}>
						<Typography variant="h2" color='blanchedalmond' sx={{ m : 1 }}>Online Payment</Typography>
						<Typography variant="h5" color='blanchedalmond' sx={{ mx : 2 }}> Convenient way to pay your receipt, transfer money. </Typography>
					</Grid>
					<Grid item xs={4}>
						<LoginForm/>
					</Grid>
				</Grid>
			</div>
		</>
	);
};
