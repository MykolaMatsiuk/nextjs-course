import path from 'path';
import fs from 'fs/promises';
import { Fragment } from 'react';

function ProductDetailsPage({ product }) {
	if (!product) return <p>Loading...</p>;

	return (
		<Fragment>
			<h1>{product.title}</h1>
			<p>{product.description}</p>
		</Fragment>
	);
}

async function getProducts() {
	const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
	const jsonData = await fs.readFile(filePath);
	const { products } = JSON.parse(jsonData);

	return products;
}

export async function getStaticPaths() {
	const products = await getProducts();

	return {
		paths: products.map((p) => ({ params: { pid: p.id } })),
		fallback: true // 'blocking' - blocks rendering component until data arrives
	};
}

export async function getStaticProps(context) {
	const { params } = context;
	const productId = params.pid;

	const products = await getProducts();

	const product = products.find((product) => product.id === productId);

	if (!product) return { notFound: true };

	return {
		props: {
			product
		}
	};
}

export default ProductDetailsPage;
