import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
	return (
		<Typography variant="body2" color='blanchedalmond' align='center'>
			{'Copyright © '}
			<Link href="/">
				HCMUS-XR website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

export default function Footer() {
	return (
		<>
			<Box>
				<CssBaseline />
				<Box
					component="footer"
					sx={{ py: 3, px: 2,
						mt: 'auto',
						background: 'rgba(11, 156, 49, 0.6)',
					}}>
					<Container maxWidth="sm" >
						<Copyright />
					</Container>
				</Box>
			</Box>
		</>
	);
}