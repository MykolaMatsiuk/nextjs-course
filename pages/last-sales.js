import { useEffect, useState } from 'react';
import useSWR from 'swr';

function LastSalesPage(props) {
	const [sales, setSales] = useState(props.sales);
	// const [isLoading, setIsLoading] = useState(false);

	const { data, error } = useSWR(
		'https://nextjs-course-cc530-default-rtdb.firebaseio.com/sales.json',
		(...args) =>
			fetch(...args)
				.then((res) => res.json())
				.then((data) => {
					let transformedData = [];

					for (const key in data) {
						transformedData.push({
							id: key,
							username: data[key].username,
							volume: data[key].volume
						});
					}

					setSales(transformedData);

					return transformedData;
				})
	);

	// useEffect(() => {
	// 	setIsLoading(true);
	// 	fetch(
	// 		'https://nextjs-course-cc530-default-rtdb.firebaseio.com/sales.json'
	// 	)
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			let transformedData = [];

	// 			for (const key in data) {
	// 				transformedData.push({
	// 					id: key,
	// 					username: data[key].username,
	// 					volume: data[key].volume
	// 				});
	// 			}

	// 			setSales(transformedData);
	// 			setIsLoading(false);
	// 		});
	// }, []);

	if (error) return <p>Failed to load</p>;

	if (!data && !sales) return <p>Loading...</p>;

	return (
		<ul>
			{sales.map((sale) => (
				<li key={sale.id}>
					{sale.username} - ${sale.volume}
				</li>
			))}
		</ul>
	);
}

export async function getStaticProps() {
	let transformedData = [];

	const response = await fetch(
		'https://nextjs-course-cc530-default-rtdb.firebaseio.com/sales.json'
	);
	const data = await response.json();

	for (const key in data) {
		transformedData.push({
			id: key,
			username: data[key].username,
			volume: data[key].volume
		});
	}

	return {
		props: { sales: transformedData }
	};
}

export default LastSalesPage;
