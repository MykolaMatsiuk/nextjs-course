import path from 'path';
import fs from 'fs/promises';
import Link from 'next/link';

function HomePage(props) {
	return (
		<ul>
			{props.products.map((product) => (
				<li key={product.id}>
					<Link href={`/products/${product.id}`}>
						{product.title}
					</Link>
				</li>
			))}
		</ul>
	);
}

export async function getStaticProps() {
	console.log('(Re)Generating...');
	const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
	const jsonData = await fs.readFile(filePath);
	const { products } = JSON.parse(jsonData);

	return {
		props: { products },
		revalidate: 1
	};
}

export default HomePage;
