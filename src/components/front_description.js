import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';

function FrontDescription(props) {
	return (
		<>
			<Card elevation={5} sx={{ maxWidth: '40vw' }}>
				<CardContent>
					<Typography variant="h4" textAlign="center">
						What is FastBuy?
					</Typography>
					<hr />
					<Typography variant="body1">
						FastBuy is a service that aims to help people who are tired of endlessly searching Amazon for
						the "perfect product". We use a search algorithm to present one and only one option for each
						search, making your decision about whether to purchase a product much simpler.{' '}
					</Typography>
				</CardContent>
			</Card>
		</>
	);
}

export default FrontDescription;
