import { Container, CssBaseline, Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import React from "react";
import img from './imgs/prof.jpg'
import LeNgocThanh from './imgs/teammembers/LeNgocThanh.jpg'
import LamNgocPhuongAnh from './imgs/teammembers/LamNgocPhuongAnh.jpg'
import NgocLien from './imgs/teammembers/NgocLien.jpg'
import PhanQuangDai from './imgs/teammembers/PhanQuangDai.jpg'
import PhanTanDat from './imgs/teammembers/PhanTanDat.jpg' 
import unknown_f from './imgs/teammembers/unknown_f.jpg'
import unknown_m from './imgs/teammembers/unknown_m.jpg'
const aboutBody = {
    background: 'white',
	height: '100vh',
};


const AboutData = [
    {
        name: 'Lê Ngọc Thành (Mentor)',
        imgPath: LeNgocThanh,
    },
    {
        name: 'Lâm Ngọc Phương Anh',
        imgPath: LamNgocPhuongAnh,
    },
    {
        name: 'Lư Ngọc Liên',
        imgPath: NgocLien,
    },
    {
        name: 'Trần Thu Hiền',
        imgPath: unknown_f,
    },
	{
		name: 'Phan Quang Đại',
		imgPath: PhanQuangDai,
	},
	{
		name: 'Phan Tấn Đạt',
		imgPath: PhanTanDat,
	},
	{
		name: 'Võ Ngọc Minh',
		imgPath: unknown_m,
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
					<h1>Các thành viên trong nhóm</h1>
					<Typography>HCMUS XR tour</Typography>
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
