import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
	return (
		<Typography variant="body2" color='blanchedalmond'>
			{'Copyright © '}
			<Link href="/">
				Eletronics Payment
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

export default function Footer() {
	return (
		<Box>
			<CssBaseline />
			<Box
				component="footer"
				sx={{ py: 3, px: 2,
					mt: 'auto',
					background: 'rgba(0, 0, 0, 0.3)',
				}}>
				<Container maxWidth="sm">
					<Copyright />
				</Container>
			</Box>
		</Box>
	);
}