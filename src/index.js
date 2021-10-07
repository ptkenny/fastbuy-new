import React from 'react';
import ReactDOM from 'react-dom';

import '@fontsource/roboto/400.css';
import { Button, Grid, LinearProgress, Stack, TextField, Typography, Box } from '@mui/material';

import { getFunctions, httpsCallable } from 'firebase/functions';
import { getFirestore, collection, query, getDocs, orderBy, limit } from 'firebase/firestore';
import startFirebase from './firebase';

startFirebase();
const q = query(collection(getFirestore(), 'searches'), orderBy('timestamp', 'desc'), limit(3));

function MainView(props) {
	let [search, setSearch] = React.useState('');
	let [loading, setLoading] = React.useState(false);
	let [latest, setLatest] = React.useState(false);

	React.useEffect(() => {
		async function fetchQuery() {
			const querySnapshot = await getDocs(q);
			await setLatest(
				querySnapshot.docs.map((doc, i) => (
					<Box key={i}>
						<hr />
						<Typography variant="h6" textAlign="center">
							{doc.data().search}
						</Typography>
					</Box>
				))
			);
		}
		fetchQuery();
	}, []);

	let searchAmazon = () => {
		setLoading(true);
		const functions = getFunctions();
		httpsCallable(
			functions,
			'search'
		)({ search: search }).then((result) => {
			let url = result.data;
			window.location.href = url;
			setLoading(false);
		});
	};

	return (
		<>
			<Grid container justifyContent="center" alignItems="center">
				<Stack direction="column" spacing={3}>
					<Stack direction="column" spacing={5}>
						<Typography variant="h1">FastBuy</Typography>
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
					<Stack direction="column" spacing={2}>
						<Typography variant="h3">Latest Searches</Typography>
						{latest && latest}
					</Stack>
				</Stack>
			</Grid>
		</>
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
