import React from 'react';
import ReactDOM from 'react-dom';

import '@fontsource/roboto/400.css';
import { Button, Grid, LinearProgress, Stack, TextField, Typography } from '@mui/material';

import { getFunctions, httpsCallable } from 'firebase/functions';

// eslint-disable-next-line
import startFirebase from './firebase';

import FrontDescription from './components/front_description';

function MainView(props) {
	let [search, setSearch] = React.useState('');
	let [loading, setLoading] = React.useState(false);

	let searchAmazon = () => {
		setLoading(true);
		const functions = getFunctions();
		httpsCallable(
			functions,
			'search'
		)({ search: search }).then((result) => {
			window.location.href = result.data;
		});
	};

	return (
		<>
			<Grid container justifyContent="center" alignItems="center">
				<Stack direction="column" spacing={3}>
					<Stack direction="column" spacing={5}>
						<Typography variant="h1" textAlign="center">
							FastBuy
						</Typography>
						<TextField
							label="Search"
							variant="outlined"
							onChange={(event) => setSearch(event.target.value)}
						/>
						<Button variant="contained" onClick={searchAmazon}>
							Search
						</Button>
						{loading && <LinearProgress />}
					</Stack>
					<FrontDescription />
				</Stack>
			</Grid>
		</>
	);
}

ReactDOM.render(
	<React.StrictMode>
		<div style={{ height: '100vh', display: 'flex' }}>
			<MainView />
		</div>
	</React.StrictMode>,
	document.getElementById('root')
);
