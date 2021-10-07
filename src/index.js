import React from 'react';
import ReactDOM from 'react-dom';

import '@fontsource/roboto/400.css';
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';

import { getFunctions, httpsCallable } from 'firebase/functions';
import startFirebase from './firebase';

function MainView(props) {
	let [search, setSearch] = React.useState('');

	React.useEffect(() => {
		startFirebase();
	}, []);

	let searchAmazon = () => {
		const functions = getFunctions();
		httpsCallable(
			functions,
			'search'
		)({ search: search }).then((result) => {
			let url = result.data;
			window.location.href = url;
		});
	};

	return (
		<Grid container justifyContent="center" alignItems="center" justifySelf="center">
			<Stack direction="column" spacing={5}>
				<Typography variant="h1">FastBuy</Typography>
				<TextField label="Search" variant="outlined" onChange={(event) => setSearch(event.target.value)} />
				<Button variant="contained" onClick={searchAmazon}>
					Search
				</Button>
			</Stack>
		</Grid>
	);
}

ReactDOM.render(
	<React.StrictMode>
		<div style={{ height: '75vh', display: 'flex' }}>
			<MainView />
		</div>
	</React.StrictMode>,
	document.getElementById('root')
);
