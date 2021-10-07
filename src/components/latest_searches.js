import React from 'react';
import { getFirestore, collection, query, getDocs, orderBy, limit } from 'firebase/firestore';
import { Stack, Typography, Box } from '@mui/material';
const q = query(collection(getFirestore(), 'searches'), orderBy('timestamp', 'desc'), limit(3));

function LatestSearches(props) {
	let [latest, setLatest] = React.useState(false);

	React.useEffect(() => {
		async function fetchQuery() {
			const querySnapshot = await getDocs(q);
			await setLatest(
				querySnapshot.docs.map((doc, i) => (
					<Box key={i}>
						<Typography variant="h5" textAlign="center">
							{doc.data().search}
						</Typography>
					</Box>
				))
			);
		}
		fetchQuery();
	}, []);

	return (
		<Stack direction="column" spacing={2}>
			<Typography variant="h3">Trending Searches</Typography>
			<hr />
			{latest && latest}
		</Stack>
	);
}

export default LatestSearches;
