import { Container, CssBaseline, Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import React from "react";
import img from './imgs/prof.jpg'

const aboutBody = {
    background: 'white',
	height: '100vh',
};


const AboutData = [
    {
        name: 'Las Phjs Juisf Asd',
        imgPath: img,
    },
    {
        name: 'Nguyen Van A',
        imgPath: img,
    },
    {
        name: 'Trinh Thanh Thach H',
        imgPath: img,
    },
    {
        name: 'Trinh Thanh Tasd Aqew',
        imgPath: img,
    },
];


export default function About() {
    return ( 
		<>
			<CssBaseline/>
			<div style={aboutBody} id='about'>
				<div style={{height: '56px'}}/>
				<Container maxWidth='md' 
					style={{ textAlign: 'center' }}>
					<h1>Our Team</h1>
					<Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque quo hic quod dolorum beatae perferendis soluta, laboriosam fugit unde magni!</Typography>
				</Container>
				<Container maxWidth='md'>
					<Grid container 
						direction='row' 
						justifyContent='center' 
						spacing={3} 
						alignItems='center' >
					{AboutData.map((item, index) => {
						return (
							<Grid key={index} item xs={4}>
								<Card >
									<CardMedia component='img'
										height='256'
										image={item.imgPath}
										alt='profile img'
									/>
									<CardContent>
										<Typography gutterBottom 
											variant="h6" 
											component="div" 
											align="center">
											{item.name}
										</Typography>
									</CardContent>
								</Card>
							</Grid>
						)
					})}
					</Grid>
				</Container>
			</div>
		</>
    );
};
